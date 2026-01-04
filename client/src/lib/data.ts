// 标的数据类型
export interface Asset {
  ticker: string;
  name: string;
  category: string;
  price: number;
  change: number;
  changePercent: number;
  rhi: number;
  ibs: number;
}

// 情绪指标类型
export interface SentimentIndicator {
  name: string;
  shortName: string;
  value: number;
  threshold: {
    danger: number;
    warning: number;
    safe: number;
  };
  description: string;
  interpretation: string;
}

// 趋势数据类型
export interface TrendData {
  date: string;
  rhi: number;
  ibs: number;
  msr: number;
  bubblePressure: number;
}

// 预警日志类型
export interface AlertLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'danger';
  ticker?: string;
  message: string;
}

// 模拟标的数据
export const assetsData: Asset[] = [
  { ticker: 'CEG', name: 'Constellation Energy', category: '核能', price: 353.27, change: -3.86, changePercent: -1.08, rhi: 1.2, ibs: 0.88 },
  { ticker: 'VST', name: 'Vistra Corp', category: '核能', price: 178.45, change: 2.34, changePercent: 1.33, rhi: 1.5, ibs: 0.82 },
  { ticker: 'FCX', name: 'Freeport-McMoRan', category: '铜矿', price: 42.18, change: 0.56, changePercent: 1.35, rhi: 0.8, ibs: 0.65 },
  { ticker: 'URA', name: 'Global X Uranium ETF', category: '铀矿', price: 31.24, change: -0.28, changePercent: -0.89, rhi: 0.6, ibs: 0.70 },
  { ticker: 'VRT', name: 'Vertiv Holdings', category: '电网', price: 142.67, change: 3.21, changePercent: 2.30, rhi: 1.8, ibs: 0.78 },
  { ticker: 'NVDA', name: 'NVIDIA Corp', category: '算力', price: 148.92, change: -1.23, changePercent: -0.82, rhi: 2.8, ibs: 0.92 },
];

// 情绪指标数据
export const sentimentIndicators: SentimentIndicator[] = [
  {
    name: '散户热度指数',
    shortName: 'RHI',
    value: 1.35,
    threshold: { danger: 3.0, warning: 2.0, safe: 1.0 },
    description: '监控Reddit/X上关于二阶基建标的的讨论增量',
    interpretation: '当前处于温和区间，散户尚未大规模入场'
  },
  {
    name: '机构看涨偏离度',
    shortName: 'IBS',
    value: 0.78,
    threshold: { danger: 0.85, warning: 0.70, safe: 0.50 },
    description: '分析主流券商上调目标价的分析师比例',
    interpretation: '机构共识较强，但尚未达到极端一致'
  },
  {
    name: '媒体词频比',
    shortName: 'MSR',
    value: 2.8,
    threshold: { danger: 5.0, warning: 3.0, safe: 1.5 },
    description: '财经新闻中"狂欢词"与"末日词"的出现比例',
    interpretation: '媒体情绪偏乐观，但未达狂热'
  }
];

// 计算泡沫压力值 (0-100)
export function calculateBubblePressure(rhi: number, ibs: number, msr: number): number {
  // RHI权重30%，IBS权重40%，MSR权重30%
  const rhiScore = Math.min((rhi / 3.0) * 100, 100) * 0.3;
  const ibsScore = Math.min((ibs / 0.85) * 100, 100) * 0.4;
  const msrScore = Math.min((msr / 5.0) * 100, 100) * 0.3;
  return Math.round(rhiScore + ibsScore + msrScore);
}

// 获取泡沫压力等级
export function getBubblePressureLevel(pressure: number): 'safe' | 'warning' | 'danger' {
  if (pressure >= 70) return 'danger';
  if (pressure >= 40) return 'warning';
  return 'safe';
}

// 趋势数据（过去7天）
export const trendData: TrendData[] = [
  { date: '12/29', rhi: 1.1, ibs: 0.72, msr: 2.2, bubblePressure: 42 },
  { date: '12/30', rhi: 1.2, ibs: 0.74, msr: 2.4, bubblePressure: 45 },
  { date: '12/31', rhi: 1.3, ibs: 0.76, msr: 2.5, bubblePressure: 48 },
  { date: '01/01', rhi: 1.25, ibs: 0.75, msr: 2.6, bubblePressure: 47 },
  { date: '01/02', rhi: 1.3, ibs: 0.77, msr: 2.7, bubblePressure: 50 },
  { date: '01/03', rhi: 1.32, ibs: 0.78, msr: 2.75, bubblePressure: 51 },
  { date: '01/04', rhi: 1.35, ibs: 0.78, msr: 2.8, bubblePressure: 52 },
];

// 预警日志
export const alertLogs: AlertLog[] = [
  { id: '1', timestamp: '09:15', level: 'info', ticker: 'VRT', message: 'VRT 成交量较20日均值放大1.3倍' },
  { id: '2', timestamp: '09:32', level: 'warning', ticker: 'NVDA', message: 'NVDA RHI指数接近2.8，散户热度升温' },
  { id: '3', timestamp: '10:05', level: 'info', message: 'MAG7财报周即将到来，建议提升风险管理权重' },
  { id: '4', timestamp: '10:28', level: 'info', ticker: 'CEG', message: 'CEG 分析师目标价中位数上调至$407' },
  { id: '5', timestamp: '11:15', level: 'warning', message: 'IBS综合指数达到0.78，机构共识趋于一致' },
  { id: '6', timestamp: '11:45', level: 'info', ticker: 'FCX', message: 'LME铜库存继续下降，FCX基本面改善' },
];

// 获取当前日期时间
export function getCurrentDateTime(): string {
  const now = new Date();
  return now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

// 获取市场状态
export function getMarketStatus(): { status: string; color: string } {
  const hour = new Date().getHours();
  if (hour >= 9 && hour < 16) {
    return { status: '交易中', color: 'text-green-400' };
  } else if (hour >= 16 && hour < 21) {
    return { status: '盘后', color: 'text-yellow-400' };
  } else {
    return { status: '休市', color: 'text-gray-400' };
  }
}
