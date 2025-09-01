import React from 'react';
import { MessageSquare, BookOpen, FileText, Scale, Search, Bookmark, X, FileCheck, Gavel, Mic, LogOut, User, Book, Newspaper, Calculator, FolderOpen, Home } from 'lucide-react';
import { ActiveView } from '../App';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview and quick actions' },
  { id: 'chat', label: 'Legal Q&A Chat', icon: MessageSquare, description: 'Ask legal questions and get instant answers' },
  { id: 'voice-interface', label: 'Voice Assistant', icon: Mic, description: 'Ask questions using voice input' },
  { id: 'knowledge-base', label: 'Legal Knowledge Base', icon: Book, description: 'Comprehensive guide to Indian laws and acts' },
  { id: 'case-tracker', label: 'Case Tracker', icon: FolderOpen, description: 'Track and manage your legal cases' },
  { id: 'legal-news', label: 'Legal News', icon: Newspaper, description: 'Latest legal updates and court judgments' },
  { id: 'legal-calculator', label: 'Legal Calculator', icon: Calculator, description: 'Calculate legal fees, duties, and amounts' },
  { id: 'dictionary', label: 'Law Dictionary', icon: BookOpen, description: 'Search legal terms and definitions' },
  { id: 'pdf-reader', label: 'PDF Analyzer', icon: FileText, description: 'Upload and analyze legal documents' },
  { id: 'case-summarizer', label: 'Case Summarizer', icon: Scale, description: 'Summarize legal cases and judgments' },
  { id: 'act-search', label: 'Act & Section Search', icon: Search, description: 'Search specific acts and sections' },
  { id: 'bookmarks', label: 'Saved Content', icon: Bookmark, description: 'Access your bookmarked information' },
  { id: 'form-helper', label: 'Legal Form Helper', icon: FileCheck, description: 'Guidance for filling legal forms' },
  { id: 'precedent-finder', label: 'Case Precedents', icon: Gavel, description: 'Find related case precedents' },
  { id: 'user-profile', label: 'User Profile', icon: User, description: 'View your account information' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-surface shadow-xl border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-gray-900">Legal Guide</h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id as ActiveView);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-start space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group
                      ${isActive 
                        ? 'bg-blue-50 text-primary shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`
                      h-5 w-5 mt-0.5 flex-shrink-0 transition-colors
                      ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}
                    `} />
                    <div className="min-w-0">
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-tight">
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Info & Footer */}
          <div className="border-t border-gray-200">
            {/* User Info */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.email || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    ID: {user?.id?.slice(0, 8)}... | Signed in
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Footer */}
            <div className="p-4">
              <div className="text-xs text-gray-500 text-center">
                <p className="mb-1">Legal guidance for everyone</p>
                <p className="text-xs">Always consult qualified professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
