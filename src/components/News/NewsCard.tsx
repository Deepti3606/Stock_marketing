import React from 'react';
import { ExternalLink, Clock, Globe } from 'lucide-react';
import { NewsArticle } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'geopolitics':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600';
      case 'markets':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600';
      case 'economy':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600';
      case 'technology':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600';
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-lg transition-all duration-200 group">
      {article.urlToImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
            <Globe className="w-3 h-3 mr-1" />
            {article.category}
          </span>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3 mr-1" />
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
          {article.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {article.source.name}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
          >
            <span>Read more</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;