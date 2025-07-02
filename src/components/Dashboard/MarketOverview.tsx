import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MarketOverview: React.FC = () => {
  const { stocks } = useApp();

  const marketStats = React.useMemo(() => {
    const totalStocks = stocks.length;
    const gainers = stocks.filter(s => s.change > 0).length;
    const losers = stocks.filter(s => s.change < 0).length;
    const avgChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / totalStocks;
    const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);
    
    return { totalStocks, gainers, losers, avgChange, totalVolume };
  }, [stocks]);

  const stats = [
    {
      title: 'Market Sentiment',
      value: marketStats.avgChange > 0 ? 'Bullish' : 'Bearish',
      change: `${marketStats.avgChange.toFixed(2)}%`,
      isPositive: marketStats.avgChange > 0,
      icon: marketStats.avgChange > 0 ? TrendingUp : TrendingDown,
    },
    {
      title: 'Total Volume',
      value: `${(marketStats.totalVolume / 1000000).toFixed(1)}M`,
      change: '+12.5%',
      isPositive: true,
      icon: Activity,
    },
    {
      title: 'Gainers',
      value: marketStats.gainers.toString(),
      change: `${marketStats.gainers}/${marketStats.totalStocks}`,
      isPositive: marketStats.gainers > marketStats.losers,
      icon: TrendingUp,
    },
    {
      title: 'Losers',
      value: marketStats.losers.toString(),
      change: `${marketStats.losers}/${marketStats.totalStocks}`,
      isPositive: false,
      icon: TrendingDown,
    },
  ];

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Market Overview</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  stat.isPositive 
                    ? 'bg-success-100 dark:bg-success-900/30 text-success-600' 
                    : 'bg-danger-100 dark:bg-danger-900/30 text-danger-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-medium ${
                  stat.isPositive ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketOverview;