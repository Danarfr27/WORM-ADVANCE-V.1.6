import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#00f0ff]/30 to-[#00f0ff]/10 border border-[#00f0ff]/40">
        <span className="text-[#00f0ff] text-xs font-bold">AI</span>
      </div>

      {/* Typing Animation */}
      <div className="glass-card-glow px-4 py-3 flex items-center gap-2">
        <span className="text-xs text-gray-500 mr-2">WORM AI is thinking</span>
        <div className="flex gap-1">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
