import { motion } from 'framer-motion';
import { Asset } from '@/lib/data';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface AssetListProps {
  assets: Asset[];
}

export function AssetList({ assets }: AssetListProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '核能': '#22C55E',
      '铜矿': '#F97316',
      '铀矿': '#FBBF24',
      '电网': '#38BDF8',
      '算力': '#A855F7'
    };
    return colors[category] || '#6B7280';
  };

  const getRHIStatus = (rhi: number) => {
    if (rhi >= 3.0) return { status: 'danger', text: '过热' };
    if (rhi >= 2.0) return { status: 'warning', text: '升温' };
    if (rhi < 0.5) return { status: 'cold', text: '冷清' };
    return { status: 'normal', text: '温和' };
  };

  const getIBSStatus = (ibs: number) => {
    if (ibs >= 0.85) return { status: 'danger', text: '极高' };
    if (ibs >= 0.70) return { status: 'warning', text: '高' };
    if (ibs < 0.20) return { status: 'divergent', text: '分歧' };
    return { status: 'normal', text: '中等' };
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* 表头 */}
      <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-secondary/30 border-b border-border/50 text-xs font-medium text-muted-foreground">
        <div className="col-span-3">标的</div>
        <div className="col-span-2 text-right">价格</div>
        <div className="col-span-2 text-right">涨跌</div>
        <div className="col-span-2 text-center">RHI</div>
        <div className="col-span-3 text-center">IBS</div>
      </div>

      {/* 列表 */}
      <div className="divide-y divide-border/30">
        {assets.map((asset, index) => {
          const rhiStatus = getRHIStatus(asset.rhi);
          const ibsStatus = getIBSStatus(asset.ibs);
          
          return (
            <motion.div
              key={asset.ticker}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-secondary/20 transition-colors cursor-pointer group"
            >
              {/* 标的信息 */}
              <div className="col-span-3 flex items-center gap-2">
                <div 
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: getCategoryColor(asset.category) }}
                />
                <div>
                  <div className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
                    {asset.ticker}
                  </div>
                  <div className="text-xs text-muted-foreground truncate max-w-[100px]">
                    {asset.category}
                  </div>
                </div>
              </div>

              {/* 价格 */}
              <div className="col-span-2 flex items-center justify-end">
                <span className="font-mono text-sm">${asset.price.toFixed(2)}</span>
              </div>

              {/* 涨跌 */}
              <div className="col-span-2 flex items-center justify-end gap-1">
                {asset.changePercent > 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-400" />
                ) : asset.changePercent < 0 ? (
                  <TrendingDown className="w-3 h-3 text-red-400" />
                ) : (
                  <Minus className="w-3 h-3 text-gray-400" />
                )}
                <span 
                  className={`font-mono text-sm ${
                    asset.changePercent > 0 ? 'text-green-400' : 
                    asset.changePercent < 0 ? 'text-red-400' : 'text-gray-400'
                  }`}
                >
                  {asset.changePercent > 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                </span>
              </div>

              {/* RHI */}
              <div className="col-span-2 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-sm">{asset.rhi.toFixed(1)}</div>
                  <div 
                    className={`text-xs ${
                      rhiStatus.status === 'danger' ? 'text-red-400' :
                      rhiStatus.status === 'warning' ? 'text-orange-400' :
                      rhiStatus.status === 'cold' ? 'text-blue-400' : 'text-green-400'
                    }`}
                  >
                    {rhiStatus.text}
                  </div>
                </div>
              </div>

              {/* IBS */}
              <div className="col-span-3 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${(asset.ibs / 1) * 100}%`,
                        backgroundColor: ibsStatus.status === 'danger' ? '#EF4444' :
                          ibsStatus.status === 'warning' ? '#F97316' : '#22C55E'
                      }}
                    />
                  </div>
                  <span className="font-mono text-sm w-10">{asset.ibs.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
