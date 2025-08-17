import React, { useState, useMemo } from 'react';
import { Gavel, Search, Calendar, MapPin, Bookmark, BookmarkCheck, Scale, ExternalLink } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

interface CasePrecedent {
  id: string;
  title: string;
  court: string;
  year: number;
  citation: string;
  summary: string;
  keyPrinciples: string[];
  relevantSections: string[];
  category: string;
  precedentValue: 'High' | 'Medium' | 'Low';
  relatedCases: string[];
  facts: string;
  judgment: string;
}

const casePrecedents: CasePrecedent[] = [
  {
    id: 'maneka-gandhi-1978',
    title: 'Maneka Gandhi vs. Union of India',
    court: 'Supreme Court of India',
    year: 1978,
    citation: 'AIR 1978 SC 597',
    summary: 'Landmark case that expanded the scope of Article 21 (Right to Life and Personal Liberty) and established the doctrine of procedural due process.',
    keyPrinciples: [
      'Right to life includes right to live with human dignity',
      'Procedure established by law must be fair, just and reasonable',
      'Articles 14, 19 and 21 are interconnected and form the golden triangle',
      'Arbitrary state action violates due process'
    ],
    relevantSections: ['Article 14', 'Article 19', 'Article 21'],
    category: 'Constitutional Law',
    precedentValue: 'High',
    relatedCases: ['A.K. Gopalan vs. State of Madras', 'Kharak Singh vs. State of UP'],
    facts: 'Petitioner\'s passport was impounded without giving her an opportunity to be heard. She challenged this action as violation of her fundamental rights.',
    judgment: 'Supreme Court held that the procedure must be fair and reasonable, not merely in accordance with some law. This case revolutionized constitutional interpretation in India.'
  },
  {
    id: 'kesavananda-bharati-1973',
    title: 'Kesavananda Bharati vs. State of Kerala',
    court: 'Supreme Court of India',
    year: 1973,
    citation: 'AIR 1973 SC 1461',
    summary: 'Historic case that established the Basic Structure Doctrine, limiting Parliament\'s power to amend the Constitution.',
    keyPrinciples: [
      'Parliament cannot alter the basic structure of the Constitution',
      'Judicial review is part of basic structure',
      'Separation of powers is fundamental',
      'Constitutional amendments have limitations'
    ],
    relevantSections: ['Article 368', 'Article 13', 'Article 32'],
    category: 'Constitutional Law',
    precedentValue: 'High',
    relatedCases: ['Golak Nath vs. State of Punjab', 'Minerva Mills vs. Union of India'],
    facts: 'Challenge to Kerala Land Reforms Act and constitutional amendments that sought to place certain laws beyond judicial review.',
    judgment: 'Supreme Court by majority held that Parliament cannot destroy or damage the basic features of the Constitution through amendments.'
  },
  {
    id: 'vishaka-1997',
    title: 'Vishaka vs. State of Rajasthan',
    court: 'Supreme Court of India',
    year: 1997,
    citation: 'AIR 1997 SC 3011',
    summary: 'Landmark judgment on sexual harassment at workplace, laying down guidelines for prevention and redressal.',
    keyPrinciples: [
      'Right to work in environment free from sexual harassment',
      'Employer has duty to prevent sexual harassment',
      'Complaint committee must be constituted',
      'International conventions can be used to interpret fundamental rights'
    ],
    relevantSections: ['Article 14', 'Article 15', 'Article 19', 'Article 21'],
    category: 'Women Rights',
    precedentValue: 'High',
    relatedCases: ['Apparel Export Promotion Council vs. A.K. Chopra', 'Medha Kotwal vs. Union of India'],
    facts: 'Gang rape of social worker in Rajasthan highlighted absence of legislation on sexual harassment at workplace.',
    judgment: 'Court laid down comprehensive guidelines for prevention of sexual harassment, later codified in Sexual Harassment Act 2013.'
  },
  {
    id: 'olga-tellis-1985',
    title: 'Olga Tellis vs. Bombay Municipal Corporation',
    court: 'Supreme Court of India',
    year: 1985,
    citation: 'AIR 1986 SC 180',
    summary: 'Case recognizing right to livelihood as part of right to life under Article 21.',
    keyPrinciples: [
      'Right to livelihood is part of right to life',
      'Pavement dwellers have right to life and shelter',
      'Eviction without notice violates due process',
      'State must provide alternative accommodation'
    ],
    relevantSections: ['Article 21', 'Article 19(1)(e)', 'Article 39(a)'],
    category: 'Social Rights',
    precedentValue: 'High',
    relatedCases: ['Chameli Singh vs. State of UP', 'Shantistar Builders vs. Narayan Totame'],
    facts: 'Pavement dwellers in Mumbai challenged their eviction without notice or alternative accommodation.',
    judgment: 'Court held that right to life includes right to livelihood and pavement dwellers cannot be evicted without following due process.'
  }
];

