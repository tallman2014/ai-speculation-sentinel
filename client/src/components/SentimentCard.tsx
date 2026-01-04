import { motion } from 'framer-motion';
import { SentimentIndicator } from '@/lib/data';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SentimentCardProps {
  indicator: SentimentIndicator;
  index: number;
}

export function SentimentCard({ indicator, index }: SentimentCardProps) {
  const { name, shortName, value, threshold, description, interpretation } = indicator;
  
  // 判断状态
  const getStatus = () => {
    if (shortName === 'IBS') {
      // IBS越高越危险
      if (value >= threshold.danger) return 'danger';
      if (value >= threshold.warning) return 'warning';
      return 'safe';
    } else {
      // RHI和MSR也是越高越危险
      if (value >= threshold.danger) return 'danger';
      if (value >= threshold.warning) return 'warning';
      return 'safe';
    }
  };

  const status = getStatus();
  
  const statusColors = {
    safe: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#22C55E', glow: 'rgba(34, 197, 94, 0.3)' },
    warning: { bg: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.3)', text: '#F97316', glow: 'rgba(249, 115, 22, 0.3)' },
    danger: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#EF4444', glow: 'rgba(239, 68, 68, 0.3)' }
  };

  const colors = statusColors[status];

  // 计算进度条百分比
  const getProgress = () => {
    const max = threshold.danger * 1.2;
    return Math.min((value / max) * 100, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card hud-frame p-5 relative overflow-hidden"
      style={{
        boxShadow: status !== 'safe' ? `0 0 20px ${colors.glow}` : undefined
      }}
    >
      {/* 状态指示灯 */}
      <div 
        className="absolute top-3 right-3 w-2 h-2 rounded-full"
        style={{ 
          backgroundColor: colors.text,
          boxShadow: `0 0 8px ${colors.text}`
        }}
      />

      {/* 标题区 */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-display text-lg font-bold text-primary">{shortName}</span>
        <span className="text-sm text-muted-foreground">{name}</span>
        <Tooltip>
          <TooltipTrigger>
            <Info className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[250px]">
            <p className="text-sm">{description}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* 数值显示 */}
      <div className="flex items-baseline gap-2 mb-3">
        <motion.span
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="font-mono text-4xl font-bold"
          style={{ color: colors.text, textShadow: `0 0 15px ${colors.glow}` }}
        >
          {value.toFixed(2)}
        </motion.span>
      </div>

      {/* 进度条 */}
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${getProgress()}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: colors.text }}
        />
        {/* 阈值标记 */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-yellow-500/50"
          style={{ left: `${(threshold.warning / (threshold.danger * 1.2)) * 100}%` }}
        />
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-red-500/50"
          style={{ left: `${(threshold.danger / (threshold.danger * 1.2)) * 100}%` }}
        />
      </div>

      {/* 阈值说明 */}
      <div className="flex justify-between text-xs text-muted-foreground mb-3">
        <span>安全 &lt;{threshold.safe}</span>
        <span>警戒 &gt;{threshold.warning}</span>
        <span>危险 &gt;{threshold.danger}</span>
      </div>

      {/* 解读 */}
      <p className="text-sm text-muted-foreground border-t border-border/50 pt-3">
        {interpretation}
      </p>
    </motion.div>
  );
}
