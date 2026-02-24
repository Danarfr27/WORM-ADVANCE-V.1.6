import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Shield } from 'lucide-react';

const IPTracker = () => {
  const [currentIP, setCurrentIP] = useState('192.168.X.XXX');
  const [location] = useState('ENCRYPTED');
  const [isMasking, setIsMasking] = useState(true);

  useEffect(() => {
    // Simulate IP masking/unmasking
    const interval = setInterval(() => {
      setIsMasking((prev) => !prev);
      if (isMasking) {
        setCurrentIP(`${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`);
      } else {
        setCurrentIP('192.168.X.XXX');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isMasking]);

  return (
    <div className="glass-card-glow p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 text-[#00ff88]">
        <Shield className="w-4 h-4" />
        <span className="text-xs font-bold" style={{ fontFamily: 'Orbitron' }}>
          IDENTITY MASKER
        </span>
      </div>

      {/* IP Display */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Current IP:</span>
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: isMasking ? 0.5 : 1 }}
          >
            <div className={`w-2 h-2 rounded-full ${isMasking ? 'bg-[#00ff88]' : 'bg-yellow-500'} animate-pulse`} />
            <span className="text-sm font-mono text-[#00f0ff]">
              {currentIP}
            </span>
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Location:</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs font-mono text-gray-300">
              {location}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Proxy:</span>
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88]">
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="pt-2 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Encryption:</span>
          <span className="text-[#00ff88] font-mono">AES-256-GCM</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-gray-500">Protocol:</span>
          <span className="text-[#00f0ff] font-mono">WORM-V2</span>
        </div>
      </div>

      {/* Animated Bars */}
      <div className="flex gap-1 h-4 items-end">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-[#00ff88]/50 rounded-sm"
            animate={{
              height: ['20%', '80%', '40%', '100%', '30%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default IPTracker;
