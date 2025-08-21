import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, RotateCcw, Send } from 'lucide-react';
import { aiService } from '../services/aiService';

interface VoiceMessage {
  id: string;
  type: 'user' | 'bot';
  text: string;
  audio?: string;
  timestamp: Date;
  isPlaying?: boolean;
}

const VoiceInterface: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I\'m your voice-enabled legal assistant. You can ask me any legal question by speaking. Click the microphone to start.',
      timestamp: new Date()
    }
  ]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setCurrentTranscript(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (currentTranscript.trim()) {
          handleVoiceInput(currentTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [currentTranscript]);

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setCurrentTranscript('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleVoiceInput = async (transcript: string) => {
    if (!transcript.trim()) return;

    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: transcript,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentTranscript('');
    setIsProcessing(true);

    try {
      const response = await aiService.getLegalResponse(transcript);
      const botMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Auto-speak the response
      speakText(response.content);
    } catch (error) {
      console.error('Error processing voice input:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current && 'speechSynthesis' in window) {
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleManualSubmit = () => {
    if (currentTranscript.trim()) {
      handleVoiceInput(currentTranscript);
    }
  };

  if (!speechSupported) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <MicOff className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Voice Not Supported</h2>
            <p className="text-gray-600 mb-4">
              Your browser doesn't support speech recognition. Please use a modern browser like Chrome, Edge, or Safari.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Supported Browsers:</strong> Chrome, Microsoft Edge, Safari (iOS/macOS)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mic className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Voice Legal Assistant</h1>
              <p className="text-sm text-gray-600">Speak your legal questions naturally</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
              >
                <VolumeX className="h-4 w-4" />
                <span>Stop Speaking</span>
              </button>
            )}
            <div className="text-sm text-gray-500">
              {messages.length > 1 && `${messages.length - 1} conversations`}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-3`}>
              <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                {message.type === 'user' ? (
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <Mic className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Volume2 className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`inline-block px-4 py-3 rounded-2xl max-w-full ${
                    message.type === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>

                {message.type === 'bot' && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    <button
                      onClick={() => speakText(message.text)}
                      className="p-1 rounded transition-colors text-gray-400 hover:text-gray-600"
                      title="Speak this response"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex justify-start">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <Volume2 className="h-4 w-4 text-white" />
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
      </div>

      {/* Voice Input Area */}
      <div className="border-t border-gray-200 px-6 py-4">
        {/* Current Transcript */}
        {currentTranscript && (
          <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-purple-800 font-medium">Listening...</p>
                <p className="text-purple-700">{currentTranscript}</p>
              </div>
              <button
                onClick={handleManualSubmit}
                className="ml-3 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                title="Send transcript"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Voice Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-200 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isListening ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </button>

          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">
              {isListening ? 'Listening...' : 'Click to speak'}
            </p>
            <p className="text-xs text-gray-500">
              {isListening ? 'Click again to stop' : 'Ask any legal question'}
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Voice Commands</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600">
              <div>"What is bail procedure?"</div>
              <div>"Explain IPC section 302"</div>
              <div>"How to file a divorce case?"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
