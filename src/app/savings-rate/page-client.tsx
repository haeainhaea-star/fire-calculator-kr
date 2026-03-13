'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'
import SavingsRateChart from '@/components/savings-rate/SavingsRateChart'
import IncomeExpenseSimulator from '@/components/savings-rate/IncomeExpenseSimulator'
import ComparisonCards from '@/components/savings-rate/ComparisonCards'
import { calcSavingsRate } from '@/lib/savings-rate-calculator'

export default function SavingsRatePageClient() {
  const [income, setIncome] = useState(350) // 월 세후 소득 (만원)
  const [expense, setExpense] = useState(200) // 월 생활비 (만원)
  const [sliderRate, setSliderRate] = useState(43) // 차트 슬라이더
  const tracked = useRef(false)

  const currentRate = calcSavingsRate(income, expense)

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true
      trackEvent('savings_rate_view')
    }
  }, [])

  // 시뮬레이터 값이 바뀔 때 차트 슬라이더도 동기화
  useEffect(() => {
    setSliderRate(currentRate)
  }, [currentRate])

  const handleSliderChange = (rate: number) => {
    setSliderRate(rate)
    trackEvent('savings_rate_change', { rate })
  }

  return (
    <div className="px-4 pt-4 space-y-6 animate-fade-in">
      {/* 타이틀 */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          저축률의 힘
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          저축률이 FIRE 달성 속도를 결정한다
        </p>
      </div>

      {/* 핵심 메시지 */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white text-center">
        <p className="text-sm opacity-80">저축률이 10% 올라갈 때마다</p>
        <p className="text-2xl font-bold mt-1">은퇴가 수년씩 빨라집니다</p>
        <p className="text-xs opacity-70 mt-2">
          연봉이 아닌 저축률이 FIRE의 핵심 변수
        </p>
      </div>

      {/* 슬라이더 + 차트 */}
      <div className="space-y-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-xs text-slate-500 mb-2 block">
            내 저축률 조절: <strong className="text-primary-600">{sliderRate}%</strong>
          </label>
          <input
            type="range"
            min={5}
            max={90}
            step={1}
            value={sliderRate}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>5%</span>
            <span>90%</span>
          </div>
        </div>

        <SavingsRateChart currentRate={sliderRate} />
      </div>

      {/* 소득/지출 시뮬레이터 */}
      <IncomeExpenseSimulator
        income={income}
        expense={expense}
        onIncomeChange={setIncome}
        onExpenseChange={setExpense}
      />

      {/* 비교 카드 */}
      <ComparisonCards currentRate={currentRate} />

      {/* CTA */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/"
          className="bg-primary-600 text-white rounded-xl py-4 font-semibold text-sm text-center hover:bg-primary-700 active:scale-[0.98] transition-all"
        >
          🔥 상세 FIRE 계산
        </Link>
        <Link
          href="/salary"
          className="bg-slate-100 text-slate-700 rounded-xl py-4 font-semibold text-sm text-center hover:bg-slate-200 active:scale-[0.98] transition-all"
        >
          💰 연봉 실수령액
        </Link>
      </div>
    </div>
  )
}
