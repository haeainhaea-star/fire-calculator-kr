// ===== 직장인 FIRE 계산기 — 핵심 계산 엔진 =====

export interface CalculatorInput {
  // Step 1: 기본 정보
  age: number
  monthlyIncome: number        // 만원
  monthlySaving: number        // 만원
  currentAssets: number        // 만원

  // Step 2: 은퇴 목표
  targetRetireAge: number
  monthlyExpense: number       // 만원 (은퇴 후 월 생활비)

  // Step 3: 투자 전략
  expectedReturn: number       // % (연간 기대수익률)
  inflationRate: number        // %
  withdrawalRate: number       // % (인출률, 기본 3.5%)

  // Step 4: 부가수입 & 옵션
  sideIncome: number           // 만원 (은퇴 후 부가수입)
  sideIncomeYears: number      // 부가수입 지속 연수
  pensionStartAge: number      // 국민연금 수령 시작 나이
  monthlyPension: number       // 만원 (예상 국민연금)

  // 인출 전략
  withdrawalStrategy: 'dividend' | 'selfDividend' | 'mixed'
}

export interface YearlyProjection {
  age: number
  year: number
  assets: number               // 만원
  investment: number           // 누적 투자금
  returns: number              // 누적 수익
  withdrawal: number           // 연간 인출액
  sideIncome: number           // 연간 부가수입
  pension: number              // 연간 연금
  isRetired: boolean
}

export interface CalculatorResult {
  // 핵심 지표
  fireNumber: number           // 만원 (필요 은퇴 자금)
  yearsToFire: number          // FIRE까지 남은 연수
  fireAge: number              // FIRE 가능 나이

  // 부가수입 효과
  fireNumberWithSideIncome: number  // 부가수입 반영 FIRE 금액
  savedYears: number           // 부가수입으로 단축된 연수
  sideIncomeAssetEquivalent: number // 부가수입의 자산 환산 가치

  // 세금 비교
  dividendTax: TaxBreakdown
  selfDividendTax: TaxBreakdown
  taxSavingPerYear: number     // 자가배당 절세 효과 (만원/년)

  // 건보료
  dividendHealthInsurance: number   // 만원/월
  selfDividendHealthInsurance: number // 만원/월
  healthInsuranceSaving: number     // 만원/년

  // 시계열 예측
  projections: YearlyProjection[]

  // 달성 확률 (간이)
  successRate: number          // %
}

export interface TaxBreakdown {
  annualIncome: number         // 만원
  incomeTax: number            // 만원
  localTax: number             // 만원
  healthInsurance: number      // 만원/년
  totalTax: number             // 만원
  effectiveRate: number        // %
}

// ===== 상수 =====
const DIVIDEND_TAX_RATE = 0.154          // 배당소득세 15.4%
const STOCK_CAPITAL_GAINS_EXEMPT = 250   // 만원 (해외주식 양도소득 기본공제)
const STOCK_CAPITAL_GAINS_RATE = 0.22    // 22% (양도소득세 + 지방세)
const HEALTH_INSURANCE_RATE = 0.0709     // 건보료율 7.09%
const HEALTH_INSURANCE_DIVIDEND_THRESHOLD = 2000 // 만원 (금융소득 2000만원 초과 시 건보료)

// ===== 핵심 계산 함수들 =====

/** FIRE 넘버 계산 (필요 은퇴 자금) */
export function calcFireNumber(monthlyExpense: number, withdrawalRate: number): number {
  return Math.round((monthlyExpense * 12) / (withdrawalRate / 100))
}

/** 부가수입 반영 FIRE 넘버 */
export function calcFireNumberWithSideIncome(
  monthlyExpense: number,
  sideIncome: number,
  withdrawalRate: number
): number {
  const netExpense = Math.max(0, monthlyExpense - sideIncome)
  return Math.round((netExpense * 12) / (withdrawalRate / 100))
}

/** 부가수입의 자산 환산 가치 (4% 룰 기준) */
export function calcSideIncomeAssetValue(sideIncome: number, withdrawalRate: number): number {
  return Math.round((sideIncome * 12) / (withdrawalRate / 100))
}

