import React, { useState } from 'react';
import { Bookmark, Trash2, Calendar, FileText, MessageSquare, Search, BookOpen, Scale } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

const BookmarksPanel: React.FC = () => {
  const { bookmarks, removeBookmark, clearAllBookmarks } = useBookmarks();
  const [filterSource, setFilterSource] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const sources = ['All', 'Chat', 'Legal Dictionary', 'PDF Analyzer', 'Case Summarizer', 'Act & Section Search'];

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Chat':
        return <MessageSquare className="h-4 w-4" />;
      case 'Legal Dictionary':
        return <BookOpen className="h-4 w-4" />;
      case 'PDF Analyzer':
        return <FileText className="h-4 w-4" />;
      case 'Case Summarizer':
        return <Scale className="h-4 w-4" />;
      case 'Act & Section Search':
        return <Search className="h-4 w-4" />;
      default:
        return <Bookmark className="h-4 w-4" />;
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSource = filterSource === 'All' || bookmark.source === filterSource;
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSource && matchesSearch;
  });

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bookmark className="h-8 w-8 text-amber-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Saved Content</h1>
              <p className="text-sm text-gray-600">
                {bookmarks.length} saved item{bookmarks.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {bookmarks.length > 0 && (
            <button
              onClick={clearAllBookmarks}
              className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {bookmarks.length === 0 ? (
        /* Empty State */
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div>
            <Bookmark className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Bookmarks Yet</h2>
            <p className="text-gray-500 max-w-md">
              Start bookmarking legal information, case summaries, and important responses to access them here later.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Source Filter */}
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bookmarks List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {filteredBookmarks.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No bookmarks match your search criteria.</p>
                </div>
              ) : (
                filteredBookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-1 bg-gray-100 rounded">
                          {getSourceIcon(bookmark.source)}
                        </div>
                        <span className="text-sm text-gray-600">{bookmark.source}</span>
                        {bookmark.category && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {bookmark.category}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => removeBookmark(bookmark.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{bookmark.title}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">{bookmark.content}</p>

                    {/* Additional Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{bookmark.timestamp.toLocaleDateString()}</span>
                        </div>
                        
                        {bookmark.act && bookmark.section && (
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{bookmark.act} - Section {bookmark.section}</span>
                          </div>
                        )}
                        
                        {bookmark.court && (
                          <div className="flex items-center space-x-1">
                            <Scale className="h-4 w-4" />
                            <span>{bookmark.court}</span>
                          </div>
                        )}
                        
                        {bookmark.documentType && (
                          <div className="flex items-center space-x-1">
                            <FileText className="h-4 w-4" />
                            <span>{bookmark.documentType}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookmarksPanel;