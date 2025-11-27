"""
Centralized router configuration.
All application routers are registered here and imported into main.py.
"""
from fastapi import FastAPI

from app.data.adapter.input.web.data_router import data_router
from app.social_oauth.adapter.input.web.google_oauth2_router import (
    authentication_router,
)
from app.user.adapter.input.web.user_router import user_router
from app.post_analysis.adapter.input.web.document_analysis_router import (
    post_analysis_router,
)
from app.crawling.adapter.input.web.crawling_router import crawling_router
from app.keywords.adapter.input.web.keyword_router import keyword_router

# Import ORM models to register them with SQLAlchemy Base
from app.data.infrastructure.orm.data_orm import DataORM  # noqa: F401
from app.keywords.infrastructure.orm.keyword_orm import KeywordORM  # noqa: F401
from app.user.infrastructure.orm.user_orm import UserORM  # noqa: F401


def setup_routers(app: FastAPI) -> None:
    app.include_router(authentication_router, prefix="/authentication")
    app.include_router(user_router, prefix="/user")
    app.include_router(post_analysis_router, prefix="/post-analysis")
    app.include_router(data_router, prefix="/data")
    app.include_router(crawling_router, prefix="/crawling")
    app.include_router(keyword_router, prefix="/keywords")