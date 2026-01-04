import { motion } from 'framer-motion';
import { TrendData } from '@/lib/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface TrendChartProps {
  data: TrendData[];
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4"
    >
      {/* 标题 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold text-primary">趋势追踪</span>
          <span className="text-xs text-muted-foreground">TREND ANALYSIS</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-[#38BDF8]" />
            <span className="text-muted-foreground">泡沫压力</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-[#22C55E]" />
            <span className="text-muted-foreground">RHI</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-[#F97316]" />
            <span className="text-muted-foreground">IBS</span>
          </div>
        </div>
      </div>

      {/* 图表 */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="bubblePressureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(56, 189, 248, 0.1)" 
              vertical={false}
            />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 11 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 11 }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 40, 71, 0.95)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)'
              }}
              labelStyle={{ color: '#38BDF8', fontWeight: 600 }}
              itemStyle={{ color: '#E2E8F0' }}
            />
            <Area
              type="monotone"
              dataKey="bubblePressure"
              stroke="#38BDF8"
              strokeWidth={2}
              fill="url(#bubblePressureGradient)"
              name="泡沫压力"
            />
            <Line
              type="monotone"
              dataKey="rhi"
              stroke="#22C55E"
              strokeWidth={2}
              dot={false}
              name="RHI (x30)"
              // 将RHI放大30倍以便在同一图表中显示
            />
            <Line
              type="monotone"
              dataKey="ibs"
              stroke="#F97316"
              strokeWidth={2}
              dot={false}
              name="IBS (x100)"
              // 将IBS放大100倍以便在同一图表中显示
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 底部统计 */}
      <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border/30">
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">7日均值</div>
          <div className="font-mono text-lg text-primary">{(data.reduce((a, b) => a + b.bubblePressure, 0) / data.length).toFixed(1)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">最高</div>
          <div className="font-mono text-lg text-orange-400">{Math.max(...data.map(d => d.bubblePressure))}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">最低</div>
          <div className="font-mono text-lg text-green-400">{Math.min(...data.map(d => d.bubblePressure))}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">趋势</div>
          <div className="font-mono text-lg text-yellow-400">↗ 上升</div>
        </div>
      </div>
    </motion.div>
  );
}