/** 연간 자산 성장 시뮬레이션 */
export function simulateGrowth(input: CalculatorInput): YearlyProjection[] {
  const projections: YearlyProjection[] = []
  const realReturn = (1 + input.expectedReturn / 100) / (1 + input.inflationRate / 100) - 1

  let assets = input.currentAssets
  let cumulativeInvestment = input.currentAssets
  let cumulativeReturns = 0
  const retireAge = input.targetRetireAge

  for (let yearIdx = 0; yearIdx <= 60; yearIdx++) {
    const currentAge = input.age + yearIdx
    if (currentAge > 100) break

    const isRetired = currentAge >= retireAge
    let yearSideIncome = 0
    let yearPension = 0
    let yearWithdrawal = 0

    if (!isRetired) {
      // 은퇴 전: 저축
      const yearSaving = input.monthlySaving * 12
      const yearReturn = assets * realReturn
      assets += yearSaving + yearReturn
      cumulativeInvestment += yearSaving
      cumulativeReturns += yearReturn
    } else {
      // 은퇴 후: 인출
      yearWithdrawal = input.monthlyExpense * 12

      // 부가수입 (제한된 기간)
      const yearsIntoRetirement = currentAge - retireAge
      if (yearsIntoRetirement < input.sideIncomeYears) {
        yearSideIncome = input.sideIncome * 12
      }

      // 국민연금
      if (currentAge >= input.pensionStartAge) {
        yearPension = input.monthlyPension * 12
      }

      const netWithdrawal = yearWithdrawal - yearSideIncome - yearPension
      const yearReturn = assets * realReturn
      assets = assets + yearReturn - Math.max(0, netWithdrawal)
      cumulativeReturns += yearReturn
    }

    projections.push({
      age: currentAge,
      year: new Date().getFullYear() + yearIdx,
      assets: Math.round(assets),
      investment: Math.round(cumulativeInvestment),
      returns: Math.round(cumulativeReturns),
      withdrawal: Math.round(yearWithdrawal),
      sideIncome: Math.round(yearSideIncome),
      pension: Math.round(yearPension),
      isRetired,
    })

    if (assets <= 0 && isRetired) break
  }

  return projections
}

/** FIRE까지 남은 연수 계산 */
export function calcYearsToFire(input: CalculatorInput): number {
  const fireTarget = calcFireNumber(input.monthlyExpense, input.withdrawalRate)
  const realReturn = (1 + input.expectedReturn / 100) / (1 + input.inflationRate / 100) - 1

  let assets = input.currentAssets
  const yearlySaving = input.monthlySaving * 12

  for (let year = 0; year <= 50; year++) {
    if (assets >= fireTarget) return year
    assets = assets * (1 + realReturn) + yearlySaving
  }

  return 50 // 50년 이상 = 사실상 달성 어려움
}

/** 배당소득 세금 계산 */
export function calcDividendTax(annualDividend: number): TaxBreakdown {
  const incomeTax = annualDividend * 0.14
  const localTax = annualDividend * 0.014

  // 건보료 (2000만원 초과분)
  let healthInsurance = 0
  if (annualDividend > HEALTH_INSURANCE_DIVIDEND_THRESHOLD) {
    healthInsurance = (annualDividend - HEALTH_INSURANCE_DIVIDEND_THRESHOLD) * HEALTH_INSURANCE_RATE
  }

  const totalTax = incomeTax + localTax + healthInsurance

  return {
    annualIncome: annualDividend,
    incomeTax: Math.round(incomeTax),
    localTax: Math.round(localTax),
    healthInsurance: Math.round(healthInsurance),
    totalTax: Math.round(totalTax),
    effectiveRate: annualDividend > 0 ? Math.round((totalTax / annualDividend) * 1000) / 10 : 0,
  }
}

