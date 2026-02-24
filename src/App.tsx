import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MatrixRain from './components/background/MatrixRain';
import GridBackground from './components/background/GridBackground';
import FogOverlay from './components/background/FogOverlay';
import Scanlines from './components/background/Scanlines';
import CustomCursor from './components/CustomCursor';
import GlitchIntro from './components/GlitchIntro';
import ChatInterface from './components/chat/ChatInterface';
import CyberSidebar from './components/sidebar/CyberSidebar';

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Verify session on app start; redirect to login if not authenticated
    (async () => {
      try {
        const res = await fetch('/api/session');
        if (res.ok) {
          const d = await res.json();
          if (!d || !d.authenticated) {
            window.location.href = '/login';
            return;
          }
        } else {
          window.location.href = '/login';
          return;
        }
      } catch (e) {
        window.location.href = '/login';
        return;
      } finally {
        setAuthChecked(true);
      }
    })();

    // Preload fonts and assets
    const preload = async () => {
      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoaded(true);
    };
    preload();
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (!isLoaded || !authChecked) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex items-center justify-center">
        <div className="hexagon-spinner" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#050505] to-[#0a0a0a] screen-flicker">
      {/* Glitch Intro */}
      {showIntro && <GlitchIntro onComplete={handleIntroComplete} />}

      {/* Background Layers */}
      <MatrixRain />
      <GridBackground />
      <FogOverlay />
      <Scanlines />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 min-h-screen p-4 lg:p-6"
      >
        <div className="max-w-[1800px] mx-auto h-[calc(100vh-48px)]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00ff88]/20 to-[#00f0ff]/10 border border-[#00ff88]/40 flex items-center justify-center">
                  <span 
                    className="text-xl font-bold text-[#00ff88]"
                    style={{ fontFamily: 'Orbitron' }}
                  >
                    W
                  </span>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-[#00ff88] rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>

              <div>
                <h1 
                  className="text-xl font-bold text-[#00ff88] glitch"
                  data-text="WORM AI"
                  style={{ fontFamily: 'Orbitron' }}
                >
                  WORM AI
                </h1>
                <p className="text-xs text-gray-500 tracking-wider">
                  CYBER INTELLIGENCE INTERFACE v2.0
                </p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-xs text-gray-400">SYSTEM ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                <span className="text-xs text-gray-400">ENCRYPTED</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {new Date().toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
          </motion.header>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-4 h-[calc(100%-80px)]">
            {/* Chat Interface - Left Side */}
            <div className="flex-1 min-h-0">
              <ChatInterface />
            </div>

            {/* Cyber Sidebar - Right Side */}
            <div className="hidden lg:block h-full overflow-y-auto scrollbar-cyber">
              <CyberSidebar />
            </div>
          </div>
        </div>
      </motion.main>

      {/* Mobile Sidebar Toggle (visible only on mobile) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="lg:hidden fixed bottom-4 right-4 z-50 cyber-btn p-3 rounded-full"
        onClick={() => {
          const sidebar = document.getElementById('mobile-sidebar');
          sidebar?.classList.toggle('hidden');
        }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </motion.button>

      {/* Mobile Sidebar */}
      <div 
        id="mobile-sidebar" 
        className="hidden lg:hidden fixed inset-0 z-40 bg-black/90 p-4 overflow-y-auto"
      >
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => {
            document.getElementById('mobile-sidebar')?.classList.add('hidden');
          }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <CyberSidebar />
      </div>
    </div>
  );
}

export default App;
