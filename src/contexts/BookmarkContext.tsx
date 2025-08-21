import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Bookmark {
  id: string;
  title: string;
  content: string;
  source: string;
  timestamp: Date;
  category?: string;
  act?: string;
  section?: string;
  court?: string;
  documentType?: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  clearAllBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('legalGuideBookmarks');
    if (savedBookmarks) {
      try {
        const parsed = JSON.parse(savedBookmarks);
        const bookmarksWithDates = parsed.map((bookmark: any) => ({
          ...bookmark,
          timestamp: new Date(bookmark.timestamp)
        }));
        setBookmarks(bookmarksWithDates);
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('legalGuideBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks(prev => {
      // Check if bookmark already exists
      const exists = prev.some(b => b.id === bookmark.id);
      if (exists) return prev;
      
      // Add new bookmark to the beginning of the array
      return [bookmark, ...prev];
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
  };

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      addBookmark,
      removeBookmark,
      clearAllBookmarks
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};