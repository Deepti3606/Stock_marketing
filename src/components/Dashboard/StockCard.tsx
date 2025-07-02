import React from 'react';
import { TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react';
import { Stock } from '../../types';
import { useApp } from '../../context/AppContext';

interface StockCardProps {
  stock: Stock;
  showActions?: boolean;
}

const StockCard: React.FC<StockCardProps> = ({ stock, showActions = true }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useApp();
  const isInWatchlist = watchlist.includes(stock.symbol);
  const isPositive = stock.change >= 0;

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock.symbol);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-4 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{stock.symbol}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{stock.name}</p>
        </div>
        {showActions && (
          <button
            onClick={handleWatchlistToggle}
            className={`p-2 rounded-full transition-colors ${
              isInWatchlist
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600'
            }`}
          >
            {isInWatchlist ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-success-600' : 'text-danger-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-medium">
            {isPositive ? '+' : ''}₹{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">High</p>
          <p className="font-medium text-gray-900 dark:text-white">₹{stock.high.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Low</p>
          <p className="font-medium text-gray-900 dark:text-white">₹{stock.low.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Volume</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {(stock.volume / 1000000).toFixed(1)}M
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Sector</p>
          <p className="font-medium text-gray-900 dark:text-white">{stock.sector}</p>
        </div>
      </div>

      {showActions && (
        <div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="flex-1 bg-success-600 hover:bg-success-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
            Buy
          </button>
          <button className="flex-1 bg-danger-600 hover:bg-danger-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
            Sell
          </button>
        </div>
      )}
    </div>
  );
};

export default StockCard;