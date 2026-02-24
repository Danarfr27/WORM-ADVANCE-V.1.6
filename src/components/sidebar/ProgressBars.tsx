import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarData {
  label: string;
  value: number;
  color: string;
  unit: string;
}

const ProgressBars = () => {
  const [bars, setBars] = useState<ProgressBarData[]>([
    { label: 'CPU Usage', value: 45, color: '#00ff88', unit: '%' },
    { label: 'Memory', value: 62, color: '#00f0ff', unit: '%' },
    { label: 'Network', value: 28, color: '#ffaa00', unit: 'MB/s' },
    { label: 'Encryption', value: 98, color: '#ff0040', unit: '%' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map((bar) => ({
          ...bar,
          value: Math.min(100, Math.max(0, bar.value + (Math.random() - 0.5) * 10)),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {bars.map((bar, index) => (
        <motion.div
          key={bar.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Label Row */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400" style={{ fontFamily: 'Share Tech Mono' }}>
              {bar.label}
            </span>
            <span 
              className="text-xs font-mono"
              style={{ color: bar.color }}
            >
              {bar.value.toFixed(1)}{bar.unit}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            {/* Background glow */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{ backgroundColor: bar.color }}
            />
            
            {/* Progress fill */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ 
                background: `linear-gradient(90deg, ${bar.color}80, ${bar.color})`,
                boxShadow: `0 0 10px ${bar.color}50`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${bar.value}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-y-0 w-20"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressBars;
