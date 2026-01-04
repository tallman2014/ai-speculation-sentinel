/**
 * 网站动态数据加载模块
 * 从 website-data.json 读取由定时任务生成的最新数据
 */

import { Asset, SentimentIndicator, TrendData, AlertLog } from './data';

export interface WebsiteData {
  lastUpdated: string;
  sentimentIndicators: SentimentIndicator[];
  bubblePressure: number;
  assets: Asset[];
  alerts: AlertLog[];
  trendData: TrendData[];
}

let cachedData: WebsiteData | null = null;

/**
 * 从JSON文件加载网站数据
 * 如果文件不存在或加载失败，返回默认数据
 */
export async function loadWebsiteData(): Promise<WebsiteData> {
  // 如果已缓存，直接返回
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch('/website-data.json');
    if (response.ok) {
      const data = await response.json();
      cachedData = data;
      console.log('✅ 已加载最新网站数据', data.lastUpdated);
      return data;
    }
  } catch (error) {
    console.warn('⚠️ 无法加载网站数据，使用默认数据', error);
  }

  // 返回默认数据
  return getDefaultData();
}

/**
 * 获取默认数据（当JSON文件不存在时使用）
 */
function getDefaultData(): WebsiteData {
  return {
    lastUpdated: new Date().toISOString(),
    sentimentIndicators: [
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
    ],
    bubblePressure: 52,
    assets: [
      { ticker: 'CEG', name: 'Constellation Energy', category: '核能', price: 353.27, change: -3.86, changePercent: -1.08, rhi: 1.2, ibs: 0.88 },
      { ticker: 'VST', name: 'Vistra Corp', category: '核能', price: 178.45, change: 2.34, changePercent: 1.33, rhi: 1.5, ibs: 0.82 },
      { ticker: 'FCX', name: 'Freeport-McMoRan', category: '铜矿', price: 42.18, change: 0.56, changePercent: 1.35, rhi: 0.8, ibs: 0.65 },
      { ticker: 'URA', name: 'Global X Uranium ETF', category: '铀矿', price: 31.24, change: -0.28, changePercent: -0.89, rhi: 0.6, ibs: 0.70 },
      { ticker: 'VRT', name: 'Vertiv Holdings', category: '电网', price: 142.67, change: 3.21, changePercent: 2.30, rhi: 1.8, ibs: 0.78 },
      { ticker: 'NVDA', name: 'NVIDIA Corp', category: '算力', price: 148.92, change: -1.23, changePercent: -0.82, rhi: 2.8, ibs: 0.92 },
    ],
    alerts: [
      { id: '1', timestamp: '09:15', level: 'info', ticker: 'VRT', message: 'VRT 成交量较20日均值放大1.3倍' },
      { id: '2', timestamp: '09:32', level: 'warning', ticker: 'NVDA', message: 'NVDA RHI指数接近2.8，散户热度升温' },
      { id: '3', timestamp: '10:05', level: 'info', message: 'MAG7财报周即将到来，建议提升风险管理权重' },
      { id: '4', timestamp: '10:28', level: 'info', ticker: 'CEG', message: 'CEG 分析师目标价中位数上调至$407' },
      { id: '5', timestamp: '11:15', level: 'warning', message: 'IBS综合指数达到0.78，机构共识趋于一致' },
      { id: '6', timestamp: '11:45', level: 'info', ticker: 'FCX', message: 'LME铜库存继续下降，FCX基本面改善' },
    ],
    trendData: [
      { date: '12/29', rhi: 1.1, ibs: 0.72, msr: 2.2, bubblePressure: 42 },
      { date: '12/30', rhi: 1.2, ibs: 0.74, msr: 2.4, bubblePressure: 45 },
      { date: '12/31', rhi: 1.3, ibs: 0.76, msr: 2.5, bubblePressure: 48 },
      { date: '01/01', rhi: 1.25, ibs: 0.75, msr: 2.6, bubblePressure: 47 },
      { date: '01/02', rhi: 1.3, ibs: 0.77, msr: 2.7, bubblePressure: 50 },
      { date: '01/03', rhi: 1.32, ibs: 0.78, msr: 2.75, bubblePressure: 51 },
      { date: '01/04', rhi: 1.35, ibs: 0.78, msr: 2.8, bubblePressure: 52 },
    ]
  };
}

/**
 * 清除缓存（用于手动刷新）
 */
export function clearCache(): void {
  cachedData = null;
}