const categories = ['All', ...Array.from(new Set(casePrecedents.map(case_ => case_.category)))];
const courts = ['All', ...Array.from(new Set(casePrecedents.map(case_ => case_.court)))];

const PrecedentFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCourt, setSelectedCourt] = useState('All');
  const [selectedCase, setSelectedCase] = useState<CasePrecedent | null>(null);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const filteredCases = useMemo(() => {
    return casePrecedents.filter(case_ => {
      const searchString = `${case_.title} ${case_.summary} ${case_.keyPrinciples.join(' ')}`.toLowerCase();
      const matchesSearch = searchString.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || case_.category === selectedCategory;
      const matchesCourt = selectedCourt === 'All' || case_.court === selectedCourt;
      return matchesSearch && matchesCategory && matchesCourt;
    });
  }, [searchTerm, selectedCategory, selectedCourt]);

  const isBookmarked = (case_: CasePrecedent) => {
    return bookmarks.some(bookmark => bookmark.id === case_.id);
  };

  const toggleBookmark = (case_: CasePrecedent) => {
    if (isBookmarked(case_)) {
      removeBookmark(case_.id);
    } else {
      addBookmark({
        id: case_.id,
        title: case_.title,
        content: case_.summary,
        source: 'Case Precedents',
        timestamp: new Date(),
        category: case_.category,
        court: case_.court
      });
    }
  };

  const getPrecedentColor = (value: string) => {
    switch (value) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Cases List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Gavel className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Case Precedents</h1>
              <p className="text-sm text-gray-600">Find related case precedents</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search cases, principles, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>Category: {category}</option>
              ))}
            </select>

            <select
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {courts.map(court => (
                <option key={court} value={court}>Court: {court}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredCases.map((case_) => (
            <button
              key={case_.id}
              onClick={() => setSelectedCase(case_)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedCase?.id === case_.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getPrecedentColor(case_.precedentValue)}`}>
                    {case_.precedentValue}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                    {case_.category}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{case_.year}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{case_.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{case_.court}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{case_.summary}</p>
            </button>
          ))}

          {filteredCases.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>No precedents found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Case Details */}
      <div className="flex-1 flex flex-col">
        {selectedCase ? (
          <div className="p-6 overflow-y-auto">
            <div className="max-w-4xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPrecedentColor(selectedCase.precedentValue)}`}>
                      {selectedCase.precedentValue} Precedent
                    </span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                      {selectedCase.category}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCase.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Scale className="h-4 w-4" />
                      <span>{selectedCase.court}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedCase.year}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleBookmark(selectedCase)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked(selectedCase)
                      ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {isBookmarked(selectedCase) ? (
                    <BookmarkCheck className="h-6 w-6" />
                  ) : (
                    <Bookmark className="h-6 w-6" />
                  )}
                </button>
              </div>

              {/* Citation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-900">Legal Citation</h3>
                    <p className="text-blue-800 font-mono">{selectedCase.citation}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Case Summary</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedCase.summary}</p>
              </div>

              {/* Facts */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Facts</h2>
                <p className="text-gray-700 leading-relaxed">{selectedCase.facts}</p>
              </div>

              {/* Key Principles */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Legal Principles</h2>
                <ul className="space-y-3">
                  {selectedCase.keyPrinciples.map((principle, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 leading-relaxed">{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Relevant Sections */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Relevant Constitutional/Legal Sections</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.relevantSections.map((section, index) => (
                    <span key={index} className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                      {section}
                    </span>
                  ))}
                </div>
              </div>

              {/* Judgment */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Judgment</h2>
                <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-gray-800 leading-relaxed">{selectedCase.judgment}</p>
                </div>
              </div>

              {/* Related Cases */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Cases</h2>
                <div className="space-y-2">
                  {selectedCase.relatedCases.map((relatedCase, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{relatedCase}</span>
                      <button className="text-blue-600 hover:text-blue-700 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Legal Research Disclaimer</h4>
                <p className="text-sm text-yellow-700">
                  This case information is provided for research and educational purposes. Legal precedents may be overruled, distinguished, or modified by subsequent decisions. Always verify current legal status and consult qualified legal professionals for case-specific advice and current interpretations.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <Gavel className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">Select a Case Precedent</h2>
              <p className="text-gray-500 max-w-md">
                Choose a case from the list to view detailed information about legal principles, facts, and precedent value.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrecedentFinder;