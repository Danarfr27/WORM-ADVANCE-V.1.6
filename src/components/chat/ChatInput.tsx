import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  onScanCommand?: () => void;
}

const ChatInput = ({ onSend, disabled, onScanCommand }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!message.trim() || disabled) return;

    // Check for /scan command
    if (message.trim().toLowerCase() === '/scan') {
      onScanCommand?.();
    }

    onSend(message.trim());
    setMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex gap-2 items-end">
        {/* Input Container */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Enter command..."
            rows={1}
            className="cyber-input w-full px-4 py-3 pr-8 resize-none min-h-[48px] max-h-[150px]"
            style={{ fontFamily: 'Share Tech Mono' }}
          />
          
          {/* Blinking cursor indicator */}
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-[#00ff88] transition-opacity duration-100 ${
              showCursor && !disabled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            ▋
          </span>
        </div>

        {/* Send Button */}
        <motion.button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          disabled={disabled || !message.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cyber-btn p-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Command hints */}
      {message.startsWith('/') && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-0 mb-2 glass-card p-2 text-xs"
        >
          <div className="text-gray-400">Available commands:</div>
          <div className="text-[#00ff88]">/scan - Run system scan</div>
        </motion.div>
      )}
    </form>
  );
};

export default ChatInput;
