'use client'

import { useCalculator } from '@/store/useCalculator'
import SliderInput from '@/components/SliderInput'
import { trackEvent } from '@/lib/analytics'

export default function Step1() {
  const { input, updateInput, setStep } = useCalculator()

  return (
    <div className="animate-fade-in space-y-6 px-4">
      <div>
        <h2 className="text-lg font-bold text-slate-800">📋 기본 정보</h2>
        <p className="text-sm text-slate-500 mt-1">현재 재무 상황을 입력해주세요</p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-6">
        <SliderInput
          label="현재 나이"
          value={input.age}
          min={20}
          max={60}
          unit="세"
          onChange={(v) => updateInput({ age: v })}
        />
        <SliderInput
          label="월 소득 (세후)"
          value={input.monthlyIncome}
          min={100}
          max={2000}
          step={10}
          unit="만원"
          onChange={(v) => updateInput({ monthlyIncome: v })}
          description="실수령액 기준"
        />
        <SliderInput
          label="월 저축/투자액"
          value={input.monthlySaving}
          min={0}
          max={1000}
          step={10}
          unit="만원"
          onChange={(v) => updateInput({ monthlySaving: v })}
        />
        <SliderInput
          label="현재 총 자산"
          value={input.currentAssets}
          min={0}
          max={100000}
          step={100}
          unit="만원"
          onChange={(v) => updateInput({ currentAssets: v })}
          description="투자 자산 + 예적금 합계"
        />
      </div>

      {/* 저축률 표시 */}
      <div className="bg-primary-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-primary-700">💰 저축률</span>
          <span className="text-lg font-bold text-primary-600">
            {input.monthlyIncome > 0
              ? Math.round((input.monthlySaving / input.monthlyIncome) * 100)
              : 0}%
          </span>
        </div>
        <p className="text-xs text-primary-500 mt-1">
          FIRE 달성에는 50% 이상 저축률이 이상적입니다
        </p>
      </div>

      <button
        onClick={() => {
          trackEvent('step_complete', { step: 1, step_name: 'basic_info' })
          setStep(2)
        }}
        className="w-full bg-primary-600 text-white rounded-xl py-4 font-semibold text-base hover:bg-primary-700 active:scale-[0.98] transition-all"
      >
        다음: 은퇴 목표 →
      </button>
    </div>
  )
}
