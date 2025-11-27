from abc import ABC, abstractmethod
from typing import List

from app.keywords.domain.keyword import Keyword, KeywordMention


class KeywordRepositoryPort(ABC):
    @abstractmethod
    def get_top_mentions(self, limit: int) -> List[KeywordMention]:
        """
        키워드별 언급 수를 조회
        """
        raise NotImplementedError

    @abstractmethod
    def get_or_create(self, name: str) -> Keyword:
        """
        키워드를 이름으로 조회하고, 없으면 생성하여 반환
        """
        raise NotImplementedError

    @abstractmethod
    def find_by_id(self, keyword_id: int) -> Keyword:
        """
        ID로 키워드 조회
        """
        raise NotImplementedError

    @abstractmethod
    def get_all(self) -> List[Keyword]:
        """
        모든 키워드 목록 조회 (중복 제거)
        """
        raise NotImplementedError