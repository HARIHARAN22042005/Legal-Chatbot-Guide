import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import LegalDictionary from './components/LegalDictionary';
import PDFReader from './components/PDFReader';
import CaseSummarizer from './components/CaseSummarizer';
import ActSearch from './components/ActSearch';
import BookmarksPanel from './components/BookmarksPanel';
import LegalFormHelper from './components/LegalFormHelper';
import PrecedentFinder from './components/PrecedentFinder';
import UserProfile from './components/UserProfile';
import LegalKnowledgeBase from './components/LegalKnowledgeBase';
import VoiceInterface from './components/VoiceInterface';
import CaseTracker from './components/CaseTracker';
import LegalNews from './components/LegalNews';
import LegalCalculator from './components/LegalCalculator';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
export type ActiveView = 'dashboard' | 'chat' | 'voice-interface' | 'knowledge-base' | 'case-tracker' | 'legal-news' | 'legal-calculator' | 'dictionary' | 'pdf-reader' | 'case-summarizer' | 'act-search' | 'bookmarks' | 'form-helper' | 'precedent-finder' | 'user-profile';

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Main app content component
const AppContent = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={(view) => setActiveView(view as ActiveView)} />;
      case 'chat':
        return <ChatInterface />;
      case 'voice-interface':
        return <VoiceInterface />;
      case 'knowledge-base':
        return <LegalKnowledgeBase />;
      case 'case-tracker':
        return <CaseTracker />;
      case 'legal-news':
        return <LegalNews />;
      case 'legal-calculator':
        return <LegalCalculator />;
      case 'dictionary':
        return <LegalDictionary />;
      case 'pdf-reader':
        return <PDFReader />;
      case 'case-summarizer':
        return <CaseSummarizer />;
      case 'act-search':
        return <ActSearch />;
      case 'bookmarks':
        return <BookmarksPanel />;
      case 'form-helper':
        return <LegalFormHelper />;
      case 'precedent-finder':
        return <PrecedentFinder />;
      case 'user-profile':
        return <UserProfile />;
      default:
        return <Dashboard onNavigate={(view) => setActiveView(view as ActiveView)} />;
    }
  };

  return (
    <BookmarkProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col lg:ml-64">
          <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-bold text-gray-900">Legal Guide</h1>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-hidden">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </BookmarkProvider>
  );
};

// Main App component with authentication
function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

// Component that handles authentication state
const AuthenticatedApp = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Login />;
  }

  return <AppContent />;
};

export default App;