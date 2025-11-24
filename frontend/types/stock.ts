export type TrendingStock = {
  code: string;
  name: string;
  mentionDelta: number;
  sentiment: number;
  lastUpdated: string;
  price?: number;
  changeRate?: number;
};

export type MentionPoint = {
  timestamp: string;
  mentions: number;
};

export type SentimentSnapshot = {
  positive: number;
  neutral: number;
  negative: number;
};

export type ThemeMomentum = {
  theme: string;
  momentumScore: number;
  leaders: string[];
};

export type AlertItem = {
  id: string;
  code: string;
  name: string;
  type: "spike" | "sentiment" | "theme";
  message: string;
  detectedAt: string;
};

export type WeeklyStockStat = {
  code: string;
  name: string;
  weeklyMentions: number;
  peakTimestamp: string;
  positiveRatio: number;
};

