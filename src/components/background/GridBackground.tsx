import { motion } from 'framer-motion';

const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* Primary Grid */}
      <motion.div
        className="absolute inset-0 grid-bg opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      />
      
      {/* Moving Grid Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(0, 255, 136, 0.1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Horizontal scanning line */}
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="rgba(0, 255, 136, 0.3)"
          strokeWidth="1"
          animate={{
            y1: ['0%', '100%', '0%'],
            y2: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Vertical scanning line */}
        <motion.line
          x1="0"
          y1="0"
          x2="0"
          y2="100%"
          stroke="rgba(0, 240, 255, 0.2)"
          strokeWidth="1"
          animate={{
            x1: ['0%', '100%', '0%'],
            x2: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>
      
      {/* Perspective Grid */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to top,
              rgba(0, 255, 136, 0.05) 0%,
              transparent 100%
            )
          `,
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom center',
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="perspective-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(0, 255, 136, 0.15)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#perspective-grid)" />
        </svg>
      </div>
    </div>
  );
};

export default GridBackground;
