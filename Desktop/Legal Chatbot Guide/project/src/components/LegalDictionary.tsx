import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

interface LegalTerm {
  term: string;
  definition: string;
  category: string;
  examples?: string[];
  relatedTerms?: string[];
}

const legalTerms: LegalTerm[] = [
  {
    term: 'Bail',
    definition: 'A legal mechanism that allows an accused person to be released from custody temporarily while awaiting trial, usually upon payment of money or other security.',
    category: 'Criminal Law',
    examples: ['Regular bail', 'Anticipatory bail', 'Interim bail'],
    relatedTerms: ['Surety', 'Bond', 'Custody']
  },
  {
    term: 'FIR (First Information Report)',
    definition: 'A written document prepared by police when they receive information about the commission of a cognizable offense.',
    category: 'Criminal Procedure',
    examples: ['Complaint FIR', 'Zero FIR', 'Cross FIR'],
    relatedTerms: ['Cognizable offense', 'Investigation', 'Police station']
  },
  {
    term: 'Habeas Corpus',
    definition: 'A writ requiring a person under arrest to be brought before a judge or into court to determine if their detention is lawful.',
    category: 'Constitutional Law',
    examples: ['Detention without trial', 'Illegal imprisonment'],
    relatedTerms: ['Fundamental Rights', 'Writ petition', 'Personal liberty']
  },
  {
    term: 'Contract',
    definition: 'A legally binding agreement between two or more parties that creates mutual obligations enforceable by law.',
    category: 'Contract Law',
    examples: ['Sale agreement', 'Employment contract', 'Lease deed'],
    relatedTerms: ['Offer', 'Acceptance', 'Consideration', 'Breach']
  },
  {
    term: 'Tort',
    definition: 'A civil wrong that causes harm to another person, leading to legal liability for the person who commits the tortious act.',
    category: 'Tort Law',
    examples: ['Negligence', 'Defamation', 'Trespass'],
    relatedTerms: ['Damages', 'Liability', 'Civil remedy']
  },
  {
    term: 'Injunction',
    definition: 'A judicial order restraining a person from beginning or continuing an action threatening or invading the legal right of another.',
    category: 'Civil Procedure',
    examples: ['Temporary injunction', 'Permanent injunction', 'Prohibitory injunction'],
    relatedTerms: ['Relief', 'Court order', 'Restraint']
  },
  {
    term: 'Jurisdiction',
    definition: 'The official power of a court to make legal decisions and judgments over particular types of legal cases in a specific geographical area.',
    category: 'General Law',
    examples: ['Territorial jurisdiction', 'Subject matter jurisdiction', 'Original jurisdiction'],
    relatedTerms: ['Competency', 'Authority', 'Court hierarchy']
  },
  {
    term: 'Appeal',
    definition: 'A legal process by which a higher court reviews and potentially reverses the decision of a lower court.',
    category: 'Civil/Criminal Procedure',
    examples: ['First appeal', 'Second appeal', 'Special leave petition'],
    relatedTerms: ['Appellant', 'Respondent', 'Appellate court']
  }
];

const categories = ['All', ...Array.from(new Set(legalTerms.map(term => term.category)))];

const LegalDictionary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState<LegalTerm | null>(null);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const filteredTerms = useMemo(() => {
    return legalTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const isBookmarked = (term: LegalTerm) => {
    return bookmarks.some(bookmark => bookmark.id === term.term);
  };

  const toggleBookmark = (term: LegalTerm) => {
    if (isBookmarked(term)) {
      removeBookmark(term.term);
    } else {
      addBookmark({
        id: term.term,
        title: term.term,
        content: term.definition,
        source: 'Legal Dictionary',
        timestamp: new Date(),
        category: term.category
      });
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Terms List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Legal Dictionary</h1>
              <p className="text-sm text-gray-600">Search and explore legal terms</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search legal terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Terms List */}
        <div className="flex-1 overflow-y-auto">
          {filteredTerms.map((term) => (
            <button
              key={term.term}
              onClick={() => setSelectedTerm(term)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedTerm?.term === term.term ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{term.term}</h3>
                <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                  {term.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{term.definition}</p>
            </button>
          ))}

          {filteredTerms.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>No terms found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Term Details */}
      <div className="flex-1 flex flex-col">
        {selectedTerm ? (
          <div className="p-6 overflow-y-auto">
            <div className="max-w-3xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedTerm.term}</h1>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {selectedTerm.category}
                  </span>
                </div>
                <button
                  onClick={() => toggleBookmark(selectedTerm)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked(selectedTerm)
                      ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                  title={isBookmarked(selectedTerm) ? 'Remove bookmark' : 'Bookmark this term'}
                >
                  {isBookmarked(selectedTerm) ? (
                    <BookmarkCheck className="h-6 w-6" />
                  ) : (
                    <Bookmark className="h-6 w-6" />
                  )}
                </button>
              </div>

              {/* Definition */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Definition</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedTerm.definition}</p>
              </div>

              {/* Examples */}
              {selectedTerm.examples && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Examples</h2>
                  <ul className="space-y-2">
                    {selectedTerm.examples.map((example, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Terms */}
              {selectedTerm.relatedTerms && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Related Terms</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.relatedTerms.map((relatedTerm, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const found = legalTerms.find(t => t.term.toLowerCase().includes(relatedTerm.toLowerCase()));
                          if (found) setSelectedTerm(found);
                        }}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        {relatedTerm}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Disclaimer:</strong> This information is provided for educational purposes only and should not be considered as legal advice. Always consult with qualified legal professionals for specific legal matters.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <BookOpen className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">Select a Term</h2>
              <p className="text-gray-500 max-w-md">
                Choose a legal term from the list to view its detailed definition, examples, and related terms.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalDictionary;