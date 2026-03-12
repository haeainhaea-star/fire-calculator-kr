'use client'

import { useCalculator } from '@/store/useCalculator'
import { formatKoreanMoney, formatNumber } from '@/lib/calculator'
import AssetChart from './AssetChart'
import TaxComparison from './TaxComparison'

export default function ResultDashboard() {
  const { result, input, setStep, setShowFeedback } = useCalculator()

  if (!result) return null

  return (
    <div className="animate-fade-in space-y-5 px-4">
      {/* 면책 배너 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
        <p className="text-xs text-amber-700">⚠️ 투자 자문이 아닙니다 · 시장 상황에 따라 달라질 수 있습니다</p>
      </div>

      {/* 핵심 결과 카드 */}
      <div className="bg-gradient-to-br from-primary-600 to-blue-700 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-80">🔥 FIRE까지</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-4xl font-bold">{result.yearsToFire}</span>
          <span className="text-lg opacity-80">년</span>
        </div>
        <p className="text-sm opacity-70 mt-1">
          {input.age + result.yearsToFire}세에 달성 가능
        </p>

        <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-70">필요 자금</p>
            <p className="text-lg font-bold">{formatKoreanMoney(result.fireNumber)}원</p>
          </div>
          <div>
            <p className="text-xs opacity-70">달성 확률</p>
            <p className="text-lg font-bold">{result.successRate}%</p>
          </div>
        </div>
      </div>

      {/* 부가수입 효과 */}
      {input.sideIncome > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-3">🌱 부가수입 효과</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-xs text-green-600">단축 기간</p>
              <p className="text-xl font-bold text-green-700">{result.savedYears}년</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-xs text-green-600">자산 환산</p>
              <p className="text-xl font-bold text-green-700">{formatKoreanMoney(result.sideIncomeAssetEquivalent)}원</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            월 {input.sideIncome}만원 부가수입 = 은퇴 자산 {formatKoreanMoney(result.sideIncomeAssetEquivalent)}원 효과
          </p>
        </div>
      )}

      {/* 자산 추이 차트 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-4">📊 자산 추이 예측</h3>
        <AssetChart projections={result.projections} retireAge={input.targetRetireAge} />
      </div>

      {/* 광고 영역 (플레이스홀더) */}
      <div className="bg-slate-100 rounded-xl p-4 text-center">
        <p className="text-xs text-slate-400">📢 광고 영역</p>
      </div>

      {/* 세금 비교 (킬러 피처) */}
      <TaxComparison result={result} />

      {/* 건보료 비교 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-3">🏥 건보료 비교</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-xs text-red-500">배당소득</p>
            <p className="text-lg font-bold text-red-600">
              월 {formatNumber(result.dividendHealthInsurance)}만원
            </p>
            <p className="text-xs text-red-400">건보료 포함</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-green-500">자가배당</p>
            <p className="text-lg font-bold text-green-600">월 0만원</p>
            <p className="text-xs text-green-400">건보료 미포함 ✓</p>
          </div>
        </div>
        <div className="mt-3 bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-700 font-medium">
            💡 자가배당 시 연간 {formatKoreanMoney(result.healthInsuranceSaving)}원 건보료 절약!
          </p>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="space-y-3">
        <button
          onClick={() => setStep(1)}
          className="w-full bg-primary-600 text-white rounded-xl py-4 font-semibold text-base hover:bg-primary-700 active:scale-[0.98] transition-all"
        >
          🔄 다시 계산하기
        </button>
        <button
          onClick={() => setShowFeedback(true)}
          className="w-full bg-slate-100 text-slate-600 rounded-xl py-3 font-medium text-sm hover:bg-slate-200 transition-all"
        >
          💬 피드백 남기기
        </button>
      </div>
    </div>
  )
}
