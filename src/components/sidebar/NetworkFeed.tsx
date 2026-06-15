import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NetworkEvent {
  id: number;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  ip?: string;
}

const NetworkFeed = () => {
  const [events, setEvents] = useState<NetworkEvent[]>([]);
  const feedRef = useRef<HTMLDivElement>(null);

  const eventTemplates = [
    { type: 'info' as const, message: 'Incoming connection from' },
    { type: 'success' as const, message: 'Packet verified' },
    { type: 'warning' as const, message: 'Unusual traffic detected' },
    { type: 'info' as const, message: 'Handshake established with' },
    { type: 'success' as const, message: 'Encryption key rotated' },
    { type: 'info' as const, message: 'Proxy relay activated' },
    { type: 'warning' as const, message: 'Latency spike detected' },
    { type: 'success' as const, message: 'Data tunnel secured' },
  ];

  const generateIP = () => {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  };

  const generateTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`;
  };

  useEffect(() => {
    // Generate initial events
    const initialEvents: NetworkEvent[] = [];
    for (let i = 0; i < 8; i++) {
      const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      initialEvents.push({
        id: Date.now() - i * 1000,
        timestamp: generateTimestamp(),
        type: template.type,
        message: template.message,
        ip: Math.random() > 0.3 ? generateIP() : undefined,
      });
    }
    setEvents(initialEvents);

    // Add new events periodically
    const interval = setInterval(() => {
      const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      const newEvent: NetworkEvent = {
        id: Date.now(),
        timestamp: generateTimestamp(),
        type: template.type,
        message: template.message,
        ip: Math.random() > 0.3 ? generateIP() : undefined,
      };
      setEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to top
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [events]);

  const getTypeColor = (type: NetworkEvent['type']) => {
    switch (type) {
      case 'info':
        return 'text-[#00f0ff]';
      case 'success':
        return 'text-[#00ff88]';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-[#ff0040]';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: NetworkEvent['type']) => {
    switch (type) {
      case 'info':
        return '●';
      case 'success':
        return '✓';
      case 'warning':
        return '!';
      case 'error':
        return '✗';
      default:
        return '●';
    }
  };

  return (
    <div 
      ref={feedRef}
      className="h-48 overflow-y-auto scrollbar-cyber space-y-1"
    >
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-start gap-2 text-xs p-1 rounded hover:bg-white/5 transition-colors"
        >
          <span className={getTypeColor(event.type)}>
            {getTypeIcon(event.type)}
          </span>
          <div className="flex-1 min-w-0">
            <span className="text-gray-500">[{event.timestamp}]</span>
            <span className={`ml-2 ${getTypeColor(event.type)}`}>
              {event.message}
            </span>
            {event.ip && (
              <span className="ml-1 text-gray-400 font-mono">
                {event.ip}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NetworkFeed;
