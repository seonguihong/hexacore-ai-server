from typing import List

import json
from collections import Counter

from sqlalchemy.orm import Session

from app.data.infrastructure.orm.data_orm import DataORM
from app.keywords.application.port.keyword_repository_port import KeywordRepositoryPort
from app.keywords.domain.keyword import Keyword, KeywordMention
from app.keywords.infrastructure.orm.keyword_orm import KeywordORM


class KeywordRepositoryImpl(KeywordRepositoryPort):
    def __init__(self, db_session: Session):
        self.db = db_session

    def get_top_mentions(self, limit: int) -> List[KeywordMention]:
        """
        datas.keywords 컬럼(JSON 배열)을 기반으로 키워드별 언급 수를 집계.
        - 신규 구조: [1, 2, 3]  (keyword id 리스트)
        - 구 구조:  ["AI", "삼성전자"] (이름 리스트)도 최대한 지원
        """
        rows = self.db.query(DataORM.keywords).filter(DataORM.keywords.isnot(None)).all()

        counter: Counter[int] = Counter()
        name_buffer: Counter[str] = Counter()

        for (keywords_json,) in rows:
            try:
                keywords = json.loads(keywords_json)
            except (TypeError, json.JSONDecodeError):
                continue

            if not isinstance(keywords, list):
                continue

            for kw in keywords:
                if isinstance(kw, int):
                    counter[kw] += 1
                elif isinstance(kw, str):
                    name = kw.strip()
                    if name:
                        name_buffer[name] += 1

        # 구 구조(이름 리스트) 처리: 이름으로 id를 만들고 카운트 누적
        for name, cnt in name_buffer.items():
            keyword = self.get_or_create(name)
            if keyword.id is not None:
                counter[keyword.id] += cnt

        if not counter:
            return []

        top = counter.most_common(limit)

        results: List[KeywordMention] = []
        for keyword_id, mention_count in top:
            try:
                keyword = self.find_by_id(keyword_id)
            except ValueError:
                continue

            results.append(
                KeywordMention(
                    keyword_id=keyword.id,
                    name=keyword.name,
                    mention_count=mention_count,
                )
            )

        return results

    def get_or_create(self, name: str) -> Keyword:
        orm_keyword = (
            self.db.query(KeywordORM).filter(KeywordORM.name == name).first()
        )
        if orm_keyword is None:
            orm_keyword = KeywordORM(name=name)
            self.db.add(orm_keyword)
            self.db.flush()  # ID를 얻기 위해 flush

        keyword = Keyword(name=orm_keyword.name)
        keyword.id = orm_keyword.id
        return keyword

    def find_by_id(self, keyword_id: int) -> Keyword:
        orm_keyword = (
            self.db.query(KeywordORM).filter(KeywordORM.id == keyword_id).first()
        )
        if orm_keyword is None:
            raise ValueError(f"Keyword with id {keyword_id} not found")

        keyword = Keyword(name=orm_keyword.name)
        keyword.id = orm_keyword.id
        return keyword

    def get_all(self) -> List[Keyword]:
        orm_keywords = self.db.query(KeywordORM).order_by(KeywordORM.name.asc()).all()

        results: List[Keyword] = []
        for orm_keyword in orm_keywords:
            keyword = Keyword(name=orm_keyword.name)
            keyword.id = orm_keyword.id
            results.append(keyword)

        return results

