from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.keywords.adapter.input.web.response.keyword_response import (
    KeywordMentionResponse,
    KeywordResponse,
)
from app.keywords.application.use_case.get_top_keywords import GetTopKeywords
from app.keywords.infrastructure.repository.keyword_repository_impl import (
    KeywordRepositoryImpl,
)
from config.database.session import get_db


keyword_router = APIRouter()


@keyword_router.get(
    "/top",
    response_model=List[KeywordMentionResponse],
)
def get_top_keywords(limit: int = 20, db: Session = Depends(get_db)):
    """
    언급이 많이 된 상위 키워드 조회
    """
    repository = KeywordRepositoryImpl(db)
    use_case = GetTopKeywords(repository)
    mentions = use_case.execute(limit=limit)
    return [
        KeywordMentionResponse(
            id=m.id,
            name=m.name,
            mention_count=m.mention_count,
        )
        for m in mentions
    ]


@keyword_router.get(
    "/",
    response_model=List[KeywordResponse],
)
def get_all_keywords(db: Session = Depends(get_db)):
    """
    중복을 제거한 전체 키워드 목록 조회
    """
    repository = KeywordRepositoryImpl(db)
    keywords = repository.get_all()
    return [
        KeywordResponse(
            id=k.id,
            name=k.name,
        )
        for k in keywords
    ]


