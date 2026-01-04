import { motion } from 'framer-motion';
import { getBubblePressureLevel } from '@/lib/data';

interface BubblePressureGaugeProps {
  value: number;
}

export function BubblePressureGauge({ value }: BubblePressureGaugeProps) {
  const level = getBubblePressureLevel(value);
  const rotation = (value / 100) * 180 - 90; // -90 to 90 degrees

  const levelColors = {
    safe: { main: '#22C55E', glow: 'rgba(34, 197, 94, 0.5)' },
    warning: { main: '#F97316', glow: 'rgba(249, 115, 22, 0.5)' },
    danger: { main: '#EF4444', glow: 'rgba(239, 68, 68, 0.5)' }
  };

  const colors = levelColors[level];

  const levelText = {
    safe: '安全区',
    warning: '警戒区',
    danger: '泡沫区'
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 opacity-20 rounded-full"
        style={{
          backgroundImage: 'url(/images/gauge-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(1px)'
        }}
      />
      
      {/* SVG仪表盘 */}
      <svg viewBox="0 0 200 120" className="w-full max-w-[280px] relative z-10">
        {/* 背景弧线 */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#F97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 刻度背景 */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* 安全区 (0-40) */}
        <path
          d="M 20 100 A 80 80 0 0 1 60 36"
          fill="none"
          stroke="#22C55E"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 警戒区 (40-70) */}
        <path
          d="M 60 36 A 80 80 0 0 1 140 36"
          fill="none"
          stroke="#F97316"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 泡沫区 (70-100) */}
        <path
          d="M 140 36 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#EF4444"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 刻度标记 */}
        {[0, 20, 40, 60, 80, 100].map((tick, i) => {
          const angle = (tick / 100) * 180 - 90;
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + 70 * Math.cos(rad);
          const y1 = 100 + 70 * Math.sin(rad);
          const x2 = 100 + 78 * Math.cos(rad);
          const y2 = 100 + 78 * Math.sin(rad);
          const textX = 100 + 60 * Math.cos(rad);
          const textY = 100 + 60 * Math.sin(rad);
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#38BDF8"
                strokeWidth="2"
                opacity="0.5"
              />
              <text
                x={textX}
                y={textY}
                fill="#38BDF8"
                fontSize="8"
                textAnchor="middle"
                dominantBaseline="middle"
                opacity="0.7"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* 指针 */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          style={{ transformOrigin: '100px 100px' }}
        >
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="35"
            stroke={colors.main}
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <circle
            cx="100"
            cy="100"
            r="8"
            fill={colors.main}
            filter="url(#glow)"
          />
        </motion.g>

        {/* 中心装饰 */}
        <circle cx="100" cy="100" r="5" fill="#0A1628" stroke={colors.main} strokeWidth="2" />
      </svg>

      {/* 数值显示 */}
      <div className="mt-4 text-center relative z-10">
        <motion.div
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-display text-5xl font-bold"
          style={{ color: colors.main, textShadow: `0 0 20px ${colors.glow}` }}
        >
          {value}
        </motion.div>
        <div className="text-sm text-muted-foreground mt-1">泡沫压力值</div>
        <div 
          className="mt-2 px-3 py-1 rounded-full text-xs font-medium inline-block"
          style={{ 
            backgroundColor: `${colors.main}20`,
            color: colors.main,
            border: `1px solid ${colors.main}40`
          }}
        >
          {levelText[level]}
        </div>
      </div>
    </div>
  );
}
