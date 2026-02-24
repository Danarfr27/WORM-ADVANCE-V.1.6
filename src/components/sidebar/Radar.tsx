import { motion } from 'framer-motion';

const Radar = () => {
  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto">
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border border-[#00ff88]/30" />
      
      {/* Middle Ring */}
      <div className="absolute inset-[20%] rounded-full border border-[#00ff88]/20" />
      
      {/* Inner Ring */}
      <div className="absolute inset-[40%] rounded-full border border-[#00ff88]/10" />
      
      {/* Center Dot */}
      <div className="absolute inset-[48%] rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]" />
      
      {/* Crosshairs */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#00ff88]/20" />
      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#00ff88]/20" />
      
      {/* Rotating Sweep */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <div 
          className="absolute top-0 left-1/2 w-[2px] h-1/2 origin-bottom -translate-x-1/2"
          style={{
            background: 'linear-gradient(to top, #00ff88, transparent)',
          }}
        />
        <div 
          className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 255, 136, 0.3) 60deg, transparent 60deg)',
            transform: 'translateX(-50%)',
          }}
        />
      </motion.div>
      
      {/* Blip Points */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-[#ff0040]"
        style={{ top: '30%', left: '60%' }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#00f0ff]"
        style={{ top: '65%', left: '35%' }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-[#00ff88]"
        style={{ top: '45%', left: '25%' }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 2 }}
      />
      
      {/* Range Rings Labels */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] text-[#00ff88]/50">
        100km
      </div>
      <div className="absolute top-[22%] left-[62%] text-[8px] text-[#00ff88]/40">
        50km
      </div>
      <div className="absolute top-[42%] left-[52%] text-[8px] text-[#00ff88]/30">
        25km
      </div>
    </div>
  );
};

export default Radar;
