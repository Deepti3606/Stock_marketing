import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import MobileBottomNav from './components/Layout/MobileBottomNav';
import LiveChat from './components/Chat/LiveChat';
import Dashboard from './pages/Dashboard';
import Watchlist from './pages/Watchlist';
import Portfolio from './pages/Portfolio';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Learn from './pages/Learn';
import Chat from './pages/Chat';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'watchlist':
        return <Watchlist />;
      case 'portfolio':
        return <Portfolio />;
      case 'orders':
        return <Orders />;
      case 'analytics':
        return <Analytics />;
      case 'learn':
        return <Learn />;
      case 'chat':
        return <Chat />;
      case 'settings':
        return (
          <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Settings</h2>
            <p className="text-gray-500 dark:text-gray-400">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
        <Navbar />
        <div className="flex h-[calc(100vh-73px)]">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 overflow-auto p-4 lg:p-6 pb-20 lg:pb-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
        <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab !== 'chat' && <LiveChat />}
      </div>
    </AppProvider>
  );
}

export default App;