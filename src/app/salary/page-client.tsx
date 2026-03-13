'use client'

import { useState, useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'
import { generateSalaryTable } from '@/lib/salary-calculator'
import SalaryTable from '@/components/salary/SalaryTable'
import SalaryFireSection from '@/components/salary/SalaryFireSection'
import SalaryFireChart from '@/components/salary/SalaryFireChart'

const salaryTableData = generateSalaryTable()

interface SalaryPageClientProps {
  faqs: Array<{ question: string; answer: string }>
}

export default function SalaryPageClient({ faqs }: SalaryPageClientProps) {
  const [selectedSalary, setSelectedSalary] = useState(5000)
  const [monthlyExpense, setMonthlyExpense] = useState(200)
  const [age, setAge] = useState(30)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const tracked = useRef(false)

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true
      trackEvent('salary_calc_view')
    }
  }, [])

  const handleSelectSalary = (salary: number) => {
    setSelectedSalary(salary)
    trackEvent('salary_fire_calc', { salary })
    // 스크롤 to FIRE 섹션
    document.getElementById('fire-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="px-4 pt-4 space-y-6 animate-fade-in">
      {/* 페이지 타이틀 */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          2026년 연봉 실수령액표
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          4대보험 · 소득세 공제 후 실제 받는 금액
        </p>
      </div>

      {/* 연봉 테이블 */}
      <SalaryTable
        data={salaryTableData}
        selectedSalary={selectedSalary}
        onSelectSalary={handleSelectSalary}
      />

      {/* FIRE 시뮬레이션 섹션 */}
      <div id="fire-section">
        <SalaryFireSection
          salary={selectedSalary}
          monthlyExpense={monthlyExpense}
          age={age}
          onSalaryChange={setSelectedSalary}
          onExpenseChange={setMonthlyExpense}
          onAgeChange={setAge}
        />
      </div>

      {/* 연봉별 FIRE 비교 차트 */}
      <SalaryFireChart />

      {/* FAQ */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-slate-700 px-1">자주 묻는 질문</h2>
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
            >
              <h3 className="text-xs font-semibold text-slate-700 pr-4">{faq.question}</h3>
              <span className={`text-slate-400 transition-transform duration-200 flex-shrink-0 text-xs ${
                openFaqIndex === i ? 'rotate-180' : ''
              }`}>
                ▾
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${
              openFaqIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <p className="px-4 pb-3 text-xs text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
