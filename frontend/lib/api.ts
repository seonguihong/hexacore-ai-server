import type {
  AlertItem,
  MentionPoint,
  SentimentSnapshot,
  ThemeMomentum,
  TrendingStock,
  WeeklyStockStat
} from "@/types/stock";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    next: { revalidate: 30 }
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패 (${response.status})`);
  }

  return response.json();
}

export async function fetchTrendingStocks(): Promise<TrendingStock[]> {
  return request("/api/stocks/trending");
}

export async function fetchMentions(code: string): Promise<MentionPoint[]> {
  return request(`/api/stocks/${code}/mentions`);
}

export async function fetchSentiment(
  code: string
): Promise<SentimentSnapshot> {
  return request(`/api/stocks/${code}/sentiment`);
}

export async function fetchThemes(): Promise<ThemeMomentum[]> {
  return request("/api/themes");
}

export async function fetchThemeMomentum(
  theme: string
): Promise<ThemeMomentum> {
  return request(`/api/themes/${theme}/momentum`);
}

export async function fetchSpikeAlerts(): Promise<AlertItem[]> {
  return request("/api/alerts/spike");
}

export async function fetchWeeklyStockStats(): Promise<WeeklyStockStat[]> {
  return request("/api/stocks/weekly");
}

