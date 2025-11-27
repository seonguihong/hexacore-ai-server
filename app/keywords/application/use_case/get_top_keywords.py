from typing import List

from app.keywords.application.port.keyword_repository_port import KeywordRepositoryPort
from app.keywords.domain.keyword import KeywordMention


class GetTopKeywords:
    def __init__(self, keyword_repository: KeywordRepositoryPort):
        self.keyword_repository = keyword_repository

    def execute(self, limit: int) -> List[KeywordMention]:
        return self.keyword_repository.get_top_mentions(limit)

