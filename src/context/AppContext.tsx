import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Stock, Position, Order, User } from '../types';
import { mockStocks, mockUser, mockPositions, mockOrders } from '../data/mockData';

interface AppContextType {
  user: User;
  stocks: Stock[];
  positions: Position[];
  orders: Order[];
  watchlist: string[];
  isDarkMode: boolean;
  isAuthenticated: boolean;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  toggleTheme: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => void;
  updateStockPrices: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(mockUser);
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [watchlist, setWatchlist] = useState<string[]>(['RELIANCE', 'TCS', 'HDFCBANK']);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const volatility = 0.001; // 0.1% volatility per update
          const change = (Math.random() - 0.5) * volatility * stock.price;
          const newPrice = Math.max(0.01, stock.price + change);
          const priceChange = newPrice - stock.prevClose;
          const changePercent = (priceChange / stock.prevClose) * 100;
          
          return {
            ...stock,
            price: Math.round(newPrice * 100) / 100,
            change: Math.round(priceChange * 100) / 100,
            changePercent: Math.round(changePercent * 100) / 100,
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Update positions based on current stock prices
  useEffect(() => {
    setPositions(prevPositions =>
      prevPositions.map(position => {
        const stock = stocks.find(s => s.symbol === position.symbol);
        if (!stock) return position;
        
        const currentValue = stock.price * position.quantity;
        const investedValue = position.avgPrice * position.quantity;
        const pnl = currentValue - investedValue;
        const pnlPercent = (pnl / investedValue) * 100;
        
        return {
          ...position,
          currentPrice: stock.price,
          pnl: Math.round(pnl * 100) / 100,
          pnlPercent: Math.round(pnlPercent * 100) / 100,
        };
      })
    );
  }, [stocks]);

  const addToWatchlist = (symbol: string) => {
    setWatchlist(prev => [...prev, symbol]);
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(s => s !== symbol));
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      document.documentElement.classList.toggle('dark', newTheme);
      return newTheme;
    });
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    if (email && password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration
    if (name && email && password) {
      const newUser: User = {
        ...mockUser,
        name,
        email,
        id: Date.now().toString(),
      };
      setUser(newUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'timestamp' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'pending',
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateStockPrices = () => {
    // Trigger a larger price movement for demo purposes
    setStocks(prevStocks => 
      prevStocks.map(stock => {
        const volatility = 0.005; // 0.5% volatility
        const change = (Math.random() - 0.5) * volatility * stock.price;
        const newPrice = Math.max(0.01, stock.price + change);
        const priceChange = newPrice - stock.prevClose;
        const changePercent = (priceChange / stock.prevClose) * 100;
        
        return {
          ...stock,
          price: Math.round(newPrice * 100) / 100,
          change: Math.round(priceChange * 100) / 100,
          changePercent: Math.round(changePercent * 100) / 100,
        };
      })
    );
  };

  const value: AppContextType = {
    user,
    stocks,
    positions,
    orders,
    watchlist,
    isDarkMode,
    isAuthenticated,
    addToWatchlist,
    removeFromWatchlist,
    toggleTheme,
    login,
    register,
    logout,
    placeOrder,
    updateStockPrices,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};