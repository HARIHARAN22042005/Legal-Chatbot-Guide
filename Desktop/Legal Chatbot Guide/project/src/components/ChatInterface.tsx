import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  legalReference?: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Legal Assistant. I can help you understand laws, explain legal terms, and provide guidance on various legal matters. What would you like to know today?',
      timestamp: new Date(),
      legalReference: 'General Legal Assistance'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string): Message => {
    const legalResponses: { [key: string]: { content: string; reference: string } } = {
      'bail': {
        content: 'Bail is a legal mechanism that allows an accused person to be temporarily released from custody while awaiting trial. Under the Indian legal system, bail is generally a right for bailable offenses and discretionary for non-bailable offenses. The court considers factors like the severity of the crime, flight risk, and likelihood of tampering with evidence.',
        reference: 'Code of Criminal Procedure, 1973 - Sections 436-450'
      },
      'fir': {
        content: 'FIR (First Information Report) is the first step in the criminal justice process. It\'s a written document prepared by police when they receive information about a cognizable offense. An FIR can be filed at any police station regardless of jurisdiction, and a copy must be provided free of cost to the informant.',
        reference: 'Code of Criminal Procedure, 1973 - Section 154'
      },
      'ipc 302': {
        content: 'IPC Section 302 deals with the punishment for murder. It states that whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to a fine. Murder is defined as causing death with the intention of causing death or knowledge that the act is likely to cause death.',
        reference: 'Indian Penal Code, 1860 - Section 302'
      },
      'contract': {
        content: 'A contract is a legally binding agreement between two or more parties. For a contract to be valid, it must have: (1) Offer and acceptance, (2) Consideration, (3) Capacity to contract, (4) Free consent, and (5) Lawful object. The Indian Contract Act governs the formation and enforcement of contracts.',
        reference: 'Indian Contract Act, 1872 - Section 10'
      }
    };

    const lowercaseMessage = userMessage.toLowerCase();
    let response = legalResponses[lowercaseMessage];
    
    if (!response) {
      // Check for partial matches
      for (const key in legalResponses) {
        if (lowercaseMessage.includes(key)) {
          response = legalResponses[key];
          break;
        }
      }
    }

    if (!response) {
      response = {
        content: `Thank you for your question about "${userMessage}". While I can provide general legal information, this appears to be a specific query that would benefit from detailed legal research. I recommend consulting with a qualified legal professional for personalized advice on this matter.`,
        reference: 'General Legal Guidance'
      };
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response.content,
      timestamp: new Date(),
      legalReference: response.reference
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = simulateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isBookmarked = (messageId: string) => {
    return bookmarks.some(bookmark => bookmark.id === messageId);
  };

  const toggleBookmark = (message: Message) => {
    if (isBookmarked(message.id)) {
      removeBookmark(message.id);
    } else {
      addBookmark({
        id: message.id,
        title: message.legalReference || 'Legal Response',
        content: message.content,
        source: 'Chat',
        timestamp: message.timestamp
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <Bot className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Legal Q&A Assistant</h1>
            <p className="text-sm text-gray-600">Ask any legal question and get instant guidance</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-3`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                {message.type === 'user' ? (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`inline-block px-4 py-3 rounded-2xl max-w-full ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  
                  {message.legalReference && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs text-gray-600 font-medium">Legal Reference:</p>
                      <p className="text-xs text-gray-600">{message.legalReference}</p>
                    </div>
                  )}
                </div>

                {message.type === 'bot' && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    <button
                      onClick={() => toggleBookmark(message)}
                      className={`p-1 rounded transition-colors ${
                        isBookmarked(message.id)
                          ? 'text-amber-600 hover:text-amber-700'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                      title={isBookmarked(message.id) ? 'Remove bookmark' : 'Bookmark this response'}
                    >
                      {isBookmarked(message.id) ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask any legal question... (e.g., 'What is bail?', 'Explain IPC 302', 'What is an FIR?')"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>

        <div className="mt-3 text-xs text-gray-500 text-center">
          <p>This is for informational purposes only. Always consult with qualified legal professionals for specific legal advice.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;