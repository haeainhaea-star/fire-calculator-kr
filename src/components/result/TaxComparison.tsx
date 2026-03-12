'use client'

import { type CalculatorResult, formatNumber, formatKoreanMoney } from '@/lib/calculator'

interface TaxComparisonProps {
  result: CalculatorResult
}

export default function TaxComparison({ result }: TaxComparisonProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-700 mb-3">
        💰 배당소득 vs 자가배당 세금 비교
      </h3>

      {/* 용어 설명 */}
      <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5">
        <p className="text-xs text-slate-600">
          <strong className="text-red-500">배당소득</strong> — 배당 ETF/주식에서 배당금을 받는 방식 (배당소득세 15.4% + 건보료)
        </p>
        <p className="text-xs text-slate-600">
          <strong className="text-green-600">자가배당</strong> — 해외 성장 ETF를 필요한 만큼 매도하는 방식 (양도세 22%, 250만 공제, 건보료 없음)
        </p>
      </div>

      {/* 비교 테이블 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 배당소득 */}
        <div className="bg-red-50 rounded-xl p-4 space-y-3">
          <div className="text-center">
            <p className="text-sm font-bold text-red-600">🔴 배당소득</p>
            <p className="text-[10px] text-red-400 mt-0.5">배당 ETF/주식</p>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">소득세</span>
              <span className="font-medium text-slate-700">{formatNumber(result.dividendTax.incomeTax)}만</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">지방세</span>
              <span className="font-medium text-slate-700">{formatNumber(result.dividendTax.localTax)}만</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">건보료</span>
              <span className="font-medium text-red-600">{formatNumber(result.dividendTax.healthInsurance)}만</span>
            </div>
            <div className="border-t border-red-200 pt-2 flex justify-between">
              <span className="font-bold text-slate-700">합계</span>
              <span className="font-bold text-red-600">{formatNumber(result.dividendTax.totalTax)}만</span>
            </div>
            <div className="text-center">
              <span className="text-red-500 font-bold text-base">{result.dividendTax.effectiveRate}%</span>
            </div>
          </div>
        </div>

        {/* 자가배당 */}
        <div className="bg-green-50 rounded-xl p-4 space-y-3">
          <div className="text-center">
            <p className="text-sm font-bold text-green-600">🟢 자가배당</p>
            <p className="text-[10px] text-green-500 mt-0.5">해외 ETF 매도</p>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">양도세</span>
              <span className="font-medium text-slate-700">{formatNumber(result.selfDividendTax.incomeTax)}만</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">지방세</span>
              <span className="font-medium text-slate-700">{formatNumber(result.selfDividendTax.localTax)}만</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">건보료</span>
              <span className="font-medium text-green-600">0만 ✓</span>
            </div>
            <div className="border-t border-green-200 pt-2 flex justify-between">
              <span className="font-bold text-slate-700">합계</span>
              <span className="font-bold text-green-600">{formatNumber(result.selfDividendTax.totalTax)}만</span>
            </div>
            <div className="text-center">
              <span className="text-green-500 font-bold text-base">{result.selfDividendTax.effectiveRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 절세 효과 */}
      {result.taxSavingPerYear > 0 && (
        <div className="mt-4 bg-blue-50 rounded-xl p-4">
          <p className="text-sm font-bold text-blue-700 text-center">
            자가배당 시 연간 {formatKoreanMoney(result.taxSavingPerYear)}원 절세!
          </p>
          <p className="text-xs text-blue-500 text-center mt-1">
            20년간 {formatKoreanMoney(result.taxSavingPerYear * 20)}원 차이
          </p>
        </div>
      )}
    </div>
  )
}
