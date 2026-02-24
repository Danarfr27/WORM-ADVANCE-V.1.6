import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import ScanAnimation from './ScanAnimation';
import { MessageSquare, History, Trash2, LogOut } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: 'Welcome to WORM AI - Cyber Intelligence Interface.\n\nI am your advanced AI assistant for cyber operations, data analysis, and intelligence gathering. All communications are encrypted and secure.\n\nHow can I assist you today?',
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateTimestamp = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: generateTimestamp(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate API call to /api/chat
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            ...messages.map((m) => ({
              role: m.isUser ? 'user' : 'model',
              parts: [{ text: m.content }],
            })),
            { role: 'user', parts: [{ text: content }] },
          ],
        }),
      });

      let data = null;
      try { data = await response.json(); } catch (e) { data = null; }

      if (!response.ok) {
        const errMsg = (data && (data.error || data.message)) ? (data.error || data.message) : `HTTP ${response.status}`;
        throw new Error(errMsg);
      }

      // Extract AI response
      let aiResponse = 'I apologize, but I was unable to process your request.';
      if (data && data.candidates && data.candidates.length > 0) {
        aiResponse = data.candidates[0].content.parts[0].text;
      }

      // Add AI message after a small delay for realism
      setTimeout(() => {
        setIsTyping(false);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          isUser: false,
          timestamp: generateTimestamp(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      const text = error && (error as any).message ? (error as any).message : 'System error. Please try again.';
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: text,
        isUser: false,
        timestamp: generateTimestamp(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        content: 'Chat cleared. How can I assist you?',
        isUser: false,
        timestamp: generateTimestamp(),
      },
    ]);
  };

  const handleScanComplete = () => {
    setShowScan(false);
    const scanMessage: Message = {
      id: Date.now().toString(),
      content: 'System scan completed successfully. No threats detected. All security protocols are functioning normally.',
      isUser: false,
      timestamp: generateTimestamp(),
    };
    setMessages((prev) => [...prev, scanMessage]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full glass-card-glow overflow-hidden"
    >
      {/* Scan Animation Overlay */}
      <ScanAnimation isActive={showScan} onComplete={handleScanComplete} />

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#00ff88]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ff88]/30 to-[#00f0ff]/10 border border-[#00ff88]/40 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#00ff88]" />
          </div>
          <div>
            <h1 
              className="text-lg font-bold text-[#00ff88]"
              style={{ fontFamily: 'Orbitron' }}
            >
              WORM AI
            </h1>
            <p className="text-xs text-gray-500">Cyber Intelligence Interface</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearChat}
            className="cyber-btn p-2"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cyber-btn p-2"
            title="History"
          >
            <History className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cyber-btn p-2"
            title="Logout"
            onClick={() => window.location.href = '/login'}
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-cyber"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#00ff88]/20">
        <ChatInput
          onSend={handleSendMessage}
          disabled={isTyping}
          onScanCommand={() => setShowScan(true)}
        />
      </div>
    </motion.div>
  );
};

export default ChatInterface;
