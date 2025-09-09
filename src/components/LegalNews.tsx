import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, ExternalLink, Bookmark, BookmarkCheck, Filter, Search, TrendingUp, AlertTriangle } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  date: Date;
  source: string;
  url: string;
  imageUrl: string | null;
}

const LegalNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const { addBookmark, removeBookmark, bookmarks } = useBookmarks();

  const isBookmarked = (id: string) => bookmarks.some(b => b.id === id);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;

      if (!apiKey) {
        setError("News API key is missing. Please add it to your .env file.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&q=legal&apiKey=${apiKey}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch news');
        }
        const data = await response.json();
        
        const mappedNews: NewsItem[] = data.articles
          .filter((article: any) => article.title && article.url)
          .map((article: any) => ({
            id: article.url,
            title: article.title,
            summary: article.description,
            date: new Date(article.publishedAt),
            source: article.source.name,
            url: article.url,
            imageUrl: article.urlToImage,
          }));

        setNews(mappedNews);
        setFilteredNews(mappedNews);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    // Filter by date range
    if (dateRange !== 'All') {
      const now = new Date();
      const filterDate = new Date();

      switch (dateRange) {
        case 'Today':
          filterDate.setDate(now.getDate());
          break;
        case 'Week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'Month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      // Set time to beginning of the day for accurate comparison
      filterDate.setHours(0, 0, 0, 0);

      filtered = filtered.filter(item => item.date >= filterDate);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.summary && item.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => b.date.getTime() - a.date.getTime());

    setFilteredNews(filtered);
  }, [news, dateRange, searchTerm]);

  const toggleBookmark = (newsItem: NewsItem) => {
    if (isBookmarked(newsItem.id)) {
      removeBookmark(newsItem.id);
    } else {
      addBookmark({
        id: newsItem.id,
        title: newsItem.title,
        content: newsItem.summary || '',
        source: 'Legal News',
        timestamp: new Date(),
        category: 'Legal News'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Newspaper className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Live Legal News</h1>
        </div>
        <p className="text-lg text-gray-600">
          Stay updated with the latest legal developments from sources across India.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400" />

            {/* Date Range Filter */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Time</option>
              <option value="Today">Today</option>
              <option value="Week">This Week</option>
              <option value="Month">This Month</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span>{filteredNews.length} articles found</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-8 flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5" />
          <div>
            <h4 className="font-bold">Error</h4>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* News List/Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
        {filteredNews.length === 0 && !loading ? (
          <div className="col-span-full text-center py-12">
            <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-600">
              {searchTerm || dateRange !== 'All'
                ? "No articles match your current filters."
                : "No legal news available at the moment."
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setDateRange('All');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredNews.map(item => (
            <article
              key={item.id}
              className={`bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 flex flex-col ${
                viewMode === 'grid' ? 'p-4' : 'p-6'
              } hover:border-blue-200`}
            >
              {viewMode === 'grid' && (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={item.imageUrl || './placeholder.jpg'} 
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-t-lg mb-4"
                    onError={(e) => (e.currentTarget.src = './placeholder.jpg')}
                  />
                </a>
              )}
              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.source}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.date.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className={`font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer line-clamp-3 ${
                    viewMode === 'grid' ? 'text-lg' : 'text-xl'
                  }`}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </h2>

                  {/* Summary */}
                  <p className={`text-gray-700 mb-4 leading-relaxed flex-1 ${
                    viewMode === 'grid' ? 'text-sm line-clamp-4' : 'line-clamp-2'
                  }`}>
                    {item.summary}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Source: {item.source}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleBookmark(item)}
                      className={`p-1.5 rounded-full transition-colors ${
                        isBookmarked(item.id)
                          ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                          : 'text-gray-400 hover:text-amber-600 hover:bg-gray-50'
                      }`}
                      title={isBookmarked(item.id) ? 'Remove bookmark' : 'Bookmark article'}
                    >
                      {isBookmarked(item.id) ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      <span>Read More</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default LegalNews;
