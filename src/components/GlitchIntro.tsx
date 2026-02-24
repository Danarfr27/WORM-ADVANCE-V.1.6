import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchIntroProps {
  onComplete: () => void;
}

const GlitchIntro = ({ onComplete }: GlitchIntroProps) => {
  const [phase, setPhase] = useState(0);
  const [text, setText] = useState('');
  const fullText = 'WORM AI';
  
  useEffect(() => {
    // Phase 0: Type text
    if (phase === 0) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => setPhase(1), 500);
        }
      }, 100);
      return () => clearInterval(interval);
    }
    
    // Phase 1: Glitch effect
    if (phase === 1) {
      const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      let glitchCount = 0;
      const maxGlitches = 10;
      
      const glitchInterval = setInterval(() => {
        if (glitchCount < maxGlitches) {
          const glitched = fullText
            .split('')
            .map((char, i) => {
              if (Math.random() > 0.5 && i < glitchCount) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              return char;
            })
            .join('');
          setText(glitched);
          glitchCount++;
        } else {
          setText(fullText);
          clearInterval(glitchInterval);
          setTimeout(() => setPhase(2), 300);
        }
      }, 50);
      return () => clearInterval(glitchInterval);
    }
    
    // Phase 2: Fade out and complete
    if (phase === 2) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: '#050505' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background effects during intro */}
          <div className="absolute inset-0 grid-bg opacity-30" />
          
          {/* Horizontal scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, #00ff88, transparent)' }}
            animate={{
              top: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Main text */}
          <div className="relative">
            {/* Glitch layers */}
            {phase === 1 && (
              <>
                <motion.span
                  className="absolute inset-0 text-[#ff0040] text-6xl md:text-8xl font-bold"
                  style={{ fontFamily: 'Orbitron' }}
                  animate={{
                    x: [-2, 2, -2, 0],
                    opacity: [0.8, 0.4, 0.8, 0],
                  }}
                  transition={{ duration: 0.2, repeat: 2 }}
                >
                  {text}
                </motion.span>
                <motion.span
                  className="absolute inset-0 text-[#00f0ff] text-6xl md:text-8xl font-bold"
                  style={{ fontFamily: 'Orbitron' }}
                  animate={{
                    x: [2, -2, 2, 0],
                    opacity: [0.8, 0.4, 0.8, 0],
                  }}
                  transition={{ duration: 0.2, repeat: 2, delay: 0.1 }}
                >
                  {text}
                </motion.span>
              </>
            )}
            
            {/* Main text */}
            <motion.h1
              className="text-6xl md:text-8xl font-bold neon-text"
              style={{ fontFamily: 'Orbitron', color: '#00ff88' }}
              animate={phase === 1 ? {
                scale: [1, 1.05, 1],
              } : {}}
              transition={{ duration: 0.1, repeat: 3 }}
            >
              {text}
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              className="text-center mt-4 text-[#00f0ff] text-sm md:text-base tracking-[0.3em]"
              style={{ fontFamily: 'Share Tech Mono' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 0 ? 0.5 : 1 }}
            >
              CYBER INTELLIGENCE INTERFACE
            </motion.p>
            
            {/* Loading bar */}
            <div className="mt-8 w-64 h-1 bg-gray-800 rounded overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00ff88] to-[#00f0ff]"
                initial={{ width: '0%' }}
                animate={{ width: phase === 0 ? '30%' : phase === 1 ? '70%' : '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Status text */}
            <motion.p
              className="text-center mt-2 text-xs text-gray-500"
              style={{ fontFamily: 'Share Tech Mono' }}
            >
              {phase === 0 && '> INITIALIZING...'}
              {phase === 1 && '> DECRYPTING...'}
            </motion.p>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#00ff88] opacity-50" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#00ff88] opacity-50" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#00ff88] opacity-50" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#00ff88] opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlitchIntro;
