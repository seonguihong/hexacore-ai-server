from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List

from app.crawling.Engine.CrawlingEngine import CrawlingEngine, Article


crawling_router = APIRouter(tags=["Crawling"])


class CrawlingResponse(BaseModel):
    articles: List[dict]
    total_count: int


@crawling_router.get("/paxnet", response_model=CrawlingResponse)
async def crawl_paxnet(
    page_count: int = Query(default=1, ge=1, le=5, description="크롤링할 페이지 수 (1-5)")
):
    """
    팩스넷 자유게시판 크롤링 테스트

    - page_count: 크롤링할 페이지 수 (기본 1, 최대 5)
    - 각 게시글의 제목, 본문, URL을 반환합니다.
    """
    engine = CrawlingEngine()
    articles = await engine.article_analysis(page_count=page_count)

    return CrawlingResponse(
        articles=[
            {"title": a.title, "content": a.content[:500], "url": a.url, "analysis": a.analysis}
            for a in articles
        ],
        total_count=len(articles)
    )


@crawling_router.get("/paxnet/test-parse")
async def test_parse_article():
    """
    파싱 로직 테스트 (실제 크롤링 없이 샘플 HTML로 테스트)
    """
    engine = CrawlingEngine()

    sample_html = """
    <html>
    <body>
        <h1>테스트 제목입니다</h1>
        <div class="board-view-cont">
            <p>이것은 테스트 본문입니다.</p>
        </div>
    </body>
    </html>
    """

    title, content = engine.parse_article(sample_html)

    return {
        "title": title,
        "content": content,
        "status": "파싱 로직이 정상 동작합니다"
    }
