import React from 'react';
import OrdersList from '../components/Orders/OrdersList';

const Orders: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
        <p className="text-gray-500 dark:text-gray-400">
          View and manage your trading orders
        </p>
      </div>

      {/* Orders List */}
      <OrdersList />
    </div>
  );
};

export default Orders;