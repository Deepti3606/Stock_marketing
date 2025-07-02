import React from 'react';
import { Plus, Search } from 'lucide-react';
import StockCard from '../components/Dashboard/StockCard';
import { useApp } from '../context/AppContext';

const Watchlist: React.FC = () => {
  const { stocks, watchlist, addToWatchlist } = useApp();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showAddStocks, setShowAddStocks] = React.useState(false);

  const watchlistStocks = stocks.filter(stock => watchlist.includes(stock.symbol));
  const availableStocks = stocks.filter(stock => 
    !watchlist.includes(stock.symbol) && 
    (stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
     stock.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Watchlist</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track your favorite stocks ({watchlistStocks.length} stocks)
          </p>
        </div>
        <button
          onClick={() => setShowAddStocks(!showAddStocks)}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stocks</span>
        </button>
      </div>

      {/* Add Stocks Section */}
      {showAddStocks && (
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Stocks to Watchlist</h3>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
            />
          </div>

          {/* Available Stocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {availableStocks.slice(0, 9).map((stock) => (
              <div key={stock.symbol} className="border border-gray-200 dark:border-dark-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{stock.symbol}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{stock.name}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{stock.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => addToWatchlist(stock.symbol)}
                    className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Watchlist Stocks */}
      {watchlistStocks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {watchlistStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Plus className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Stocks in Watchlist</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Add stocks to track their performance.</p>
          <button
            onClick={() => setShowAddStocks(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Your First Stock
          </button>
        </div>
      )}
    </div>
  );
};

export default Watchlist;