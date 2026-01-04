import { motion } from 'framer-motion';
import { AlertLog as AlertLogType } from '@/lib/data';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface AlertLogProps {
  logs: AlertLogType[];
}

export function AlertLog({ logs }: AlertLogProps) {
  const getIcon = (level: AlertLogType['level']) => {
    switch (level) {
      case 'danger':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getBorderColor = (level: AlertLogType['level']) => {
    switch (level) {
      case 'danger':
        return 'border-l-red-400';
      case 'warning':
        return 'border-l-orange-400';
      default:
        return 'border-l-blue-400';
    }
  };

  return (
    <div className="glass-card h-full flex flex-col">
      {/* 标题 */}
      <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-display text-sm font-semibold text-primary">实时预警</span>
        </div>
        <span className="text-xs text-muted-foreground">ALERT LOG</span>
      </div>

      {/* 日志列表 */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {logs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 bg-secondary/30 rounded border-l-2 ${getBorderColor(log.level)} hover:bg-secondary/50 transition-colors`}
          >
            <div className="flex items-start gap-2">
              {getIcon(log.level)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                  {log.ticker && (
                    <span className="text-xs font-mono font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      {log.ticker}
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{log.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 底部状态 */}
      <div className="px-4 py-2 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
        <span>共 {logs.length} 条记录</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          监控中
        </span>
      </div>
    </div>
  );
}
