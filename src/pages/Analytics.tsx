import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Analytics: React.FC = () => {
  const { positions, stocks } = useApp();

  // Generate analytics data
  const sectorData = React.useMemo(() => {
    const sectorMap = new Map();
    positions.forEach(position => {
      const stock = stocks.find(s => s.symbol === position.symbol);
      if (stock) {
        const value = position.currentPrice * position.quantity;
        sectorMap.set(stock.sector, (sectorMap.get(stock.sector) || 0) + value);
      }
    });
    
    return Array.from(sectorMap.entries()).map(([sector, value]) => ({
      sector,
      value: Math.round(value),
    }));
  }, [positions, stocks]);

  const performanceData = React.useMemo(() => {
    return positions.map(position => ({
      symbol: position.symbol,
      pnl: position.pnl,
      pnlPercent: position.pnlPercent,
    }));
  }, [positions]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f97316'];

  const totalInvested = positions.reduce((sum, pos) => sum + (pos.avgPrice * pos.quantity), 0);
  const currentValue = positions.reduce((sum, pos) => sum + (pos.currentPrice * pos.quantity), 0);
  const totalPnl = currentValue - totalInvested;
  const winRate = positions.length > 0 ? (positions.filter(p => p.pnl > 0).length / positions.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Analyze your trading performance and portfolio distribution
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Target className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {winRate.toFixed(1)}%
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Win Rate</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Profitable positions</p>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${
              totalPnl >= 0 
                ? 'bg-success-100 dark:bg-success-900/30 text-success-600' 
                : 'bg-danger-100 dark:bg-danger-900/30 text-danger-600'
            }`}>
              {totalPnl >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            </div>
          </div>
          <div>
            <p className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
              ₹{Math.abs(totalPnl).toLocaleString('en-IN')}
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total P&L</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {((totalPnl / totalInvested) * 100).toFixed(2)}% return
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Award className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {positions.length}
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Positions</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Current holdings</p>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Target className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{currentValue.toLocaleString('en-IN')}
            </p>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Portfolio Value</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Current market value</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Position Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="symbol" 
                tick={{ fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgb(31 41 55)',
                  border: '1px solid rgb(75 85 99)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar dataKey="pnl" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sector Distribution */}
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sector Distribution</h3>
          {sectorData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ sector, percent }) => `${sector} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(31 41 55)',
                    border: '1px solid rgb(75 85 99)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
              No position data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;