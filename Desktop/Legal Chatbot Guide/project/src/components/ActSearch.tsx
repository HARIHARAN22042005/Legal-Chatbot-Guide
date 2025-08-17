import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Bookmark, BookmarkCheck, Scale } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

interface LegalSection {
  id: string;
  act: string;
  section: string;
  title: string;
  description: string;
  keyPoints: string[];
  punishment?: string;
  examples: string[];
  category: string;
  year: number;
}

const legalSections: LegalSection[] = [
  {
    id: 'ipc-302',
    act: 'Indian Penal Code',
    section: '302',
    title: 'Punishment for Murder',
    description: 'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
    keyPoints: [
      'Murder is causing death with intention of causing death',
      'Knowledge that the act is imminently dangerous to life',
      'Punishment can be death penalty or life imprisonment',
      'Additional fine may also be imposed'
    ],
    punishment: 'Death or life imprisonment, and fine',
    examples: [
      'Intentionally shooting someone to death',
      'Poisoning with intent to kill',
      'Stabbing with knowledge it will cause death'
    ],
    category: 'Criminal Law',
    year: 1860
  },
  {
    id: 'ipc-498a',
    act: 'Indian Penal Code',
    section: '498A',
    title: 'Husband or relative of husband subjecting a woman to cruelty',
    description: 'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished.',
    keyPoints: [
      'Applies to husband or husband\'s relatives',
      'Cruelty includes harassment for dowry demands',
      'Mental and physical cruelty both covered',
      'Non-bailable and cognizable offense'
    ],
    punishment: 'Imprisonment up to three years and fine',
    examples: [
      'Dowry harassment by husband or in-laws',
      'Mental torture for not bringing sufficient dowry',
      'Physical abuse by husband or relatives'
    ],
    category: 'Criminal Law',
    year: 1860
  },
  {
    id: 'crpc-154',
    act: 'Code of Criminal Procedure',
    section: '154',
    title: 'Information in cognizable cases',
    description: 'Every information relating to the commission of a cognizable offence shall be reduced to writing by the officer in charge of the police station.',
    keyPoints: [
      'Mandatory to register FIR for cognizable offenses',
      'Information must be reduced to writing',
      'Copy to be given to informant free of cost',
      'Can be filed at any police station'
    ],
    examples: [
      'Filing FIR for theft',
      'Registering complaint for assault',
      'Reporting kidnapping case'
    ],
    category: 'Criminal Procedure',
    year: 1973
  },
  {
    id: 'crpc-436',
    act: 'Code of Criminal Procedure',
    section: '436',
    title: 'In what cases bail to be taken',
    description: 'When any person is arrested without warrant for a bailable offence, he shall be released on bail.',
    keyPoints: [
      'Bail is a right for bailable offenses',
      'Police officer can grant bail',
      'Conditions may be imposed',
      'Bond execution required'
    ],
    examples: [
      'Simple assault cases',
      'Minor theft cases',
      'Cheque bounce cases'
    ],
    category: 'Criminal Procedure',
    year: 1973
  },
  {
    id: 'contract-10',
    act: 'Indian Contract Act',
    section: '10',
    title: 'What agreements are contracts',
    description: 'All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object.',
    keyPoints: [
      'Free consent of competent parties required',
      'Lawful consideration must exist',
      'Object of agreement must be lawful',
      'Essential elements for valid contract'
    ],
    examples: [
      'Sale of goods contract',
      'Employment agreement',
      'Lease agreement'
    ],
    category: 'Contract Law',
    year: 1872
  },
  {
    id: 'constitution-14',
    act: 'Constitution of India',
    section: 'Article 14',
    title: 'Equality before law',
    description: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    keyPoints: [
      'Fundamental right to equality',
      'Prohibition of discrimination',
      'Equal protection of laws',
      'Rule of law principle'
    ],
    examples: [
      'Equal treatment in government jobs',
      'Non-discrimination in public services',
      'Fair trial rights'
    ],
    category: 'Constitutional Law',
    year: 1950
  }
];

const categories = ['All', ...Array.from(new Set(legalSections.map(section => section.category)))];

const ActSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSection, setSelectedSection] = useState<LegalSection | null>(null);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const filteredSections = useMemo(() => {
    return legalSections.filter(section => {
      const searchString = `${section.act} ${section.section} ${section.title} ${section.description}`.toLowerCase();
      const matchesSearch = searchString.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || section.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const isBookmarked = (section: LegalSection) => {
    return bookmarks.some(bookmark => bookmark.id === section.id);
  };

  const toggleBookmark = (section: LegalSection) => {
    if (isBookmarked(section)) {
      removeBookmark(section.id);
    } else {
      addBookmark({
        id: section.id,
        title: `${section.act} - Section ${section.section}`,
        content: section.description,
        source: 'Act & Section Search',
        timestamp: new Date(),
        category: section.category,
        act: section.act,
        section: section.section
      });
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sections List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Act & Section Search</h1>
              <p className="text-sm text-gray-600">Search specific acts and sections</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search acts, sections, or keywords..."
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

        {/* Sections List */}
        <div className="flex-1 overflow-y-auto">
          {filteredSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedSection?.id === section.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                    {section.section}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                    {section.category}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{section.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{section.act} ({section.year})</p>
              <p className="text-sm text-gray-600 line-clamp-2">{section.description}</p>
            </button>
          ))}

          {filteredSections.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>No sections found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Section Details */}
      <div className="flex-1 flex flex-col">
        {selectedSection ? (
          <div className="p-6 overflow-y-auto">
            <div className="max-w-3xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-2 bg-blue-100 text-blue-800 text-lg font-bold rounded">
                      Section {selectedSection.section}
                    </span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                      {selectedSection.category}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedSection.title}</h1>
                  <p className="text-lg text-gray-600">
                    {selectedSection.act} ({selectedSection.year})
                  </p>
                </div>
                <button
                  onClick={() => toggleBookmark(selectedSection)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked(selectedSection)
                      ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                  title={isBookmarked(selectedSection) ? 'Remove bookmark' : 'Bookmark this section'}
                >
                  {isBookmarked(selectedSection) ? (
                    <BookmarkCheck className="h-6 w-6" />
                  ) : (
                    <Bookmark className="h-6 w-6" />
                  )}
                </button>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Legal Text</h2>
                <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-gray-800 leading-relaxed text-lg font-medium">
                    {selectedSection.description}
                  </p>
                </div>
              </div>

              {/* Key Points */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Points</h2>
                <ul className="space-y-3">
                  {selectedSection.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Punishment */}
              {selectedSection.punishment && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Scale className="h-5 w-5 text-red-600" />
                    <span>Punishment</span>
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-medium">{selectedSection.punishment}</p>
                  </div>
                </div>
              )}

              {/* Examples */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Examples</h2>
                <div className="grid gap-3">
                  {selectedSection.examples.map((example, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-green-800">{example}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Legal Disclaimer</h4>
                <p className="text-sm text-yellow-700">
                  This information is provided for educational purposes only and should not be considered as legal advice. 
                  Laws may have been amended since the last update. Always consult with qualified legal professionals 
                  for specific legal matters and current interpretations of the law.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <BookOpen className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">Select a Section</h2>
              <p className="text-gray-500 max-w-md">
                Choose an act and section from the list to view detailed information, key points, and examples.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActSearch;