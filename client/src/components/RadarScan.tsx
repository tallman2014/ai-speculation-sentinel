import { motion } from 'framer-motion';

export function RadarScan() {
  return (
    <div className="absolute bottom-4 right-4 w-20 h-20 opacity-30 pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* 同心圆 */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="#38BDF8" strokeWidth="0.5" opacity="0.3" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#38BDF8" strokeWidth="0.5" opacity="0.3" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="#38BDF8" strokeWidth="0.5" opacity="0.3" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#38BDF8" strokeWidth="0.5" opacity="0.3" />
        
        {/* 十字线 */}
        <line x1="50" y1="5" x2="50" y2="95" stroke="#38BDF8" strokeWidth="0.5" opacity="0.2" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="#38BDF8" strokeWidth="0.5" opacity="0.2" />
        
        {/* 扫描线 */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50px 50px' }}
        >
          <defs>
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M 50 50 L 50 5 A 45 45 0 0 1 95 50 Z"
            fill="url(#scanGradient)"
            opacity="0.3"
          />
          <line x1="50" y1="50" x2="50" y2="5" stroke="#38BDF8" strokeWidth="1" />
        </motion.g>
        
        {/* 中心点 */}
        <circle cx="50" cy="50" r="3" fill="#38BDF8" />
      </svg>
    </div>
  );
}
