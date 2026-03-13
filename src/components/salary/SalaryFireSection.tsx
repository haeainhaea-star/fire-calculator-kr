'use client'

import Link from 'next/link'
import SliderInput from '@/components/SliderInput'
import { quickFireYears, calculateSalaryDeductions } from '@/lib/salary-calculator'
import { formatNumber } from '@/lib/calculator'

interface SalaryFireSectionProps {
  salary: number
  monthlyExpense: number
  age: number
  onSalaryChange: (v: number) => void
  onExpenseChange: (v: number) => void
  onAgeChange: (v: number) => void
}

export default function SalaryFireSection({
  salary,
  monthlyExpense,
  age,
  onSalaryChange,
  onExpenseChange,
  onAgeChange,
}: SalaryFireSectionProps) {
  const deductions = calculateSalaryDeductions(salary)
  const result = quickFireYears(deductions.netMonthly, monthlyExpense, age)

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-5">
      <div>
        <h2 className="text-sm font-bold text-slate-700">
          내 연봉으로 FIRE 가능할까?
        </h2>
        <p className="text-xs text-slate-500 mt-1">25배 룰(4% 인출률) 기준 간편 시뮬레이션</p>
      </div>

      <div className="space-y-4">
        <SliderInput
          label="연봉"
          value={salary}
          min={2400}
          max={12000}
          step={100}
          unit="만원"
          onChange={onSalaryChange}
        />
        <SliderInput
          label="현재 나이"
          value={age}
          min={20}
          max={60}
          unit="세"
          onChange={onAgeChange}
        />
        <SliderInput
          label="월 생활비"
          value={monthlyExpense}
          min={100}
          max={700}
          step={10}
          unit="만원"
          onChange={onExpenseChange}
        />
      </div>

      {/* 실수령 요약 */}
      <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-2 gap-3 text-center">
        <div>
          <p className="text-xs text-slate-500">월 실수령</p>
          <p className="text-lg font-bold text-slate-700">
            {formatNumber(deductions.netMonthly)}만원
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">실효세율</p>
          <p className="text-lg font-bold text-slate-700">{deductions.effectiveTaxRate}%</p>
        </div>
      </div>

      {/* FIRE 결과 */}
      <div className="bg-gradient-to-br from-primary-600 to-blue-700 rounded-xl p-5 text-white">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs opacity-70">월 저축 가능</p>
            <p className="text-xl font-bold">
              {result.monthlySaving > 0 ? `${formatNumber(result.monthlySaving)}만` : '-'}
            </p>
          </div>
          <div>
            <p className="text-xs opacity-70">저축률</p>
            <p className="text-xl font-bold">{result.savingsRate}%</p>
          </div>
          <div>
            <p className="text-xs opacity-70">FIRE 달성</p>
            <p className="text-xl font-bold">
              {result.yearsToFire >= 50 ? '50+년' : `${result.yearsToFire}년`}
            </p>
          </div>
        </div>
        {result.yearsToFire < 50 && (
          <p className="text-sm opacity-80 text-center mt-3">
            {result.fireAge}세에 FIRE 달성 가능!
          </p>
        )}
      </div>

      {/* CTA */}
      <Link
        href="/"
        className="block w-full bg-primary-600 text-white rounded-xl py-4 font-semibold text-sm text-center hover:bg-primary-700 active:scale-[0.98] transition-all"
      >
        🔥 상세 FIRE 시뮬레이션 하러가기 &rarr;
      </Link>
    </div>
  )
}
