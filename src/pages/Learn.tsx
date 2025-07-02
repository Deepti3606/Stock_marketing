import React, { useState, useEffect } from 'react';
import { BookOpen, Play, FileText, Award, TrendingUp, Search, Filter, Globe, Calendar } from 'lucide-react';
import VideoCard from '../components/Learn/VideoCard';
import NewsCard from '../components/News/NewsCard';
import { LearnContent, NewsArticle } from '../types';

const Learn: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'news' | 'articles'>('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);

  // Mock learning content
  const courses: LearnContent[] = [
    {
      id: '1',
      title: 'Stock Market Basics for Beginners',
      description: 'Learn the fundamentals of stock trading and market analysis',
      type: 'video',
      videoId: 'p7HKvqRI_Bo',
      duration: '15:30',
      level: 'beginner',
      category: 'Trading Basics',
    },
    {
      id: '2',
      title: 'Technical Analysis Masterclass',
      description: 'Master chart patterns and technical indicators',
      type: 'video',
      videoId: 'VLE0WkA_FhI',
      duration: '45:20',
      level: 'intermediate',
      category: 'Technical Analysis',
    },
    {
      id: '3',
      title: 'Options Trading Strategies',
      description: 'Advanced options trading techniques and strategies',
      type: 'video',
      videoId: 'SD7sw0bf1ms',
      duration: '32:15',
      level: 'advanced',
      category: 'Options Trading',
    },
    {
      id: '4',
      title: 'Risk Management in Trading',
      description: 'Learn to protect your capital and manage risks effectively',
      type: 'video',
      videoId: 'IGZmyVrKOmw',
      duration: '28:45',
      level: 'intermediate',
      category: 'Risk Management',
    },
    {
      id: '5',
      title: 'Fundamental Analysis Guide',
      description: 'Understanding company financials and valuation methods',
      type: 'video',
      videoId: 'WEDIj9JBTC8',
      duration: '38:20',
      level: 'intermediate',
      category: 'Fundamental Analysis',
    },
    {
      id: '6',
      title: 'Cryptocurrency Trading Basics',
      description: 'Introduction to crypto markets and trading strategies',
      type: 'video',
      videoId: 'VYWc9dFqROI',
      duration: '25:10',
      level: 'beginner',
      category: 'Cryptocurrency',
    },
  ];

  const articles: LearnContent[] = [
    {
      id: 'a1',
      title: 'Understanding Candlestick Patterns',
      description: 'A comprehensive guide to reading and interpreting candlestick charts',
      type: 'article',
      url: 'https://www.investopedia.com/trading/candlestick-charting-what-is-it/',
      level: 'beginner',
      category: 'Technical Analysis',
    },
    {
      id: 'a2',
      title: 'Building a Diversified Portfolio',
      description: 'Learn how to create a balanced investment portfolio',
      type: 'article',
      url: 'https://www.investopedia.com/articles/03/072303.asp',
      level: 'intermediate',
      category: 'Portfolio Management',
    },
    {
      id: 'a3',
      title: 'Market Psychology and Trading',
      description: 'Understanding emotions and psychology in trading decisions',
      type: 'article',
      url: 'https://www.investopedia.com/articles/trading/02/110502.asp',
      level: 'advanced',
      category: 'Trading Psychology',
    },
  ];

  // Fetch daily news
  useEffect(() => {
    fetchDailyNews();
  }, []);

  const fetchDailyNews = async () => {
    setLoadingNews(true);
    try {
      // Mock news data - In production, you would use News API
      const mockNews: NewsArticle[] = [
        {
          id: '1',
          title: 'Global Markets React to Federal Reserve Policy Changes',
          description: 'Major stock indices worldwide show mixed reactions following the latest Federal Reserve announcement on interest rates and monetary policy.',
          url: 'https://example.com/news/1',
          urlToImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
          publishedAt: new Date().toISOString(),
          source: { name: 'Financial Times' },
          category: 'geopolitics',
        },
        {
          id: '2',
          title: 'Indian Stock Market Hits New Highs Amid Economic Growth',
          description: 'The Sensex and Nifty indices reached record levels as investors show confidence in India\'s economic recovery and growth prospects.',
          url: 'https://example.com/news/2',
          urlToImage: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: { name: 'Economic Times' },
          category: 'markets',
        },
        {
          id: '3',
          title: 'Technology Sector Leads Market Rally',
          description: 'Tech stocks surge as companies report strong quarterly earnings and positive guidance for the upcoming fiscal year.',
          url: 'https://example.com/news/3',
          urlToImage: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg',
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          source: { name: 'Bloomberg' },
          category: 'technology',
        },
        {
          id: '4',
          title: 'Central Bank Policies Impact Global Trade',
          description: 'Analysis of how recent central bank decisions across major economies are affecting international trade and currency markets.',
          url: 'https://example.com/news/4',
          urlToImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          source: { name: 'Reuters' },
          category: 'economy',
        },
      ];
      setNews(mockNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const filteredContent = (content: LearnContent[]) => {
    return content.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  };

  const tabs = [
    { id: 'courses', label: 'Video Courses', icon: Play },
    { id: 'news', label: 'Daily News', icon: Globe },
    { id: 'articles', label: 'Articles', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learn Trading</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Master trading with courses, daily news, and expert insights
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>Updated {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Featured Course */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
          <div className="p-3 bg-white/20 rounded-lg mb-4 sm:mb-0 w-fit">
            <Play className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Complete Trading Masterclass</h2>
            <p className="opacity-90">From beginner to advanced trader in 30 days</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm opacity-90 mb-6">
          <span>15 hours of content</span>
          <span>50+ lessons</span>
          <span>Certificate included</span>
        </div>
        <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Start Learning
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-dark-700">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Search and Filters */}
      {activeTab !== 'news' && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search courses and articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border border-gray-300 dark:border-dark-600 rounded-lg px-3 py-2 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      )}

      {/* Content */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent(courses).map((course) => (
            <VideoCard key={course.id} content={course} />
          ))}
        </div>
      )}

      {activeTab === 'news' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Daily Market & Geopolitics News
            </h2>
            <button
              onClick={fetchDailyNews}
              disabled={loadingNews}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {loadingNews ? 'Refreshing...' : 'Refresh News'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent(articles).map((article) => (
            <VideoCard key={article.id} content={article} />
          ))}
        </div>
      )}

      {/* Trading Simulator */}
      <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6 sm:p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Practice with Virtual Trading
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Test your skills in our paper trading environment with real market data and no financial risk.
          </p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Start Trading Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learn;