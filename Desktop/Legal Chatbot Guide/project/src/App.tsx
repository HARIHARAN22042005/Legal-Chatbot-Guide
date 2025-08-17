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
// import VoiceInterface from './components/VoiceInterface';
import { BookmarkProvider } from './contexts/BookmarkContext';

export type ActiveView = 'chat' | 'dictionary' | 'pdf-reader' | 'case-summarizer' | 'act-search' | 'bookmarks' | 'form-helper' | 'precedent-finder';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'chat':
        return <ChatInterface />;
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
      //      case 'voice-interface':
      //        return <VoiceInterface />;
      default:
        return <ChatInterface />;
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
}

export default App;