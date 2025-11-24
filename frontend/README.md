# Hexa Stock Dashboard

Next.js 기반의 대시보드로 `hexacore-ai-server` 백엔드에서 제공하는 주식 언급량/감정/테마 데이터를 시각화합니다.

## 실행 방법

```bash
cd frontend
npm install
npm run dev
```

기본 API 엔드포인트는 `http://localhost:8000`이며, 필요 시 `.env.local` 파일에 `NEXT_PUBLIC_API_BASE_URL`을 정의하세요.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

