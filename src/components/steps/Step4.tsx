'use client'

import { useState } from 'react'
import { useCalculator } from '@/store/useCalculator'
import SliderInput from '@/components/SliderInput'
import { calcSideIncomeAssetValue, formatKoreanMoney } from '@/lib/calculator'
import { trackEvent } from '@/lib/analytics'

export default function Step4() {
  const { input, updateInput, setStep, runCalculation } = useCalculator()
  const [showPension, setShowPension] = useState(input.monthlyPension > 0)

  const sideAssetValue = calcSideIncomeAssetValue(input.sideIncome, input.withdrawalRate)

  const handleCalculate = () => {
    trackEvent('calculation_done', {
      strategy: input.withdrawalStrategy,
      side_income: input.sideIncome,
      has_pension: input.monthlyPension > 0,
    })
    runCalculation()
    setStep(5) // 5 = 결과 화면
  }

  return (
    <div className="animate-fade-in space-y-6 px-4">
      <div>
        <h2 className="text-lg font-bold text-slate-800">⚡ 부가수입 & 옵션</h2>
        <p className="text-sm text-slate-500 mt-1">은퇴 후 부가수입과 연금을 입력하세요</p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-6">
        <SliderInput
          label="은퇴 후 부가수입"
          value={input.sideIncome}
          min={0}
          max={500}
          step={10}
          unit="만원/월"
          onChange={(v) => updateInput({ sideIncome: v })}
          description="블로그·유튜브·프리랜서·강의 등"
        />
        {input.sideIncome > 0 && (
          <SliderInput
            label="부가수입 지속 기간"
            value={input.sideIncomeYears}
            min={1}
            max={30}
            unit="년"
            onChange={(v) => updateInput({ sideIncomeYears: v })}
          />
        )}
      </div>

      {/* 부가수입 효과 미리보기 */}
      {input.sideIncome > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-medium text-green-700">🌱 부가수입 효과</p>
          <p className="text-xs text-green-600 mt-1">
            월 {input.sideIncome}만원 = 자산 {formatKoreanMoney(sideAssetValue)}원과 동일한 효과!
          </p>
        </div>
      )}

      {/* 국민연금 (접을 수 있는 영역) */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <button
          onClick={() => setShowPension(!showPension)}
          className={`w-full flex items-center justify-between p-5 text-left transition-all ${
            showPension ? 'border-b border-slate-100' : 'border-2 border-dashed border-slate-200 rounded-2xl'
          }`}
        >
          <div>
            <p className="text-sm font-medium text-slate-700">🏛️ 국민연금 (선택)</p>
            <p className="text-xs text-slate-400">입력하면 더 정확한 결과를 얻을 수 있어요</p>
          </div>
          <span className="text-slate-400 text-lg">{showPension ? '−' : '+'}</span>
        </button>
        {showPension && (
          <div className="p-5 space-y-6 animate-fade-in">
            <SliderInput
              label="연금 수령 시작 나이"
              value={input.pensionStartAge}
              min={60}
              max={70}
              unit="세"
              onChange={(v) => updateInput({ pensionStartAge: v })}
              description="늦출수록 수령액 증가"
            />
            <SliderInput
              label="예상 월 연금액"
              value={input.monthlyPension}
              min={0}
              max={200}
              step={5}
              unit="만원"
              onChange={(v) => updateInput({ monthlyPension: v })}
              description="국민연금공단에서 예상액 확인 가능"
            />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(3)}
          className="flex-1 bg-slate-100 text-slate-600 rounded-xl py-4 font-semibold text-base hover:bg-slate-200 transition-all"
        >
          ← 이전
        </button>
        <button
          onClick={handleCalculate}
          className="flex-[2] bg-gradient-to-r from-primary-600 to-blue-700 text-white rounded-xl py-4 font-bold text-base hover:from-primary-700 hover:to-blue-800 active:scale-[0.98] transition-all shadow-lg shadow-primary-200"
        >
          🔥 결과 보기
        </button>
      </div>
    </div>
  )
}
