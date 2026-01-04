import { motion } from 'framer-motion';
import { Target, Shield, TrendingUp, AlertTriangle } from 'lucide-react';

interface ActionAdviceProps {
  bubblePressure: number;
}

export function ActionAdvice({ bubblePressure }: ActionAdviceProps) {
  const getAdvice = () => {
    if (bubblePressure >= 70) {
      return {
        level: 'danger',
        title: '泡沫区 - 建议撤退',
        icon: AlertTriangle,
        color: '#EF4444',
        aggressive: '立即止盈，不再追高。考虑买入看跌期权对冲。',
        conservative: '分批撤退，保留20%仓位观察。设定严格止损。',
        keyAction: '关注MAG7财报中的"ROI"和"成本控制"关键词'
      };
    } else if (bubblePressure >= 40) {
      return {
        level: 'warning',
        title: '警戒区 - 谨慎操作',
        icon: Shield,
        color: '#F97316',
        aggressive: '若核电标的回调至5日均线，可轻仓博取反弹。',
        conservative: '继续持有URA/COPX，上移止损位，不再加仓。',
        keyAction: '观察NVDA与CEG的日内联动，若背离需警惕'
      };
    } else {
      return {
        level: 'safe',
        title: '安全区 - 可布局',
        icon: Target,
        color: '#22C55E',
        aggressive: '积极布局二阶基建标的，尤其是RHI<1的冷门股。',
        conservative: '分批建仓，优先选择IBS<0.7的标的。',
        keyAction: '关注新的核电PPA协议签署消息'
      };
    }
  };

  const advice = getAdvice();
  const Icon = advice.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
      style={{
        borderColor: `${advice.color}30`,
        boxShadow: `0 0 30px ${advice.color}10`
      }}
    >
      {/* 标题 */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/30">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${advice.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: advice.color }} />
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold" style={{ color: advice.color }}>
            {advice.title}
          </h3>
          <p className="text-xs text-muted-foreground">ACTION ADVICE</p>
        </div>
      </div>

      {/* 策略建议 */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-foreground">激进型策略</span>
          </div>
          <p className="text-sm text-muted-foreground pl-6">{advice.aggressive}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-foreground">稳健型策略</span>
          </div>
          <p className="text-sm text-muted-foreground pl-6">{advice.conservative}</p>
        </div>

        <div className="pt-4 border-t border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">关键关注点</span>
          </div>
          <p className="text-sm text-foreground/90 pl-6 font-medium">{advice.keyAction}</p>
        </div>
      </div>
    </motion.div>
  );
}
