'use client'

import { useCalculator } from '@/store/useCalculator'
import SliderInput from '@/components/SliderInput'

export default function Step3() {
  const { input, updateInput, setStep } = useCalculator()

  return (
    <div className="animate-fade-in space-y-6 px-4">
      <div>
        <h2 className="text-lg font-bold text-slate-800">📈 투자 전략</h2>
        <p className="text-sm text-slate-500 mt-1">수익률과 인출 전략을 설정하세요</p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-6">
        <SliderInput
          label="연간 기대수익률"
          value={input.expectedReturn}
          min={3}
          max={15}
          step={0.5}
          unit="%"
          onChange={(v) => updateInput({ expectedReturn: v })}
          description="S&P500 장기 평균: 약 7~10%"
        />
        <SliderInput
          label="물가상승률"
          value={input.inflationRate}
          min={1}
          max={6}
          step={0.5}
          unit="%"
          onChange={(v) => updateInput({ inflationRate: v })}
          description="한국 장기 평균: 약 2~3%"
        />
        <SliderInput
          label="안전 인출률 (SWR)"
          value={input.withdrawalRate}
          min={2}
          max={5}
          step={0.1}
          unit="%"
          onChange={(v) => updateInput({ withdrawalRate: v })}
          description="보수적: 3% · 보통: 3.5% · 적극적: 4%"
        />
      </div>

      {/* 인출 전략 선택 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-700">💡 인출 전략</h3>
        {[
          { key: 'selfDividend' as const, label: '🟢 자가배당 (ETF 매도)', desc: '세율 ~7.9% · 건보료 미포함', recommended: true },
          { key: 'dividend' as const, label: '🔴 배당소득', desc: '세율 15.4% · 건보료 포함' },
          { key: 'mixed' as const, label: '🟡 혼합 전략', desc: '배당 + ETF 매도 병행' },
        ].map((opt) => (
          <button
            key={opt.key}
            onClick={() => updateInput({ withdrawalStrategy: opt.key })}
            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left ${
              input.withdrawalStrategy === opt.key
                ? 'border-primary-500 bg-primary-50'
                : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <div>
              <p className="text-sm font-medium text-slate-700">{opt.label}</p>
              <p className="text-xs text-slate-500">{opt.desc}</p>
            </div>
            {opt.recommended && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">추천</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(2)}
          className="flex-1 bg-slate-100 text-slate-600 rounded-xl py-4 font-semibold text-base hover:bg-slate-200 transition-all"
        >
          ← 이전
        </button>
        <button
          onClick={() => setStep(4)}
          className="flex-[2] bg-primary-600 text-white rounded-xl py-4 font-semibold text-base hover:bg-primary-700 active:scale-[0.98] transition-all"
        >
          다음: 부가 옵션 →
        </button>
      </div>
    </div>
  )
}
