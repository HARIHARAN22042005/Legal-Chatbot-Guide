import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Bookmark, BookmarkCheck, Zap, Brain, Mic } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';
import { aiService, AIResponse } from '../services/aiService';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  legalReference?: string;
  confidence?: number;
  aiGenerated?: boolean;
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
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage: string): Promise<Message> => {
    try {
      const aiResponse: AIResponse = await aiService.getLegalResponse(userMessage, {
        jurisdiction: 'India',
        area: 'General',
        complexity: 'basic'
      });

      return {
        id: Date.now().toString(),
        type: 'bot',
        content: aiResponse.content,
        timestamp: new Date(),
        legalReference: aiResponse.reference,
        confidence: aiResponse.confidence,
        aiGenerated: aiService.isAIEnabled()
      };
    } catch (error) {
      console.error('Error generating AI response:', error);

      // Fallback response
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `I apologize, but I'm experiencing technical difficulties. Please try rephrasing your question about "${userMessage}" or consult with a qualified legal professional for immediate assistance.`, 
        timestamp: new Date(),
        legalReference: 'System Error - Fallback Response',
        confidence: 0.1,
        aiGenerated: false
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    const currentMessage = inputMessage;
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Generate AI response
      const botResponse = await generateBotResponse(currentMessage);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: 'I apologize, but I encountered an error processing your request. Please try again or consult with a legal professional.',
        timestamp: new Date(),
        legalReference: 'System Error',
        confidence: 0,
        aiGenerated: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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

  const handleVoiceInput = () => {
    // Implement voice recognition logic here
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <div className="bg-surface border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Legal Q&A Assistant</h1>
              <p className="text-sm text-gray-600">Ask any legal question and get instant guidance</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              {aiService.isAIEnabled() ? (
                <>
                  <Brain className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">AI Enhanced</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-xs text-primary font-medium">Smart Rules</span>
                </>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {messages.length > 0 && `${messages.length} messages`}
            </div>
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
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
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
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  
                  {message.legalReference && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Legal Reference:</p>
                          <p className="text-xs text-gray-600">{message.legalReference}</p>
                        </div>
                        {message.type === 'bot' && (
                          <div className="flex items-center space-x-2">
                            {message.aiGenerated && (
                              <div className="flex items-center space-x-1">
                                <Brain className="h-3 w-3 text-green-600" />
                                <span className="text-xs text-green-600">AI</span>
                              </div>
                            )}
                            {message.confidence !== undefined && (
                              <div className="flex items-center space-x-1">
                                <div className={`w-2 h-2 rounded-full ${ 
                                  message.confidence > 0.7 ? 'bg-green-500' :
                                  message.confidence > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></div>
                                <span className="text-xs text-gray-500">
                                  {Math.round(message.confidence * 100)}%
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
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
                          ? 'text-secondary hover:text-secondary-dark'
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
        {/* Example Prompts */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              {[ 
                'What is bail?',
                'Explain IPC 302',
                'How to file an FIR?',
                'What is a contract?',
                'Divorce procedure in India',
                'Property registration process'
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setInputMessage(example)}
                  className="px-3 py-1 text-xs bg-blue-50 text-primary rounded-full hover:bg-blue-100 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask any legal question... (e.g., 'What is bail?', 'Explain IPC 302', 'What is an FIR?')"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
          <button
            onClick={handleVoiceInput}
            className={`px-4 py-3 rounded-lg transition-colors flex items-center justify-center ${ 
              isRecording ? 'bg-red-500 text-white' : 'bg-secondary text-white'
            }`}
          >
            <Mic className="h-5 w-5" />
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
