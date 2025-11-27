from typing import Optional


class Keyword:
    def __init__(self, name: str):
        self.id: Optional[int] = None
        self.name = name


class KeywordMention:
    """
    키워드별 언급 수를 표현하는 값 객체
    """

    def __init__(self, keyword_id: int, name: str, mention_count: int):
        self.id = keyword_id
        self.name = name
        self.mention_count = mention_count