'use client'

import { useCalculator } from '@/store/useCalculator'
import SliderInput from '@/components/SliderInput'
import { calcFireNumber, formatKoreanMoney } from '@/lib/calculator'

export default function Step2() {
  const { input, updateInput, setStep } = useCalculator()
  const fireNumber = calcFireNumber(input.monthlyExpense, input.withdrawalRate)

  return (
    <div className="animate-fade-in space-y-6 px-4">
      <div>
        <h2 className="text-lg font-bold text-slate-800">🎯 은퇴 목표</h2>
        <p className="text-sm text-slate-500 mt-1">은퇴 후 생활 목표를 설정하세요</p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-6">
        <SliderInput
          label="목표 은퇴 나이"
          value={input.targetRetireAge}
          min={30}
          max={65}
          unit="세"
          onChange={(v) => updateInput({ targetRetireAge: v })}
        />
        <SliderInput
          label="은퇴 후 월 생활비"
          value={input.monthlyExpense}
          min={100}
          max={1000}
          step={10}
          unit="만원"
          onChange={(v) => updateInput({ monthlyExpense: v })}
          description="주거비·보험·여가 등 포함"
        />
      </div>

      {/* FIRE 넘버 미리보기 */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-5 text-white">
        <p className="text-sm opacity-80">필요 FIRE 자금 (예상)</p>
        <p className="text-3xl font-bold mt-1">{formatKoreanMoney(fireNumber)}원</p>
        <p className="text-xs opacity-70 mt-2">
          월 {input.monthlyExpense}만원 × 12개월 ÷ {input.withdrawalRate}% 인출률
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(1)}
          className="flex-1 bg-slate-100 text-slate-600 rounded-xl py-4 font-semibold text-base hover:bg-slate-200 transition-all"
        >
          ← 이전
        </button>
        <button
          onClick={() => setStep(3)}
          className="flex-[2] bg-primary-600 text-white rounded-xl py-4 font-semibold text-base hover:bg-primary-700 active:scale-[0.98] transition-all"
        >
          다음: 투자 전략 →
        </button>
      </div>
    </div>
  )
}
