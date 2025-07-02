export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  high: number;
  low: number;
  open: number;
  prevClose: number;
}

export interface Position {
  id: string;
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  type: 'long' | 'short';
}

export interface Order {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop-loss';
  quantity: number;
  price?: number;
  stopPrice?: number;
  status: 'pending' | 'executed' | 'cancelled';
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  totalPnl: number;
  totalPnlPercent: number;
  joinedAt: Date;
  avatar?: string;
  isOnline?: boolean;
}

export interface ChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category: 'geopolitics' | 'markets' | 'economy' | 'technology';
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'trade' | 'system';
}

export interface LearnContent {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'course';
  url?: string;
  videoId?: string;
  duration?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail?: string;
}