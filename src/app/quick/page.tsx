'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SliderInput from '@/components/SliderInput'
import { calcFireNumber, calcYearsToFire, calcSideIncomeAssetValue, formatKoreanMoney, type CalculatorInput } from '@/lib/calculator'

const defaultQuickInput = {
  monthlyExpense: 250,
  monthlySaving: 150,
  currentAssets: 5000,
  age: 30,
  sideIncome: 0,
}

export default function QuickCalculator() {
  const [input, setInput] = useState(defaultQuickInput)
  const update = (partial: Partial<typeof input>) => setInput({ ...input, ...partial })

  const withdrawalRate = 3.5
  const fireNumber = calcFireNumber(input.monthlyExpense, withdrawalRate)

  const fullInput: CalculatorInput = {
    ...input,
    monthlyIncome: input.monthlySaving * 2,
    targetRetireAge: 100,
    expectedReturn: 7,
    inflationRate: 3,
    withdrawalRate,
    sideIncomeYears: 10,
    pensionStartAge: 65,
    monthlyPension: 0,
    withdrawalStrategy: 'selfDividend',
  }

  const yearsToFire = calcYearsToFire(fullInput)
  const fireAge = input.age + yearsToFire
  const sideAssetValue = input.sideIncome > 0
    ? calcSideIncomeAssetValue(input.sideIncome, withdrawalRate)
    : 0

  return (
    <main className="pb-8">
      <Header />

      <div className="px-4 pt-6 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-slate-800">⚡ 30초 간편 계산</h1>
          <p className="text-sm text-slate-500 mt-1">핵심 3가지만 입력하면 바로 결과!</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-6">
          <SliderInput
            label="현재 나이"
            value={input.age}
            min={20}
            max={60}
            unit="세"
            onChange={(v) => update({ age: v })}
          />
          <SliderInput
            label="은퇴 후 월 생활비"
            value={input.monthlyExpense}
            min={100}
            max={1000}
            step={10}
            unit="만원"
            onChange={(v) => update({ monthlyExpense: v })}
          />
          <SliderInput
            label="월 저축/투자액"
            value={input.monthlySaving}
            min={0}
            max={1000}
            step={10}
            unit="만원"
            onChange={(v) => update({ monthlySaving: v })}
          />
          <SliderInput
            label="현재 총 자산"
            value={input.currentAssets}
            min={0}
            max={100000}
            step={100}
            unit="만원"
            onChange={(v) => update({ currentAssets: v })}
          />
        </div>

        {/* 즉시 결과 */}
        <div className="bg-gradient-to-br from-primary-600 to-blue-700 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-80">🔥 FIRE까지</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-5xl font-bold">{yearsToFire > 50 ? '50+' : yearsToFire}</span>
            <span className="text-lg opacity-80">년</span>
          </div>
          <p className="text-sm opacity-70 mt-1">
            {fireAge > 100 ? '100세 이후' : `${fireAge}세`}에 달성 가능
          </p>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-80">필요 자금</span>
              <span className="text-lg font-bold">{formatKoreanMoney(fireNumber)}원</span>
            </div>
          </div>
        </div>

        {/* 부가수입 보너스 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-700">🌱 부가수입이 있다면?</h3>
          <SliderInput
            label="은퇴 후 부가수입"
            value={input.sideIncome}
            min={0}
            max={500}
            step={10}
            unit="만원/월"
            onChange={(v) => update({ sideIncome: v })}
          />
          {input.sideIncome > 0 && (
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-sm text-green-700 font-medium">
                월 {input.sideIncome}만원 = 자산 {formatKoreanMoney(sideAssetValue)}원 효과!
              </p>
            </div>
          )}
        </div>

        {/* 상세 분석 CTA */}
        <a
          href="/"
          className="block w-full bg-primary-600 text-white rounded-xl py-4 font-semibold text-base text-center hover:bg-primary-700 active:scale-[0.98] transition-all"
        >
          🔍 세금·건보료까지 상세 분석 →
        </a>
      </div>

      <Footer />
    </main>
  )
}
