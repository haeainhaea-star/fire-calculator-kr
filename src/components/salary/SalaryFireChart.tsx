'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import { quickFireYears, calculateSalaryDeductions } from '@/lib/salary-calculator'

const salaryLevels = [3000, 4000, 5000, 6000, 7000, 8000, 10000]
const savingsRates = [30, 50, 70]

function getColor(years: number): string {
  if (years <= 15) return '#16a34a' // green
  if (years <= 25) return '#eab308' // yellow
  return '#dc2626' // red
}

interface ChartDataItem {
  salary: string
  rate30: number
  rate50: number
  rate70: number
}

function generateChartData(): ChartDataItem[] {
  return salaryLevels.map((salary) => {
    const ded = calculateSalaryDeductions(salary)
    const netMonthly = ded.netMonthly

    const results: Record<string, number> = {}
    savingsRates.forEach((rate) => {
      const expense = Math.round(netMonthly * (1 - rate / 100))
      const { yearsToFire } = quickFireYears(netMonthly, expense, 30)
      results[`rate${rate}`] = Math.min(yearsToFire, 50)
    })

    return {
      salary: salary >= 10000 ? `${salary / 10000}억` : `${salary / 1000}천만`,
      rate30: results.rate30,
      rate50: results.rate50,
      rate70: results.rate70,
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-3 text-xs">
      <p className="font-bold text-slate-700 mb-1">연봉 {label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.fill }}>
          저축률 {p.dataKey === 'rate30' ? '30%' : p.dataKey === 'rate50' ? '50%' : '70%'}
          : {p.value >= 50 ? '50+' : p.value}년
        </p>
      ))}
    </div>
  )
}

export default function SalaryFireChart() {
  const data = generateChartData()

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm font-bold text-slate-700 mb-1">
        연봉별 FIRE 달성 비교
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        30세 시작, 자산 0원, 연 5% 실질수익률 기준
      </p>

      {/* 범례 */}
      <div className="flex gap-4 mb-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-300" />
          <span className="text-slate-500">저축률 30%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-slate-500">저축률 50%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-700" />
          <span className="text-slate-500">저축률 70%</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="salary" tick={{ fontSize: 11 }} />
            <YAxis
              tick={{ fontSize: 11 }}
              label={{ value: '년', position: 'insideTopLeft', offset: -5, fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rate30" fill="#93c5fd" radius={[2, 2, 0, 0]} />
            <Bar dataKey="rate50" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="rate70" fill="#1d4ed8" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
