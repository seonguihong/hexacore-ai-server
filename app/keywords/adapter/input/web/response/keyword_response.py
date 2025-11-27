from pydantic import BaseModel, ConfigDict


class KeywordMentionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    mention_count: int


class KeywordResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str

