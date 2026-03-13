'use client'

import Link from 'next/link'
import { savingsRateArchetypes } from '@/lib/savings-rate-calculator'

interface ComparisonCardsProps {
  currentRate?: number
}

export default function ComparisonCards({ currentRate }: ComparisonCardsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-slate-700 px-1">
        저축률별 은퇴 비교
      </h2>

      <div className="grid gap-3">
        {savingsRateArchetypes.map((arch) => {
          const isCurrentRange =
            currentRate !== undefined &&
            Math.abs(currentRate - arch.rate) <= 10

          return (
            <div
              key={arch.rate}
              className={`rounded-2xl p-5 transition-all ${arch.bgColor} ${
                isCurrentRange ? 'ring-2 ring-primary-400 scale-[1.01]' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{arch.emoji}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-700">
                      저축률 {arch.rate}%
                    </p>
                    <p className="text-xs text-slate-500">{arch.label}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-800">
                    {arch.years}년
                  </p>
                  <p className="text-xs text-slate-500">
                    {arch.startAge}세 &rarr; {arch.fireAge}세
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600">{arch.message}</p>

              {/* 프로그레스 바 */}
              <div className="mt-3 h-2 bg-white/80 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${arch.color}`}
                  style={{ width: `${Math.min(100, (50 / arch.years) * 100)}%` }}
                />
              </div>

              <Link
                href="/"
                className="block mt-3 text-center text-xs text-primary-600 font-medium hover:text-primary-700"
              >
                이 시나리오로 상세 계산하기 &rarr;
              </Link>
            </div>
          )
        })}
      </div>

      {/* 30% vs 60% 직접 비교 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-3 text-center">
          저축률 30% vs 60% 비교
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-500">저축률 30%</p>
            <p className="text-3xl font-bold text-slate-700 mt-1">28년</p>
            <p className="text-xs text-slate-400 mt-1">30세 &rarr; 58세</p>
          </div>
          <div className="text-center p-3 bg-primary-50 rounded-xl">
            <p className="text-xs text-primary-600">저축률 60%</p>
            <p className="text-3xl font-bold text-primary-700 mt-1">12년</p>
            <p className="text-xs text-primary-500 mt-1">30세 &rarr; 42세</p>
          </div>
        </div>
        <p className="text-center text-sm font-bold text-orange-600 mt-3">
          🔥 16년 차이!
        </p>
      </div>
    </div>
  )
}
