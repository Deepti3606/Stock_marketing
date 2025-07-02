import React from 'react';
import PortfolioSummary from '../components/Portfolio/PortfolioSummary';
import PositionsList from '../components/Portfolio/PositionsList';

const Portfolio: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Track your investments and performance
        </p>
      </div>

      {/* Portfolio Summary */}
      <PortfolioSummary />

      {/* Positions List */}
      <PositionsList />
    </div>
  );
};

export default Portfolio;