/** 자가배당(ETF 매도) 세금 계산 */
export function calcSelfDividendTax(annualSale: number, gainRatio: number = 0.5): TaxBreakdown {
  // 매도금 중 수익 비율 (gainRatio) 적용
  const capitalGain = annualSale * gainRatio
  const taxableGain = Math.max(0, capitalGain - STOCK_CAPITAL_GAINS_EXEMPT)

  const incomeTax = taxableGain * 0.20
  const localTax = taxableGain * 0.02

  // 자가배당은 건보료 미부과 (킬러 피처!)
  const healthInsurance = 0

  const totalTax = incomeTax + localTax + healthInsurance

  return {
    annualIncome: annualSale,
    incomeTax: Math.round(incomeTax),
    localTax: Math.round(localTax),
    healthInsurance: 0,
    totalTax: Math.round(totalTax),
    effectiveRate: annualSale > 0 ? Math.round((totalTax / annualSale) * 1000) / 10 : 0,
  }
}

/** 간이 성공 확률 (몬테카를로 간소화 버전) */
export function calcSuccessRate(input: CalculatorInput): number {
  const fireNumber = calcFireNumber(input.monthlyExpense, input.withdrawalRate)
  const yearsToFire = calcYearsToFire(input)
  const fireAge = input.age + yearsToFire
  const yearsInRetirement = 100 - fireAge

  // 간이 판단: 인출률 기반
  let baseRate = 95
  if (input.withdrawalRate > 4) baseRate -= (input.withdrawalRate - 4) * 15
  if (input.withdrawalRate <= 3) baseRate = 98

  // 부가수입 보정
  if (input.sideIncome > 0) baseRate += 2

  // 연금 보정
  if (input.monthlyPension > 0) baseRate += 2

  // 은퇴 기간 보정
  if (yearsInRetirement > 40) baseRate -= 5
  if (yearsInRetirement < 25) baseRate += 3

  return Math.min(99, Math.max(30, Math.round(baseRate)))
}

/** 종합 계산 실행 */
export function calculate(input: CalculatorInput): CalculatorResult {
  const fireNumber = calcFireNumber(input.monthlyExpense, input.withdrawalRate)
  const fireNumberWithSideIncome = calcFireNumberWithSideIncome(
    input.monthlyExpense, input.sideIncome, input.withdrawalRate
  )
  const yearsToFire = calcYearsToFire(input)
  const fireAge = input.age + yearsToFire

  const sideIncomeAssetEquivalent = calcSideIncomeAssetValue(input.sideIncome, input.withdrawalRate)

  // 부가수입 반영 시 단축 연수
  const inputWithSideIncome = { ...input, monthlyExpense: Math.max(0, input.monthlyExpense - input.sideIncome) }
  const yearsWithSideIncome = calcYearsToFire(inputWithSideIncome)
  const savedYears = yearsToFire - yearsWithSideIncome

  // 세금 비교 (연간 인출액 기준)
  const annualWithdrawal = input.monthlyExpense * 12
  const dividendTax = calcDividendTax(annualWithdrawal)
  const selfDividendTax = calcSelfDividendTax(annualWithdrawal)
  const taxSavingPerYear = dividendTax.totalTax - selfDividendTax.totalTax

  // 건보료
  const dividendHealthInsurance = Math.round(dividendTax.healthInsurance / 12)
  const selfDividendHealthInsurance = 0
  const healthInsuranceSaving = dividendTax.healthInsurance

  // 시뮬레이션
  const projections = simulateGrowth(input)

  // 성공 확률
  const successRate = calcSuccessRate(input)

  return {
    fireNumber,
    yearsToFire,
    fireAge,
    fireNumberWithSideIncome,
    savedYears,
    sideIncomeAssetEquivalent,
    dividendTax,
    selfDividendTax,
    taxSavingPerYear,
    dividendHealthInsurance,
    selfDividendHealthInsurance,
    healthInsuranceSaving,
    projections,
    successRate,
  }
}

// ===== 유틸리티 =====

/** 숫자 포맷 (만원 → 억/만원) */
export function formatKoreanMoney(manwon: number): string {
  if (Math.abs(manwon) >= 10000) {
    const eok = Math.floor(manwon / 10000)
    const remaining = manwon % 10000
    if (remaining === 0) return `${eok}억`
    return `${eok}억 ${remaining.toLocaleString()}만`
  }
  return `${manwon.toLocaleString()}만`
}

/** 숫자에 천단위 콤마 */
export function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR')
}
