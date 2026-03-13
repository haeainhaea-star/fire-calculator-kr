// ===== 2026년 연봉 실수령액 계산 엔진 =====

export interface SalaryDeduction {
  grossAnnual: number         // 연봉 (만원)
  grossMonthly: number        // 월급 (만원)
  nationalPension: number     // 국민연금
  healthInsurance: number     // 건강보험
  longTermCare: number        // 장기요양보험
  employmentInsurance: number // 고용보험
  incomeTax: number           // 소득세
  localIncomeTax: number      // 지방소득세
  totalDeduction: number      // 총 공제액
  netMonthly: number          // 월 실수령액
  netAnnual: number           // 연 실수령액
  effectiveTaxRate: number    // 실효 세율 (%)
}

// 2026년 기준 4대보험 요율
const RATES = {
  nationalPension: 0.045,          // 국민연금 4.5%
  nationalPensionCapMonthly: 617,  // 상한 기준보수월액 (만원)
  healthInsurance: 0.03545,        // 건강보험 3.545%
  longTermCareOfHealth: 0.1295,    // 장기요양 = 건보료의 12.95%
  employmentInsurance: 0.009,      // 고용보험 0.9%
}

/**
 * 근로소득 간이세액 근사치 (부양가족 1인 / 본인 기준)
 * 실제 간이세액표를 구간별로 근사한 값
 */
function estimateIncomeTax(monthlyGross: number): number {
  // 만원 단위 입력
  if (monthlyGross <= 150) return 0
  if (monthlyGross <= 200) return Math.round((monthlyGross - 150) * 0.02)
  if (monthlyGross <= 250) return Math.round(1 + (monthlyGross - 200) * 0.04)
  if (monthlyGross <= 300) return Math.round(3 + (monthlyGross - 250) * 0.06)
  if (monthlyGross <= 350) return Math.round(6 + (monthlyGross - 300) * 0.08)
  if (monthlyGross <= 400) return Math.round(10 + (monthlyGross - 350) * 0.12)
  if (monthlyGross <= 500) return Math.round(16 + (monthlyGross - 400) * 0.15)
  if (monthlyGross <= 600) return Math.round(31 + (monthlyGross - 500) * 0.20)
  if (monthlyGross <= 700) return Math.round(51 + (monthlyGross - 600) * 0.25)
  if (monthlyGross <= 800) return Math.round(76 + (monthlyGross - 700) * 0.30)
  if (monthlyGross <= 1000) return Math.round(106 + (monthlyGross - 800) * 0.35)
  return Math.round(176 + (monthlyGross - 1000) * 0.38)
}

/** 연봉 실수령액 계산 */
export function calculateSalaryDeductions(annualSalaryManwon: number): SalaryDeduction {
  const monthly = Math.round(annualSalaryManwon / 12)

  // 국민연금 (상한액 적용)
  const pensionBase = Math.min(monthly, RATES.nationalPensionCapMonthly)
  const nationalPension = Math.round(pensionBase * RATES.nationalPension)

  // 건강보험
  const healthInsurance = Math.round(monthly * RATES.healthInsurance)

  // 장기요양보험
  const longTermCare = Math.round(healthInsurance * RATES.longTermCareOfHealth)

  // 고용보험
  const employmentInsurance = Math.round(monthly * RATES.employmentInsurance)

  // 소득세 (간이세액표 근사)
  const incomeTax = estimateIncomeTax(monthly)

  // 지방소득세
  const localIncomeTax = Math.round(incomeTax * 0.1)

  const totalDeduction = nationalPension + healthInsurance + longTermCare + employmentInsurance + incomeTax + localIncomeTax
  const netMonthly = monthly - totalDeduction
  const netAnnual = netMonthly * 12

  return {
    grossAnnual: annualSalaryManwon,
    grossMonthly: monthly,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalDeduction,
    netMonthly,
    netAnnual,
    effectiveTaxRate: annualSalaryManwon > 0 ? Math.round((totalDeduction * 12 / annualSalaryManwon) * 1000) / 10 : 0,
  }
}

/** 연봉 테이블 데이터 생성 */
export function generateSalaryTable(
  min: number = 2400,
  max: number = 12000,
  step: number = 600
): SalaryDeduction[] {
  const table: SalaryDeduction[] = []
  for (let salary = min; salary <= max; salary += step) {
    table.push(calculateSalaryDeductions(salary))
  }
  return table
}

/** 연봉 기반 간단 FIRE 연수 계산 (25배 룰) */
export function quickFireYears(
  netMonthly: number,
  monthlyExpense: number,
  currentAge: number,
  currentAssets: number = 0,
  realReturn: number = 0.05
): { savingsRate: number; monthlySaving: number; yearsToFire: number; fireAge: number } {
  const monthlySaving = netMonthly - monthlyExpense
  const savingsRate = netMonthly > 0 ? Math.round((monthlySaving / netMonthly) * 100) : 0

  if (monthlySaving <= 0) {
    return { savingsRate: Math.max(0, savingsRate), monthlySaving: 0, yearsToFire: 99, fireAge: currentAge + 99 }
  }

  const fireTarget = monthlyExpense * 12 * 25 // 4% 룰 (25배)
  const yearlySaving = monthlySaving * 12
  let assets = currentAssets

  for (let year = 0; year <= 50; year++) {
    if (assets >= fireTarget) {
      return { savingsRate, monthlySaving, yearsToFire: year, fireAge: currentAge + year }
    }
    assets = assets * (1 + realReturn) + yearlySaving
  }

  return { savingsRate, monthlySaving, yearsToFire: 50, fireAge: currentAge + 50 }
}
