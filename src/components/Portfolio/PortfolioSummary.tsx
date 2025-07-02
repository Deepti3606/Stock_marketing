import React from 'react';
import { TrendingUp, TrendingDown, Wallet, PieChart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PortfolioSummary: React.FC = () => {
  const { user, positions } = useApp();

  const portfolioStats = React.useMemo(() => {
    const totalInvested = positions.reduce((sum, pos) => sum + (pos.avgPrice * pos.quantity), 0);
    const currentValue = positions.reduce((sum, pos) => sum + (pos.currentPrice * pos.quantity), 0);
    const totalPnl = currentValue - totalInvested;
    const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
    const dayChange = positions.reduce((sum, pos) => sum + pos.pnl, 0);
    const winners = positions.filter(pos => pos.pnl > 0).length;
    const losers = positions.filter(pos => pos.pnl < 0).length;

    return {
      totalInvested,
      currentValue,
      totalPnl,
      totalPnlPercent,
      dayChange,
      winners,
      losers,
      availableBalance: user.balance - totalInvested,
    };
  }, [positions, user.balance]);

  const stats = [
    {
      title: 'Total Value',
      value: `₹${portfolioStats.currentValue.toLocaleString('en-IN')}`,
      subtitle: 'Current portfolio value',
      icon: Wallet,
      color: 'primary',
    },
    {
      title: 'Total P&L',
      value: `₹${portfolioStats.totalPnl.toLocaleString('en-IN')}`,
      subtitle: `${portfolioStats.totalPnlPercent.toFixed(2)}% overall return`,
      icon: portfolioStats.totalPnl >= 0 ? TrendingUp : TrendingDown,
      color: portfolioStats.totalPnl >= 0 ? 'success' : 'danger',
    },
    {
      title: 'Invested',
      value: `₹${portfolioStats.totalInvested.toLocaleString('en-IN')}`,
      subtitle: 'Total amount invested',
      icon: PieChart,
      color: 'primary',
    },
    {
      title: 'Available',
      value: `₹${portfolioStats.availableBalance.toLocaleString('en-IN')}`,
      subtitle: 'Available for trading',
      icon: Wallet,
      color: 'success',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600',
            success: 'bg-success-100 dark:bg-success-900/30 text-success-600',
            danger: 'bg-danger-100 dark:bg-danger-900/30 text-danger-600',
          };

          return (
            <div
              key={index}
              className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  {stat.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Summary */}
      <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Summary</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Winners: {portfolioStats.winners}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Losers: {portfolioStats.losers}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <p className="text-2xl font-bold text-success-600">
              {portfolioStats.winners}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Profitable Positions</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <p className="text-2xl font-bold text-danger-600">
              {portfolioStats.losers}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Loss-making Positions</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <p className={`text-2xl font-bold ${portfolioStats.totalPnlPercent >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
              {portfolioStats.totalPnlPercent.toFixed(2)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Overall Return</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;