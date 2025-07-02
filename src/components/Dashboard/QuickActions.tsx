import React from 'react';
import { Plus, Minus, BarChart3, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const QuickActions: React.FC = () => {
  const { updateStockPrices } = useApp();

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center space-x-2 bg-success-600 hover:bg-success-700 text-white py-3 px-4 rounded-lg transition-colors group">
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Buy Stock</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 bg-danger-600 hover:bg-danger-700 text-white py-3 px-4 rounded-lg transition-colors group">
          <Minus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Sell Stock</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors group">
          <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="font-medium">View Charts</span>
        </button>
        
        <button 
          onClick={updateStockPrices}
          className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors group"
        >
          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <span className="font-medium">Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;