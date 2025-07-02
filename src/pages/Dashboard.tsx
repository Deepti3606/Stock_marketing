import React from 'react';
import MarketOverview from '../components/Dashboard/MarketOverview';
import StockCard from '../components/Dashboard/StockCard';
import QuickActions from '../components/Dashboard/QuickActions';
import SimpleChart from '../components/Charts/SimpleChart';
import { useApp } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { stocks, watchlist } = useApp();
  
  const watchlistStocks = stocks.filter(stock => watchlist.includes(stock.symbol));
  const topGainers = stocks
    .filter(stock => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <MarketOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <SimpleChart symbol="RELIANCE" height={400} />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Watchlist */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Watchlist</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {watchlistStocks.length} stocks
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {watchlistStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>

      {/* Top Gainers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Gainers</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Best performing stocks
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {topGainers.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;