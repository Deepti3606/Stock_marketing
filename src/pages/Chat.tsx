import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, MessageCircle, TrendingUp, Hash, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(24);
  const [activeChannel, setActiveChannel] = useState('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useApp();

  const channels = [
    { id: 'general', name: 'General', count: 24 },
    { id: 'trading', name: 'Trading Signals', count: 18 },
    { id: 'analysis', name: 'Market Analysis', count: 12 },
    { id: 'beginners', name: 'Beginners', count: 15 },
  ];

  // Mock messages for demo
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        userId: '2',
        userName: 'Priya Sharma',
        message: 'RELIANCE looking bullish today! 📈 Anyone else seeing this breakout?',
        timestamp: new Date(Date.now() - 300000),
        type: 'text',
      },
      {
        id: '2',
        userId: '3',
        userName: 'Amit Kumar',
        message: 'Just bought TCS at 3680. RSI was oversold and showing reversal signals.',
        timestamp: new Date(Date.now() - 240000),
        type: 'trade',
      },
      {
        id: '3',
        userId: '4',
        userName: 'Sneha Patel',
        message: 'Market seems volatile today. Playing safe with blue chips and defensive stocks.',
        timestamp: new Date(Date.now() - 180000),
        type: 'text',
      },
      {
        id: '4',
        userId: '5',
        userName: 'Rajesh Gupta',
        message: 'HDFC Bank breaking resistance at 1570. Could see 1600 soon! 🚀',
        timestamp: new Date(Date.now() - 120000),
        type: 'text',
      },
      {
        id: '5',
        userId: '6',
        userName: 'Kavya Singh',
        message: 'For beginners: Always use stop losses! Risk management is key to long-term success.',
        timestamp: new Date(Date.now() - 60000),
        type: 'text',
      },
    ];
    setMessages(mockMessages);
  }, [activeChannel]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      message: newMessage,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-[calc(100vh-73px)] flex flex-col lg:flex-row">
      {/* Channels Sidebar - Hidden on mobile */}
      <div className="hidden lg:block w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700">
        <div className="p-4 border-b border-gray-200 dark:border-dark-700">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Channels</h2>
          <div className="space-y-2">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                  activeChannel === channel.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4" />
                  <span className="text-sm font-medium">{channel.name}</span>
                </div>
                <span className="text-xs bg-gray-200 dark:bg-dark-600 px-2 py-1 rounded-full">
                  {channel.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Users className="w-4 h-4" />
            <span>{onlineUsers} online</span>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Online Users
            </div>
            {['Priya Sharma', 'Amit Kumar', 'Sneha Patel', 'Rajesh Gupta'].map((name, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Hash className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="font-semibold text-gray-900 dark:text-white capitalize">
                  {channels.find(c => c.id === activeChannel)?.name || 'General'}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {channels.find(c => c.id === activeChannel)?.count} members online
                </p>
              </div>
            </div>
            
            {/* Mobile channel selector */}
            <div className="lg:hidden">
              <select
                value={activeChannel}
                onChange={(e) => setActiveChannel(e.target.value)}
                className="border border-gray-300 dark:border-dark-600 rounded-lg px-3 py-1 bg-white dark:bg-dark-700 text-gray-900 dark:text-white text-sm"
              >
                {channels.map((channel) => (
                  <option key={channel.id} value={channel.id}>
                    {channel.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.userId === user.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] sm:max-w-[60%] rounded-lg p-4 ${
                  message.userId === user.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-dark-800 text-gray-900 dark:text-white border border-gray-200 dark:border-dark-700'
                }`}
              >
                {message.userId !== user.id && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium opacity-70">{message.userName}</span>
                    {message.type === 'trade' && <TrendingUp className="w-4 h-4 opacity-70" />}
                  </div>
                )}
                <p className="text-sm sm:text-base">{message.message}</p>
                <p className={`text-xs mt-2 opacity-70 ${
                  message.userId === user.id ? 'text-right' : 'text-left'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message #${channels.find(c => c.id === activeChannel)?.name.toLowerCase() || 'general'}`}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;