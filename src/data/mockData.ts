import { Stock, Position, Order, User, ChartData } from '../types';

export const mockStocks: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    price: 2456.75,
    change: 23.45,
    changePercent: 0.96,
    volume: 15234567,
    marketCap: 16638250000000,
    sector: 'Oil & Gas',
    high: 2489.50,
    low: 2441.20,
    open: 2450.30,
    prevClose: 2433.30,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: 3678.90,
    change: -12.35,
    changePercent: -0.33,
    volume: 8765432,
    marketCap: 13456789000000,
    sector: 'IT Services',
    high: 3695.40,
    low: 3665.20,
    open: 3685.60,
    prevClose: 3691.25,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    price: 1567.45,
    change: 18.75,
    changePercent: 1.21,
    volume: 12345678,
    marketCap: 11234567000000,
    sector: 'Banking',
    high: 1575.80,
    low: 1552.30,
    open: 1555.70,
    prevClose: 1548.70,
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    price: 1456.30,
    change: 8.95,
    changePercent: 0.62,
    volume: 6789012,
    marketCap: 6123456000000,
    sector: 'IT Services',
    high: 1468.90,
    low: 1445.60,
    open: 1450.25,
    prevClose: 1447.35,
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd',
    price: 987.65,
    change: -5.45,
    changePercent: -0.55,
    volume: 9876543,
    marketCap: 6912345000000,
    sector: 'Banking',
    high: 995.80,
    low: 982.40,
    open: 992.10,
    prevClose: 993.10,
  },
  {
    symbol: 'HINDUNILVR',
    name: 'Hindustan Unilever Ltd',
    price: 2345.80,
    change: 15.60,
    changePercent: 0.67,
    volume: 3456789,
    marketCap: 5543210000000,
    sector: 'FMCG',
    high: 2358.90,
    low: 2334.50,
    open: 2340.20,
    prevClose: 2330.20,
  },
  {
    symbol: 'ITC',
    name: 'ITC Ltd',
    price: 456.75,
    change: 2.35,
    changePercent: 0.52,
    volume: 15678901,
    sector: 'FMCG',
    marketCap: 5678901000000,
    high: 459.80,
    low: 453.20,
    open: 455.40,
    prevClose: 454.40,
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    price: 567.90,
    change: -3.25,
    changePercent: -0.57,
    volume: 23456789,
    marketCap: 5067890000000,
    sector: 'Banking',
    high: 572.50,
    low: 564.30,
    open: 570.15,
    prevClose: 571.15,
  },
];

export const mockUser: User = {
  id: '1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  balance: 985000,
  totalPnl: 15000,
  totalPnlPercent: 1.55,
  joinedAt: new Date('2024-01-15'),
};

export const mockPositions: Position[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    quantity: 10,
    avgPrice: 2420.50,
    currentPrice: 2456.75,
    pnl: 362.50,
    pnlPercent: 1.50,
    type: 'long',
  },
  {
    id: '2',
    symbol: 'TCS',
    quantity: 5,
    avgPrice: 3720.00,
    currentPrice: 3678.90,
    pnl: -205.50,
    pnlPercent: -1.11,
    type: 'long',
  },
  {
    id: '3',
    symbol: 'HDFCBANK',
    quantity: 8,
    avgPrice: 1540.25,
    currentPrice: 1567.45,
    pnl: 217.60,
    pnlPercent: 1.77,
    type: 'long',
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    symbol: 'INFY',
    type: 'buy',
    orderType: 'limit',
    quantity: 15,
    price: 1450.00,
    status: 'pending',
    timestamp: new Date(),
  },
  {
    id: '2',
    symbol: 'ICICIBANK',
    type: 'sell',
    orderType: 'stop-loss',
    quantity: 20,
    price: 980.00,
    stopPrice: 985.00,
    status: 'pending',
    timestamp: new Date(Date.now() - 3600000),
  },
];

// Generate mock chart data
export const generateChartData = (symbol: string, days: number = 30): ChartData[] => {
  const stock = mockStocks.find(s => s.symbol === symbol);
  if (!stock) return [];

  const data: ChartData[] = [];
  let currentPrice = stock.price;
  const now = Date.now();
  
  for (let i = days - 1; i >= 0; i--) {
    const timestamp = now - (i * 24 * 60 * 60 * 1000);
    const volatility = 0.02; // 2% daily volatility
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * 0.01 * currentPrice;
    const low = Math.min(open, close) - Math.random() * 0.01 * currentPrice;
    const volume = Math.floor(Math.random() * 1000000) + 500000;
    
    data.push({
      timestamp,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume,
    });
    
    currentPrice = close;
  }
  
  return data;
};