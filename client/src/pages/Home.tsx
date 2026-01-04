import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StatusBar } from '@/components/StatusBar';
import { BubblePressureGauge } from '@/components/BubblePressureGauge';
import { SentimentCard } from '@/components/SentimentCard';
import { AssetList } from '@/components/AssetList';
import { AlertLog } from '@/components/AlertLog';
import { TrendChart } from '@/components/TrendChart';
import { ActionAdvice } from '@/components/ActionAdvice';
import { RadarScan } from '@/components/RadarScan';
import { loadWebsiteData } from '@/lib/website-data';
import { 
  assetsData as defaultAssetsData, 
  sentimentIndicators as defaultSentimentIndicators, 
  trendData as defaultTrendData, 
  alertLogs as defaultAlertLogs
} from '@/lib/data';
import type { Asset, SentimentIndicator, TrendData, AlertLog as AlertLogType } from '@/lib/data';

/**
 * AI投机哨兵 - 战情室主页面
 * 设计风格：军事级态势感知 / HUD界面
 * 主色调：深海军蓝 + HUD蓝色高亮
 */
export default function Home() {
  const [assetsData, setAssetsData] = useState<Asset[]>(defaultAssetsData);
  const [sentimentIndicators, setSentimentIndicators] = useState<SentimentIndicator[]>(defaultSentimentIndicators);
  const [trendData, setTrendData] = useState<TrendData[]>(defaultTrendData);
  const [alertLogs, setAlertLogs] = useState<AlertLogType[]>(defaultAlertLogs);
  const [bubblePressure, setBubblePressure] = useState(52);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // 加载网站数据
  useEffect(() => {
    loadWebsiteData().then(data => {
      setSentimentIndicators(data.sentimentIndicators);
      setAssetsData(data.assets);
      setTrendData(data.trendData);
      setAlertLogs(data.alerts);
      setBubblePressure(data.bubblePressure);
      setLastUpdated(data.lastUpdated);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">加载监控数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 网格背景叠加 */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      
      {/* 扫描线效果 */}
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* 主内容区 */}
      <div className="relative z-10 min-h-screen flex flex-col p-4 lg:p-6 gap-4 lg:gap-6">
        {/* 顶部状态栏 */}
        <StatusBar />

        {/* 主体内容 */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* 左侧：标的列表 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="mb-4">
              <h2 className="font-display text-sm font-semibold text-primary mb-1">监控标的</h2>
              <p className="text-xs text-muted-foreground">WATCHLIST</p>
            </div>
            <AssetList assets={assetsData} />
          </motion.div>

          {/* 中间：核心数据区 */}
          <div className="lg:col-span-6 flex flex-col gap-4 lg:gap-6">
            {/* 泡沫压力仪表盘 + 行动建议 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 flex flex-col items-center justify-center relative"
              >
                <div className="absolute top-3 left-3">
                  <span className="font-display text-xs text-muted-foreground">BUBBLE PRESSURE</span>
                </div>
                <BubblePressureGauge value={bubblePressure} />
              </motion.div>

              <ActionAdvice bubblePressure={bubblePressure} />
            </div>

            {/* 情绪指标卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sentimentIndicators.map((indicator, index) => (
                <SentimentCard key={indicator.shortName} indicator={indicator} index={index} />
              ))}
            </div>

            {/* 趋势图表 */}
            <TrendChart data={trendData} />
          </div>

          {/* 右侧：预警日志 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="mb-4">
              <h2 className="font-display text-sm font-semibold text-primary mb-1">战情通报</h2>
              <p className="text-xs text-muted-foreground">SITUATION REPORT</p>
            </div>
            <div className="h-[calc(100%-2rem)]">
              <AlertLog logs={alertLogs} />
            </div>
          </motion.div>
        </div>

        {/* 底部信息 */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-3 border-t border-border/30"
        >
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-display">AI SPECULATION SENTINEL</span>
            {' · '}
            数据仅供参考，不构成投资建议
            {' · '}
            <span className="font-mono">v1.0.0</span>
            {lastUpdated && (
              <>
                {' · '}
                <span className="text-primary/70">
                  最后更新: {new Date(lastUpdated).toLocaleString('zh-CN')}
                </span>
              </>
            )}
          </p>
        </motion.footer>
      </div>

      {/* 雷达扫描动画 */}
      <RadarScan />
    </div>
  );
}
