from typing import List, Optional


class Data:
    def __init__(
        self,
        title: str,
        content: str,
        keywords: Optional[List[str]] = None,
    ):
        self.id: Optional[int] = None
        self.title = title
        self.content = content
        self.keywords: List[str] = keywords or []

    def add_keyword(self, keyword: str) -> None:
        self.keywords.append(keyword)