'use client'

import SliderInput from '@/components/SliderInput'
import { calcSavingsRate, yearsToFireBySavingsRate } from '@/lib/savings-rate-calculator'
import { formatNumber } from '@/lib/calculator'

interface IncomeExpenseSimulatorProps {
  income: number
  expense: number
  onIncomeChange: (v: number) => void
  onExpenseChange: (v: number) => void
}

export default function IncomeExpenseSimulator({
  income,
  expense,
  onIncomeChange,
  onExpenseChange,
}: IncomeExpenseSimulatorProps) {
  const savingsRate = calcSavingsRate(income, expense)
  const monthlySaving = Math.max(0, income - expense)
  const years = yearsToFireBySavingsRate(savingsRate / 100)

  // "10% 줄이면?" 비교
  const reducedExpense = Math.round(expense * 0.9)
  const reducedRate = calcSavingsRate(income, reducedExpense)
  const reducedYears = yearsToFireBySavingsRate(reducedRate / 100)
  const savedYears = years - reducedYears

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-5">
      <div>
        <h2 className="text-sm font-bold text-slate-700">
          나의 저축률 시뮬레이터
        </h2>
        <p className="text-xs text-slate-500 mt-1">소득과 지출을 입력하면 저축률과 FIRE 연수를 계산합니다</p>
      </div>

      <div className="space-y-4">
        <SliderInput
          label="월 소득 (세후)"
          value={income}
          min={100}
          max={1500}
          step={10}
          unit="만원"
          onChange={onIncomeChange}
        />
        <SliderInput
          label="월 생활비"
          value={expense}
          min={50}
          max={1000}
          step={10}
          unit="만원"
          onChange={onExpenseChange}
        />
      </div>

      {/* 결과 카드 */}
      <div className="bg-gradient-to-br from-primary-600 to-blue-700 rounded-xl p-5 text-white">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs opacity-70">저축률</p>
            <p className="text-2xl font-bold">{savingsRate}%</p>
          </div>
          <div>
            <p className="text-xs opacity-70">월 저축</p>
            <p className="text-2xl font-bold">{formatNumber(monthlySaving)}</p>
            <p className="text-xs opacity-60">만원</p>
          </div>
          <div>
            <p className="text-xs opacity-70">FIRE까지</p>
            <p className="text-2xl font-bold">{years >= 50 ? '50+' : years}</p>
            <p className="text-xs opacity-60">년</p>
          </div>
        </div>
      </div>

      {/* 생활비 10% 줄이면? */}
      {savedYears > 0 && expense > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-bold text-green-700 mb-2">
            💡 생활비를 10% 줄이면?
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-xs text-slate-500">현재</p>
              <p className="text-sm font-bold text-slate-700">
                저축률 {savingsRate}% &middot; {years >= 50 ? '50+' : years}년
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-green-600">생활비 {formatNumber(reducedExpense)}만원으로</p>
              <p className="text-sm font-bold text-green-700">
                저축률 {reducedRate}% &middot; {reducedYears >= 50 ? '50+' : reducedYears}년
              </p>
            </div>
          </div>
          <p className="text-center text-sm font-bold text-green-800 mt-3">
            🎉 {savedYears}년 단축!
          </p>
        </div>
      )}
    </div>
  )
}
