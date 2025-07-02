import React from 'react';
import { 
  BarChart3, 
  Wallet, 
  List, 
  TrendingUp, 
  FileText, 
  Settings,
  PieChart,
  Clock,
  BookOpen,
  MessageCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'watchlist', label: 'Watchlist', icon: List },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'orders', label: 'Orders', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'chat', label: 'Live Chat', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 h-full hidden lg:block">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-700 mt-auto">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Today's P&L</span>
          </div>
          <p className="text-lg font-bold">+₹2,350</p>
          <p className="text-xs opacity-80">+0.24%</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;