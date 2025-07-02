import React from 'react';
import { Play, Clock, BookOpen } from 'lucide-react';
import { LearnContent } from '../../types';

interface VideoCardProps {
  content: LearnContent;
}

const VideoCard: React.FC<VideoCardProps> = ({ content }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600';
    }
  };

  const handleClick = () => {
    if (content.type === 'video' && content.videoId) {
      window.open(`https://www.youtube.com/watch?v=${content.videoId}`, '_blank');
    } else if (content.url) {
      window.open(content.url, '_blank');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
    >
      <div className="relative aspect-video bg-gray-100 dark:bg-dark-700">
        {content.type === 'video' && content.videoId ? (
          <img
            src={`https://img.youtube.com/vi/${content.videoId}/maxresdefault.jpg`}
            alt={content.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://img.youtube.com/vi/${content.videoId}/hqdefault.jpg`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <div className="bg-primary-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-200">
            <Play className="w-6 h-6" />
          </div>
        </div>

        {content.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {content.duration}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(content.level)}`}>
            {content.level}
          </span>
          {content.duration && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              {content.duration}
            </div>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {content.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {content.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-primary-600 font-medium">
            {content.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {content.type === 'video' ? 'Video' : 'Article'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;