import React, { useState } from 'react';
import { FileText, Scale, Bookmark, BookmarkCheck, AlertCircle } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

interface CaseSummary {
  caseTitle: string;
  court: string;
  date: string;
  parties: {
    petitioner: string;
    respondent: string;
  };
  keyFacts: string[];
  legalIssues: string[];
  judgment: string;
  keyPrinciples: string[];
  precedentValue: string;
  citations: string[];
}

const CaseSummarizer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [caseSummary, setCaseSummary] = useState<CaseSummary | null>(null);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const sampleCaseText = `IN THE HIGH COURT OF DELHI
Civil Writ Petition No. 3456/2023

Raj Kumar Sharma vs. Union of India & Ors.

Facts: The petitioner, a government employee, was terminated from service without following proper procedure. The petitioner had 15 years of service and was dismissed based on allegations of misconduct without proper inquiry.

Issues: Whether termination without proper inquiry violates principles of natural justice. Whether the petitioner has right to be heard before dismissal.

Judgment: The Hon'ble Court held that termination without proper inquiry is violation of Article 14 and principles of natural justice. The petitioner must be given opportunity to defend himself. The termination order is quashed and the petitioner is reinstated with back wages.

Precedent: This case establishes that government employees have fundamental right to fair hearing before disciplinary action.`;

  const processCaseText = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate case processing
    setTimeout(() => {
      const mockSummary: CaseSummary = {
        caseTitle: "Raj Kumar Sharma vs. Union of India & Ors.",
        court: "High Court of Delhi",
        date: "2023",
        parties: {
          petitioner: "Raj Kumar Sharma (Government Employee)",
          respondent: "Union of India & Others"
        },
        keyFacts: [
          "Petitioner was a government employee with 15 years of service",
          "Employee was terminated from service without following proper procedure",
          "Termination was based on allegations of misconduct",
          "No proper inquiry was conducted before dismissal",
          "Employee was not given opportunity to defend himself"
        ],
        legalIssues: [
          "Whether termination without proper inquiry violates principles of natural justice",
          "Whether government employee has right to be heard before dismissal",
          "Whether the termination order is valid without following due process",
          "Scope of Article 14 protection in employment matters"
        ],
        judgment: "The Hon'ble High Court of Delhi held that the termination of the petitioner without proper inquiry constitutes a clear violation of Article 14 of the Constitution and the established principles of natural justice. The Court emphasized that every government employee has a fundamental right to fair hearing before any disciplinary action. The termination order was quashed and the petitioner was ordered to be reinstated with full back wages.",
        keyPrinciples: [
          "Principles of natural justice must be followed in disciplinary proceedings",
          "Right to fair hearing is fundamental in employment matters",
          "Termination without proper inquiry violates Article 14",
          "Government employees are entitled to due process protection",
          "Procedural fairness is mandatory in administrative actions"
        ],
        precedentValue: "This judgment establishes important precedent regarding procedural rights of government employees and reinforces that administrative actions must comply with principles of natural justice. It can be cited in similar cases involving wrongful termination of public servants.",
        citations: [
          "Article 14, Constitution of India",
          "Maneka Gandhi vs. Union of India (1978)",
          "A.K. Kraipak vs. Union of India (1969)",
          "Central Inland Water Transport Corp. vs. Brojo Nath (1986)"
        ]
      };
      
      setCaseSummary(mockSummary);
      setIsProcessing(false);
    }, 2500);
  };

  const isBookmarked = (caseTitle: string) => {
    return bookmarks.some(bookmark => bookmark.id === `case-${caseTitle}`);
  };

  const toggleBookmark = () => {
    if (!caseSummary) return;
    
    const bookmarkId = `case-${caseSummary.caseTitle}`;
    
    if (isBookmarked(caseSummary.caseTitle)) {
      removeBookmark(bookmarkId);
    } else {
      addBookmark({
        id: bookmarkId,
        title: caseSummary.caseTitle,
        content: caseSummary.judgment,
        source: 'Case Summarizer',
        timestamp: new Date(),
        court: caseSummary.court
      });
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Scale className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Case Summarizer</h1>
              <p className="text-sm text-gray-600">Analyze and summarize legal cases and judgments</p>
            </div>
          </div>
          
          {caseSummary && (
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked(caseSummary.caseTitle)
                  ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title={isBookmarked(caseSummary.caseTitle) ? 'Remove bookmark' : 'Bookmark this case'}
            >
              {isBookmarked(caseSummary.caseTitle) ? (
                <BookmarkCheck className="h-6 w-6" />
              ) : (
                <Bookmark className="h-6 w-6" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {!caseSummary ? (
            <>
              {/* Input Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Text Input</h3>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste the full case text, judgment, or legal document here for summarization..."
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setInputText(sampleCaseText)}
                    className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
                  >
                    Use Sample Case Text
                  </button>
                  
                  <button
                    onClick={processCaseText}
                    disabled={!inputText.trim() || isProcessing}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? 'Processing...' : 'Summarize Case'}
                  </button>
                </div>
              </div>

              {/* Processing State */}
              {isProcessing && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Case...</h3>
                  <p className="text-gray-600">
                    Analyzing the case text and extracting key legal information.
                  </p>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <h4 className="font-semibold mb-2">How to Use Case Summarizer:</h4>
                    <ul className="space-y-1">
                      <li>• Paste the complete case text or judgment</li>
                      <li>• Include case details, facts, issues, and judgment</li>
                      <li>• The AI will extract key information and create a structured summary</li>
                      <li>• Get organized insights on facts, legal issues, principles, and precedent value</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Case Summary Results */
            <div className="space-y-6">
              <button
                onClick={() => {
                  setCaseSummary(null);
                  setInputText('');
                }}
                className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
              >
                ← Analyze Another Case
              </button>

              {/* Case Header */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{caseSummary.caseTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Court:</span> {caseSummary.court}
                  </div>
                  <div>
                    <span className="font-medium">Year:</span> {caseSummary.date}
                  </div>
                  <div>
                    <span className="font-medium">Case Type:</span> Civil Writ Petition
                  </div>
                </div>
              </div>

              {/* Parties */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Parties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Petitioner</h4>
                    <p className="text-gray-600">{caseSummary.parties.petitioner}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Respondent</h4>
                    <p className="text-gray-600">{caseSummary.parties.respondent}</p>
                  </div>
                </div>
              </div>

              {/* Key Facts */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Facts</h3>
                <ul className="space-y-2">
                  {caseSummary.keyFacts.map((fact, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-gray-700">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Issues */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Legal Issues</h3>
                <ol className="space-y-2">
                  {caseSummary.legalIssues.map((issue, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{issue}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Judgment */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Scale className="h-5 w-5 text-green-600" />
                  <span>Judgment</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{caseSummary.judgment}</p>
              </div>

              {/* Key Principles */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Legal Principles</h3>
                <ul className="space-y-2">
                  {caseSummary.keyPrinciples.map((principle, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Precedent Value */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Precedent Value</h3>
                <p className="text-gray-700 leading-relaxed">{caseSummary.precedentValue}</p>
              </div>

              {/* Citations */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Legal Citations</h3>
                <ul className="space-y-2">
                  {caseSummary.citations.map((citation, index) => (
                    <li key={index} className="text-gray-700 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                      {citation}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <h4 className="font-semibold mb-1">Legal Disclaimer</h4>
                    <p>This case summary is generated for educational and informational purposes only. It may not capture all nuances of the legal judgment. Always refer to the original case text and consult qualified legal professionals for comprehensive legal analysis and advice.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseSummarizer;