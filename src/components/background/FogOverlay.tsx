import { motion } from 'framer-motion';

const FogOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
      {/* Fog Layer 1 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(0, 240, 255, 0.08) 0%, transparent 50%)',
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['-5%', '5%', '-5%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Fog Layer 2 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(0, 255, 136, 0.06) 0%, transparent 50%)',
        }}
        animate={{
          x: ['10%', '-10%', '10%'],
          y: ['5%', '-5%', '5%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Fog Layer 3 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(0, 240, 255, 0.04) 0%, transparent 40%)',
        }}
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-10%', '10%', '-10%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Bottom Glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0, 255, 136, 0.05) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default FogOverlay;
