'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ReferenceDot,
} from 'recharts'
import { generateSavingsRateData } from '@/lib/savings-rate-calculator'

interface SavingsRateChartProps {
  currentRate: number // 현재 저축률 (%)
  realReturn?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const { rate, years } = payload[0].payload
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-3 text-xs">
      <p className="font-bold text-slate-700">저축률 {rate}%</p>
      <p className="text-primary-600 mt-1">FIRE까지 {years}년</p>
    </div>
  )
}

export default function SavingsRateChart({ currentRate, realReturn = 0.05 }: SavingsRateChartProps) {
  const data = generateSavingsRateData(realReturn)

  // 현재 저축률에 해당하는 연수 보간
  const currentYears = (() => {
    const lower = data.findLast((d) => d.rate <= currentRate)
    const upper = data.find((d) => d.rate >= currentRate)
    if (!lower || !upper || lower.rate === upper.rate) return lower?.years ?? upper?.years ?? 0
    const ratio = (currentRate - lower.rate) / (upper.rate - lower.rate)
    return Math.round(lower.years + (upper.years - lower.years) * ratio)
  })()

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm font-bold text-slate-700 mb-1">
        저축률 vs FIRE 달성 연수
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        연 {(realReturn * 100).toFixed(0)}% 실질수익률, 자산 0 시작, 4% 룰 기준
      </p>

      {/* 현재 저축률 하이라이트 */}
      <div className="bg-primary-50 rounded-xl p-3 mb-4 text-center">
        <p className="text-xs text-primary-600">
          현재 저축률 <strong className="text-lg">{currentRate}%</strong> &rarr; FIRE까지{' '}
          <strong className="text-lg text-primary-700">{currentYears}년</strong>
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="rate"
              tick={{ fontSize: 11 }}
              label={{ value: '저축률 %', position: 'insideBottomRight', offset: -5, fontSize: 11 }}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              label={{ value: '년', position: 'insideTopLeft', offset: -5, fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="years"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#2563eb' }}
            />
            {/* 현재 저축률 세로선 */}
            <ReferenceLine
              x={currentRate}
              stroke="#2563eb"
              strokeDasharray="4 4"
              strokeWidth={2}
            />
            <ReferenceDot
              x={currentRate}
              y={currentYears}
              r={6}
              fill="#2563eb"
              stroke="#fff"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
