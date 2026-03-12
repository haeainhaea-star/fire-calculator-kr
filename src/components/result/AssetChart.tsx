'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { type YearlyProjection, formatKoreanMoney } from '@/lib/calculator'

interface AssetChartProps {
  projections: YearlyProjection[]
  retireAge: number
}

export default function AssetChart({ projections, retireAge }: AssetChartProps) {
  const data = projections.map((p) => ({
    name: `${p.age}세`,
    age: p.age,
    자산: Math.round(p.assets / 10000 * 100) / 100, // 억원 단위
  }))

  const retireIndex = projections.findIndex((p) => p.age === retireAge)

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="colorAsset" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}억`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: '12px',
            }}
            formatter={(value: number) => [`${value.toFixed(1)}억원`, '총 자산']}
          />
          {retireIndex >= 0 && (
            <ReferenceLine
              x={`${retireAge}세`}
              stroke="#ef4444"
              strokeDasharray="4 4"
              label={{
                value: '은퇴',
                position: 'top',
                fill: '#ef4444',
                fontSize: 11,
              }}
            />
          )}
          <Area
            type="monotone"
            dataKey="자산"
            stroke="#2563eb"
            strokeWidth={2}
            fill="url(#colorAsset)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
