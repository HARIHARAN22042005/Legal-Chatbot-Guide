import React from 'react';
import { MessageSquare, BookOpen, FileText, Scale, Search, Bookmark, X, FileCheck, Gavel, Mic } from 'lucide-react';
import { ActiveView } from '../App';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
  { id: 'chat', label: 'Legal Q&A Chat', icon: MessageSquare, description: 'Ask legal questions and get instant answers' },
  { id: 'dictionary', label: 'Law Dictionary', icon: BookOpen, description: 'Search legal terms and definitions' },
  { id: 'pdf-reader', label: 'PDF Analyzer', icon: FileText, description: 'Upload and analyze legal documents' },
  { id: 'case-summarizer', label: 'Case Summarizer', icon: Scale, description: 'Summarize legal cases and judgments' },
  { id: 'act-search', label: 'Act & Section Search', icon: Search, description: 'Search specific acts and sections' },
  { id: 'bookmarks', label: 'Saved Content', icon: Bookmark, description: 'Access your bookmarked information' },
  { id: 'form-helper', label: 'Legal Form Helper', icon: FileCheck, description: 'Guidance for filling legal forms' },
  { id: 'precedent-finder', label: 'Case Precedents', icon: Gavel, description: 'Find related case precedents' },
  { id: 'voice-interface', label: 'Voice Assistant', icon: Mic, description: 'Ask questions using voice input' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
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
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-700" />
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
                        ? 'bg-blue-50 text-blue-700 shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`
                      h-5 w-5 mt-0.5 flex-shrink-0 transition-colors
                      ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}
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

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <p className="mb-1">Legal guidance for everyone</p>
              <p className="text-xs">Always consult qualified professionals</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;