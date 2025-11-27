import pytest
from unittest.mock import patch, MagicMock

from app.crawling.Engine.CrawlingEngine import CrawlingEngine


class TestCrawlingEngine:
    """CrawlingEngine 파싱 로직 테스트"""

    @pytest.fixture
    def engine(self):
        """OpenAI 서비스를 Mock하여 CrawlingEngine 생성"""
        with patch('app.crawling.Engine.CrawlingEngine.OpenAIServiceImpl'):
            return CrawlingEngine()

    def test_extract_links_from_list_page_with_valid_html(self, engine):
        """목록 페이지에서 링크를 정상적으로 추출한다"""
        html = """
        <html>
        <body>
            <p class="tit">
                <a class="best-title" href="javascript:orgBbsWrtView(12345, 'N11023')">테스트 제목</a>
            </p>
            <p class="tit">
                <a class="best-title" href="javascript:orgBbsWrtView(67890, 'N11023')">테스트 제목2</a>
            </p>
        </body>
        </html>
        """

        links = engine.extract_links_from_list_page(html, page=1)

        assert len(links) == 2
        assert "seq=12345" in links[0]
        assert "seq=67890" in links[1]
        assert "page=1" in links[0]

    def test_extract_links_from_list_page_with_no_articles(self, engine):
        """게시글이 없는 페이지에서는 빈 리스트를 반환한다"""
        html = "<html><body><div>빈 페이지</div></body></html>"

        links = engine.extract_links_from_list_page(html, page=1)

        assert links == []

    def test_parse_article_with_title_and_content(self, engine):
        """게시글에서 제목과 본문을 파싱한다"""
        html = """
        <html>
        <body>
            <h1>테스트 게시글 제목</h1>
            <div class="board-view-cont">
                <p>게시글 본문 내용입니다.</p>
                <p>두 번째 문단입니다.</p>
            </div>
        </body>
        </html>
        """

        title, content = engine.parse_article(html)

        assert title == "테스트 게시글 제목"
        assert "게시글 본문 내용입니다" in content
        assert "두 번째 문단입니다" in content

    def test_parse_article_without_title(self, engine):
        """제목이 없는 경우 '제목 없음'을 반환한다"""
        html = """
        <html>
        <body>
            <div class="board-view-cont">
                <p>본문만 있는 게시글</p>
            </div>
        </body>
        </html>
        """

        title, content = engine.parse_article(html)

        assert title == "제목 없음"
        assert "본문만 있는 게시글" in content

    def test_parse_article_without_content(self, engine):
        """본문이 없는 경우 빈 문자열을 반환한다"""
        html = """
        <html>
        <body>
            <h1>제목만 있는 게시글</h1>
        </body>
        </html>
        """

        title, content = engine.parse_article(html)

        assert title == "제목만 있는 게시글"
        assert content == ""

    def test_extract_links_regex_pattern(self, engine):
        """정규식이 다양한 형태의 href를 처리한다"""
        html = """
        <html>
        <body>
            <p class="tit">
                <a class="best-title" href="javascript:orgBbsWrtView(999, 'BOARD123')">제목</a>
            </p>
        </body>
        </html>
        """

        links = engine.extract_links_from_list_page(html, page=3)

        assert len(links) == 1
        assert "id=BOARD123" in links[0]
        assert "seq=999" in links[0]
        assert "page=3" in links[0]