import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Scan, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface ScanAnimationProps {
  isActive: boolean;
  onComplete: () => void;
}

const ScanAnimation = ({ isActive, onComplete }: ScanAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'init' | 'scanning' | 'complete'>('init');
  const [findings, setFindings] = useState<string[]>([]);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      setStage('init');
      setFindings([]);
      return;
    }

    setStage('scanning');
    
    // Simulate scan progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setStage('complete');
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Add random findings
    const findingsList = [
      'Checking system integrity...',
      'Analyzing network protocols...',
      'Scanning for vulnerabilities...',
      'Verifying encryption keys...',
      'Checking firewall status...',
      'Analyzing traffic patterns...',
    ];

    const findingInterval = setInterval(() => {
      const randomFinding = findingsList[Math.floor(Math.random() * findingsList.length)];
      setFindings((prev) => [...prev.slice(-3), randomFinding]);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(findingInterval);
    };
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(5, 5, 5, 0.95)' }}
        >
          {/* Scanning Grid Background */}
          <div className="absolute inset-0 grid-bg opacity-50" />
          
          {/* Scan Line */}
          {stage === 'scanning' && (
            <motion.div
              className="absolute left-0 right-0 h-[2px]"
              style={{ 
                background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
                boxShadow: '0 0 20px #00ff88',
              }}
              animate={{
                top: ['0%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}

          {/* Main Content */}
          <div className="relative z-10 text-center max-w-md w-full mx-4">
            {/* Icon */}
            <motion.div
              className="mb-6"
              animate={stage === 'scanning' ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              {stage === 'complete' ? (
                <CheckCircle className="w-16 h-16 text-[#00ff88] mx-auto" />
              ) : (
                <Scan className="w-16 h-16 text-[#00f0ff] mx-auto" />
              )}
            </motion.div>

            {/* Title */}
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ 
                fontFamily: 'Orbitron',
                color: stage === 'complete' ? '#00ff88' : '#00f0ff',
              }}
            >
              {stage === 'init' && 'INITIALIZING SCAN...'}
              {stage === 'scanning' && 'SYSTEM SCAN IN PROGRESS'}
              {stage === 'complete' && 'SCAN COMPLETE'}
            </h2>

            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00ff88, #00f0ff)',
                  boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            {/* Progress Text */}
            <div className="text-[#00ff88] font-mono mb-6">
              {progress.toFixed(0)}%
            </div>

            {/* Findings */}
            {stage === 'scanning' && findings.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-left space-y-2"
              >
                {findings.map((finding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <Shield className="w-4 h-4 text-[#00f0ff]" />
                    <span style={{ fontFamily: 'Share Tech Mono' }}>{finding}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Complete Message */}
            {stage === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#00ff88]"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span style={{ fontFamily: 'Orbitron' }}>SYSTEM SECURE</span>
                </div>
                <p className="text-sm text-gray-400">
                  No threats detected. All systems operational.
                </p>
              </motion.div>
            )}

            {/* Warning Icon (decorative) */}
            {stage === 'scanning' && (
              <motion.div
                className="absolute top-4 right-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              </motion.div>
            )}
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-[#00ff88]/30" />
          <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-[#00ff88]/30" />
          <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-[#00ff88]/30" />
          <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-[#00ff88]/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanAnimation;
