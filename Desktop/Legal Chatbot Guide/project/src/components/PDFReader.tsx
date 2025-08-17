import React, { useState, useRef } from 'react';
import { Upload, FileText, Download, AlertCircle, Bookmark, BookmarkCheck, Image, File } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

interface PDFAnalysis {
  summary: string;
  keyPoints: string[];
  legalImplications: string[];
  recommendations: string[];
  documentType: string;
}

const PDFReader: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PDFAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setUploadedFile(file);
      analyzeDocument(file);
    }
  };

  const analyzeDocument = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate document analysis
    setTimeout(() => {
      const mockAnalysis: PDFAnalysis = {
        summary: `This document appears to be a legal contract analyzing the terms and conditions of a service agreement. The document contains standard commercial clauses including payment terms, liability limitations, termination procedures, and dispute resolution mechanisms. Key sections include service delivery obligations, intellectual property rights, confidentiality provisions, and governing law specifications.`,
        keyPoints: [
          'Payment terms: Net 30 days from invoice date',
          'Service level agreement: 99.9% uptime guarantee',
          'Termination clause: Either party may terminate with 30 days written notice',
          'Liability cap: Limited to the amount paid in the preceding 12 months',
          'Confidentiality period: 5 years post-termination',
          'Governing law: Subject to jurisdiction of Delhi High Court'
        ],
        legalImplications: [
          'The liability limitation clause may not be enforceable for gross negligence',
          'Termination notice period should be clearly communicated to avoid disputes',
          'Intellectual property clauses require careful review for ownership rights',
          'Force majeure provisions should include pandemic-related disruptions',
          'Payment terms should specify currency and interest on delayed payments'
        ],
        recommendations: [
          'Review the liability limitation clause with legal counsel',
          'Ensure all payment terms are clearly defined and agreed upon',
          'Consider adding specific performance metrics for service levels',
          'Include detailed data protection and privacy compliance clauses',
          'Add dispute resolution mechanisms including mediation before litigation',
          'Specify the process for contract amendments and modifications'
        ],
        documentType: 'Service Agreement Contract'
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setUploadedFile(file);
      analyzeDocument(file);
    }
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some(bookmark => bookmark.id === id);
  };

  const toggleBookmark = () => {
    if (!analysis || !uploadedFile) return;
    
    const bookmarkId = `pdf-${uploadedFile.name}`;
    
    if (isBookmarked(bookmarkId)) {
      removeBookmark(bookmarkId);
    } else {
      addBookmark({
        id: bookmarkId,
        title: `PDF Analysis: ${uploadedFile.name}`,
        content: analysis.summary,
        source: 'PDF Analyzer',
        timestamp: new Date(),
        documentType: analysis.documentType
      });
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PDF Document Analyzer</h1>
              <p className="text-sm text-gray-600">Upload legal documents for AI-powered analysis</p>
            </div>
          </div>
          
          {analysis && uploadedFile && (
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked(`pdf-${uploadedFile.name}`)
                  ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title={isBookmarked(`pdf-${uploadedFile.name}`) ? 'Remove bookmark' : 'Bookmark this analysis'}
            >
              {isBookmarked(`pdf-${uploadedFile.name}`) ? (
                <BookmarkCheck className="h-6 w-6" />
              ) : (
                <Bookmark className="h-6 w-6" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!uploadedFile ? (
          /* Upload Area */
          <div className="max-w-4xl mx-auto">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload PDF Document</h3>
              <p className="text-gray-500 mb-6">
                Drag and drop your PDF file or image here, or click to browse
              </p>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Choose File</span>
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <h4 className="font-semibold mb-1">Supported Analysis Features:</h4>
                  <ul className="space-y-1">
                    <li>• Document summarization and key point extraction</li>
                    <li>• Image text recognition (OCR) and analysis</li>
                    <li>• Legal implications and risk assessment</li>
                    <li>• Contract clause analysis and recommendations</li>
                    <li>• Compliance and regulatory review</li>
                    <li>• Action items and next steps identification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Results */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* File Info */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{uploadedFile.name}</h3>
                  <p className="text-sm text-gray-600">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.type.startsWith('image/') ? 'Image Document' : 'PDF Document'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setUploadedFile(null);
                  setAnalysis(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Upload New File
              </button>
            </div>

            {isAnalyzing ? (
              /* Loading State */
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Document...</h3>
                <p className="text-gray-600">
                  Our AI is processing your document to extract key insights and legal implications.
                </p>
              </div>
            ) : analysis && (
              /* Analysis Results */
              <div className="space-y-6">
                {/* Document Type */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {analysis.documentType}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Document Summary</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
                </div>

                {/* Key Points */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Points</h3>
                  <ul className="space-y-3">
                    {analysis.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Implications */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <span>Legal Implications</span>
                  </h3>
                  <ul className="space-y-3">
                    {analysis.legalImplications.map((implication, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-gray-700">{implication}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
                  <ul className="space-y-3">
                    {analysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <h4 className="font-semibold mb-1">Important Disclaimer</h4>
                      <p>This analysis is provided for informational purposes only and should not be considered as legal advice. The AI-generated insights may not capture all legal nuances. Always consult with qualified legal professionals for comprehensive legal review and advice on important documents.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFReader;