import { motion } from 'framer-motion';
import Radar from './Radar';
import NetworkFeed from './NetworkFeed';
import ProgressBars from './ProgressBars';
import IPTracker from './IPTracker';
import { Activity, Wifi, Shield, Terminal } from 'lucide-react';

const CyberSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full lg:w-80 xl:w-96 space-y-4"
    >
      {/* System Status Header */}
      <div className="glass-card-glow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="status-indicator active" />
            <span 
              className="text-sm font-bold text-[#00ff88]"
              style={{ fontFamily: 'Orbitron' }}
            >
              SYSTEM ACTIVE
            </span>
          </div>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xs text-gray-500 font-mono"
          >
            ONLINE
          </motion.div>
        </div>
      </div>

      {/* Radar Section */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-[#00f0ff]" />
          <span 
            className="text-xs font-bold text-gray-300"
            style={{ fontFamily: 'Orbitron' }}
          >
            NETWORK RADAR
          </span>
        </div>
        <Radar />
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>Targets: 3</span>
          <span>Range: 100km</span>
          <span>Scan: ACTIVE</span>
        </div>
      </div>

      {/* Progress Bars Section */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-4 h-4 text-[#00ff88]" />
          <span 
            className="text-xs font-bold text-gray-300"
            style={{ fontFamily: 'Orbitron' }}
          >
            SYSTEM RESOURCES
          </span>
        </div>
        <ProgressBars />
      </div>

      {/* IP Tracker Section */}
      <IPTracker />

      {/* Network Feed Section */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <Wifi className="w-4 h-4 text-[#ffaa00]" />
          <span 
            className="text-xs font-bold text-gray-300"
            style={{ fontFamily: 'Orbitron' }}
          >
            NETWORK ACTIVITY
          </span>
        </div>
        <NetworkFeed />
      </div>

      {/* Security Status */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-[#00ff88]" />
          <span 
            className="text-xs font-bold text-gray-300"
            style={{ fontFamily: 'Orbitron' }}
          >
            SECURITY STATUS
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Firewall</span>
            <span className="text-[#00ff88]">ENABLED</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">VPN Tunnel</span>
            <span className="text-[#00ff88]">CONNECTED</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Threat Level</span>
            <span className="text-[#00f0ff]">LOW</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Last Scan</span>
            <span className="text-gray-500">2m ago</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-[10px] text-gray-600 font-mono">
        <p>WORM AI v2.0 // CYBER INTELLIGENCE INTERFACE</p>
        <p className="mt-1">ENCRYPTED CONNECTION // SECURE</p>
      </div>
    </motion.div>
  );
};

export default CyberSidebar;
