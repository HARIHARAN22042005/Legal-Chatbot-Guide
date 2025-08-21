import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, ExternalLink, Bookmark, BookmarkCheck, Filter, Search, TrendingUp } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Supreme Court' | 'High Court' | 'Legislation' | 'Policy' | 'Legal Tech' | 'Bar Council';
  date: Date;
  source: string;
  url: string;
  importance: 'Low' | 'Medium' | 'High' | 'Critical';
  tags: string[];
}

const LegalNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImportance, setSelectedImportance] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    // Simulate fetching legal news with more comprehensive content
    const mockNews: NewsItem[] = [
      {
        id: '1',
        title: 'Supreme Court Clarifies Digital Evidence Standards in Criminal Cases',
        summary: 'The Supreme Court has issued new guidelines on the admissibility of digital evidence in criminal proceedings, emphasizing the need for proper authentication and chain of custody. The judgment addresses concerns about deepfakes, manipulated digital content, and establishes stricter verification protocols for electronic evidence.',
        category: 'Supreme Court',
        date: new Date('2024-01-15'),
        source: 'Supreme Court of India',
        url: '#',
        importance: 'Critical',
        tags: ['Digital Evidence', 'Criminal Law', 'Evidence Act', 'Cybercrime']
      },
      {
        id: '2',
        title: 'New Data Protection Rules for Legal Professionals',
        summary: 'The Ministry of Electronics and IT has released new data protection guidelines specifically for legal professionals handling client information.',
        category: 'Policy',
        date: new Date('2024-01-14'),
        source: 'Ministry of Electronics and IT',
        url: '#',
        importance: 'High',
        tags: ['Data Protection', 'Privacy', 'Legal Ethics']
      },
      {
        id: '3',
        title: 'Delhi High Court Introduces AI-Assisted Case Management',
        summary: 'Delhi High Court has launched a pilot program using AI to assist in case scheduling and document management, aiming to reduce delays.',
        category: 'High Court',
        date: new Date('2024-01-13'),
        source: 'Delhi High Court',
        url: '#',
        importance: 'Medium',
        tags: ['AI', 'Court Management', 'Technology']
      },
      {
        id: '4',
        title: 'Amendment to Companies Act 2013 - New Compliance Requirements',
        summary: 'The government has notified amendments to the Companies Act 2013, introducing stricter compliance requirements for private companies.',
        category: 'Legislation',
        date: new Date('2024-01-12'),
        source: 'Ministry of Corporate Affairs',
        url: '#',
        importance: 'High',
        tags: ['Companies Act', 'Compliance', 'Corporate Law']
      },
      {
        id: '5',
        title: 'Bar Council Issues New Guidelines for Online Legal Practice',
        summary: 'The Bar Council of India has issued comprehensive guidelines for lawyers practicing online, including client verification and fee collection norms.',
        category: 'Bar Council',
        date: new Date('2024-01-11'),
        source: 'Bar Council of India',
        url: '#',
        importance: 'Medium',
        tags: ['Online Practice', 'Legal Ethics', 'Professional Standards']
      },
      {
        id: '6',
        title: 'Blockchain Technology in Legal Documentation Gains Momentum',
        summary: 'Several state governments are exploring blockchain technology for maintaining legal records and property documents to prevent fraud. Karnataka and Telangana have launched pilot projects for land records digitization.',
        category: 'Legal Tech',
        date: new Date('2024-01-10'),
        source: 'Legal Technology Review',
        url: '#',
        importance: 'Medium',
        tags: ['Blockchain', 'Legal Tech', 'Property Law']
      },
      {
        id: '7',
        title: 'New Guidelines for Online Dispute Resolution in Consumer Cases',
        summary: 'The Department of Consumer Affairs has released comprehensive guidelines for ODR platforms, making online resolution mandatory for consumer disputes under ₹1 lakh. The move aims to reduce pendency in consumer courts.',
        category: 'Policy',
        date: new Date('2024-01-09'),
        source: 'Department of Consumer Affairs',
        url: '#',
        importance: 'High',
        tags: ['ODR', 'Consumer Law', 'Digital Justice']
      },
      {
        id: '8',
        title: 'Supreme Court Upholds Right to Privacy in Aadhaar Linking Cases',
        summary: 'In a landmark judgment, the Supreme Court has strengthened privacy protections while clarifying the scope of Aadhaar linking requirements for various services, balancing digital identity with fundamental rights.',
        category: 'Supreme Court',
        date: new Date('2024-01-08'),
        source: 'Supreme Court of India',
        url: '#',
        importance: 'Critical',
        tags: ['Privacy Rights', 'Aadhaar', 'Constitutional Law']
      },
      {
        id: '9',
        title: 'Insolvency and Bankruptcy Code Amendment Notified',
        summary: 'The government has notified key amendments to the IBC, introducing pre-packaged insolvency resolution for MSMEs and strengthening the resolution framework for stressed assets.',
        category: 'Legislation',
        date: new Date('2024-01-07'),
        source: 'Ministry of Corporate Affairs',
        url: '#',
        importance: 'High',
        tags: ['IBC', 'Insolvency', 'MSME', 'Corporate Law']
      },
      {
        id: '10',
        title: 'AI-Powered Legal Research Tools Approved by Bar Council',
        summary: 'The Bar Council of India has approved the use of AI-powered legal research tools for lawyers, with guidelines on ethical usage and client confidentiality in AI-assisted legal practice.',
        category: 'Bar Council',
        date: new Date('2024-01-06'),
        source: 'Bar Council of India',
        url: '#',
        importance: 'Medium',
        tags: ['AI', 'Legal Research', 'Professional Ethics']
      },
      {
        id: '11',
        title: 'Environmental Clearance Process Digitized Nationwide',
        summary: 'The Ministry of Environment has launched a fully digital platform for environmental clearances, reducing approval time from 180 days to 60 days for most projects.',
        category: 'Policy',
        date: new Date('2024-01-05'),
        source: 'Ministry of Environment',
        url: '#',
        importance: 'Medium',
        tags: ['Environment', 'Digital Governance', 'Clearances']
      },
      {
        id: '12',
        title: 'Delhi High Court Introduces Virtual Reality for Crime Scene Recreation',
        summary: 'Delhi High Court has started using VR technology for crime scene recreation in complex criminal cases, enhancing evidence presentation and jury understanding.',
        category: 'High Court',
        date: new Date('2024-01-04'),
        source: 'Delhi High Court',
        url: '#',
        importance: 'Medium',
        tags: ['VR Technology', 'Criminal Law', 'Evidence']
      }
    ];

    setTimeout(() => {
      setNews(mockNews);
      setFilteredNews(mockNews);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = news;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by importance
    if (selectedImportance !== 'All') {
      filtered = filtered.filter(item => item.importance === selectedImportance);
    }

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

      filtered = filtered.filter(item => item.date >= filterDate);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => b.date.getTime() - a.date.getTime());

    setFilteredNews(filtered);
  }, [news, selectedCategory, selectedImportance, dateRange, searchTerm]);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Supreme Court': return 'bg-purple-100 text-purple-800';
      case 'High Court': return 'bg-blue-100 text-blue-800';
      case 'Legislation': return 'bg-indigo-100 text-indigo-800';
      case 'Policy': return 'bg-green-100 text-green-800';
      case 'Legal Tech': return 'bg-cyan-100 text-cyan-800';
      case 'Bar Council': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleBookmark = (newsItem: NewsItem) => {
    if (isBookmarked(newsItem.id)) {
      removeBookmark(newsItem.id);
    } else {
      addBookmark({
        id: newsItem.id,
        title: newsItem.title,
        content: newsItem.summary,
        source: 'Legal News',
        timestamp: new Date()
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
          <h1 className="text-3xl font-bold text-gray-900">Legal News & Updates</h1>
        </div>
        <p className="text-lg text-gray-600">
          Stay updated with the latest legal developments, court judgments, and policy changes
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
              placeholder="Search news, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400" />

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Supreme Court">Supreme Court</option>
              <option value="High Court">High Court</option>
              <option value="Legislation">Legislation</option>
              <option value="Policy">Policy</option>
              <option value="Legal Tech">Legal Tech</option>
              <option value="Bar Council">Bar Council</option>
            </select>

            {/* Importance Filter */}
            <select
              value={selectedImportance}
              onChange={(e) => setSelectedImportance(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Importance</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

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

      {/* News List/Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
        {filteredNews.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== 'All' || selectedImportance !== 'All' || dateRange !== 'All'
                ? "No articles match your current filters."
                : "No legal news available at the moment."
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedImportance('All');
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
              className={`bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 ${
                viewMode === 'grid' ? 'p-4' : 'p-6'
              } hover:border-blue-200`}
            >
              <div className={`${viewMode === 'grid' ? 'space-y-3' : 'flex items-start justify-between'}`}>
                <div className="flex-1">
                  {/* Header */}
                  <div className={`flex items-center ${viewMode === 'grid' ? 'flex-wrap' : ''} gap-2 mb-3`}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getImportanceColor(item.importance)}`}>
                      {item.importance}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.date.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className={`font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer line-clamp-2 ${
                    viewMode === 'grid' ? 'text-lg' : 'text-xl'
                  }`}>
                    {item.title}
                  </h2>

                  {/* Summary */}
                  <p className={`text-gray-700 mb-4 leading-relaxed ${
                    viewMode === 'grid' ? 'text-sm line-clamp-3' : ''
                  }`}>
                    {item.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, viewMode === 'grid' ? 3 : item.tags.length).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md hover:bg-blue-100 cursor-pointer transition-colors"
                        onClick={() => setSearchTerm(tag)}
                      >
                        #{tag}
                      </span>
                    ))}
                    {viewMode === 'grid' && item.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className={`flex items-center ${viewMode === 'grid' ? 'flex-col space-y-2' : 'justify-between'}`}>
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
              </div>
            </article>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Stay Informed</h3>
          <p className="text-blue-700 mb-4">
            Legal news is updated regularly to keep you informed about the latest developments 
            in Indian law, court decisions, and regulatory changes.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-blue-600">
            <span>• Supreme Court Updates</span>
            <span>• Legislative Changes</span>
            <span>• Policy Announcements</span>
            <span>• Legal Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNews;
