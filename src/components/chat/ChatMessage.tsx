import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: string;
}

const ChatMessage = ({ content, isUser, timestamp }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Parse code blocks
  interface ContentPart {
    type: 'text' | 'code';
    content: string;
    language?: string;
  }

  const parseContent = (text: string): ContentPart[] => {
    const parts: ContentPart[] = [];
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trim(),
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00ff88]">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-black/50 px-1 py-0.5 rounded text-[#00f0ff]">$1</code>')
      .replace(/\n/g, '<br />');
  };

  const parts = parseContent(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-[#00ff88]/30 to-[#00ff88]/10 border border-[#00ff88]/40'
            : 'bg-gradient-to-br from-[#00f0ff]/30 to-[#00f0ff]/10 border border-[#00f0ff]/40'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-[#00ff88]" />
        ) : (
          <Bot className="w-4 h-4 text-[#00f0ff]" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        {/* Bubble */}
        <div
          className={`relative p-4 ${
            isUser ? 'message-bubble-user' : 'message-bubble-ai'
          }`}
        >
          {parts.map((part, index) => (
            <div key={index}>
              {part.type === 'code' ? (
                <div className="code-block-cyber p-3 my-2 relative group">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-[#00ff88]/20">
                    <span className="text-xs text-[#00ff88] uppercase">
                      {part.language}
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(part.content || '')}
                      className="text-xs text-gray-400 hover:text-[#00ff88] transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                    {part.content}
                  </pre>
                </div>
              ) : (
                <div
                  className="text-sm leading-relaxed"
                  style={{ color: isUser ? '#e0e0e0' : '#c0c0c0' }}
                  dangerouslySetInnerHTML={{ __html: formatText(part.content) }}
                />
              )}
            </div>
          ))}

          {/* Copy button for text messages */}
          {!content.includes('```') && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10"
            >
              {copied ? (
                <Check className="w-3 h-3 text-[#00ff88]" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400" />
              )}
            </button>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-gray-600 mt-1 font-mono">
          {timestamp}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
