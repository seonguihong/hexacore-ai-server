from sqlalchemy import Column, Integer, String, UniqueConstraint

from config.database.session import Base


class KeywordORM(Base):
    __tablename__ = "keywords"
    __table_args__ = (UniqueConstraint("name", name="uq_keywords_name"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)

