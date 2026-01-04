import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Shield, Wifi } from 'lucide-react';

export function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  // 模拟市场状态
  const hour = currentTime.getHours();
  const isMarketOpen = hour >= 9 && hour < 16;
  const marketStatus = isMarketOpen ? '交易中' : hour >= 16 && hour < 21 ? '盘后' : '休市';
  const marketColor = isMarketOpen ? 'text-green-400' : hour >= 16 && hour < 21 ? 'text-yellow-400' : 'text-gray-400';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card px-6 py-3 flex items-center justify-between"
    >
      {/* 左侧：Logo和标题 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Shield className="w-8 h-8 text-primary" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground tracking-wider">
              AI投机哨兵
            </h1>
            <p className="text-xs text-muted-foreground">SPECULATION SENTINEL</p>
          </div>
        </div>
      </div>

      {/* 中间：系统状态 */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Wifi className="w-4 h-4 text-green-400" />
          <span className="text-muted-foreground">数据连接</span>
          <span className="text-green-400 font-mono">正常</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2 text-sm">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">市场状态</span>
          <span className={`font-mono ${marketColor}`}>{marketStatus}</span>
        </div>
      </div>

      {/* 右侧：时间 */}
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <span className="font-mono text-sm text-foreground">
          {formatTime(currentTime)}
        </span>
      </div>
    </motion.header>
  );
}
