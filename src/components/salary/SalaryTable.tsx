'use client'

import { type SalaryDeduction } from '@/lib/salary-calculator'
import { formatNumber } from '@/lib/calculator'

interface SalaryTableProps {
  data: SalaryDeduction[]
  selectedSalary?: number
  onSelectSalary?: (salary: number) => void
}

export default function SalaryTable({ data, selectedSalary, onSelectSalary }: SalaryTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h2 className="text-sm font-bold text-slate-700">
          2026년 연봉별 실수령액 상세
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          행을 클릭하면 FIRE 시뮬레이션에 자동 입력됩니다
        </p>
      </div>

      {/* 모바일: 카드 뷰 */}
      <div className="md:hidden divide-y divide-slate-100">
        {data.map((row) => (
          <button
            key={row.grossAnnual}
            onClick={() => onSelectSalary?.(row.grossAnnual)}
            className={`w-full px-5 py-4 text-left transition-colors ${
              selectedSalary === row.grossAnnual ? 'bg-primary-50' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-800">
                연봉 {formatNumber(row.grossAnnual)}만원
              </span>
              <span className="text-sm font-bold text-primary-600">
                월 {formatNumber(row.netMonthly)}만원
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
              <div>국민연금 {formatNumber(row.nationalPension)}</div>
              <div>건강보험 {formatNumber(row.healthInsurance)}</div>
              <div>소득세 {formatNumber(row.incomeTax)}</div>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              공제 합계 {formatNumber(row.totalDeduction)}만원 · 실효세율 {row.effectiveTaxRate}%
            </div>
          </button>
        ))}
      </div>

      {/* 데스크톱: 테이블 뷰 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[640px] text-xs">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left text-slate-500 font-medium">연봉</th>
              <th className="px-3 py-2 text-right text-slate-500 font-medium">국민연금</th>
              <th className="px-3 py-2 text-right text-slate-500 font-medium">건강보험</th>
              <th className="px-3 py-2 text-right text-slate-500 font-medium">고용보험</th>
              <th className="px-3 py-2 text-right text-slate-500 font-medium">소득세</th>
              <th className="px-3 py-2 text-right text-slate-500 font-medium">공제 합계</th>
              <th className="px-3 py-2 text-right text-primary-600 font-bold">실수령</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) => (
              <tr
                key={row.grossAnnual}
                onClick={() => onSelectSalary?.(row.grossAnnual)}
                className={`cursor-pointer transition-colors ${
                  selectedSalary === row.grossAnnual
                    ? 'bg-primary-50'
                    : 'hover:bg-slate-50'
                }`}
              >
                <td className="px-3 py-2.5 font-semibold text-slate-700">
                  {formatNumber(row.grossAnnual)}만
                </td>
                <td className="px-3 py-2.5 text-right text-slate-600">
                  {formatNumber(row.nationalPension)}
                </td>
                <td className="px-3 py-2.5 text-right text-slate-600">
                  {formatNumber(row.healthInsurance)}
                </td>
                <td className="px-3 py-2.5 text-right text-slate-600">
                  {formatNumber(row.employmentInsurance)}
                </td>
                <td className="px-3 py-2.5 text-right text-slate-600">
                  {formatNumber(row.incomeTax)}
                </td>
                <td className="px-3 py-2.5 text-right text-red-500">
                  {formatNumber(row.totalDeduction)}
                </td>
                <td className="px-3 py-2.5 text-right font-bold text-primary-600">
                  {formatNumber(row.netMonthly)}만
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 bg-slate-50">
        <p className="text-xs text-slate-400">
          * 본 표는 참고용이며, 정확한 금액은 부양가족 수, 비과세 항목 등 개인 상황에 따라 다를 수 있습니다.
          소득세는 간이세액표 근사치(부양가족 1인 기준)입니다.
        </p>
      </div>
    </div>
  )
}
