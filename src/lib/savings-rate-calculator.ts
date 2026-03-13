// ===== 저축률 기반 FIRE 달성 연수 계산 (Mr. Money Mustache 공식) =====

/**
 * 저축률 기반 FIRE 달성 연수
 * 가정: 자산 0에서 시작, 연간 지출의 25배 축적 시 FIRE (4% 룰)
 * @param savingsRate 0.05 ~ 0.95 (5% ~ 95%)
 * @param realReturn 실질 수익률 (기본 5%)
 */
export function yearsToFireBySavingsRate(
  savingsRate: number,
  realReturn: number = 0.05
): number {
  if (savingsRate <= 0) return 99
  if (savingsRate >= 1) return 0

  // 연간 수입을 1로 정규화
  // 저축 = savingsRate, 지출 = (1 - savingsRate)
  // FIRE 목표 = 25 * (1 - savingsRate)
  const fireTarget = 25 * (1 - savingsRate)
  const annualSaving = savingsRate
  let assets = 0

  for (let year = 0; year <= 100; year++) {
    if (assets >= fireTarget) return year
    assets = assets * (1 + realReturn) + annualSaving
  }

  return 99
}

/** 차트 데이터 생성 (5% ~ 90%) */
export function generateSavingsRateData(
  realReturn: number = 0.05
): Array<{ rate: number; years: number }> {
  const data: Array<{ rate: number; years: number }> = []

  for (let rate = 5; rate <= 90; rate += 5) {
    data.push({
      rate,
      years: yearsToFireBySavingsRate(rate / 100, realReturn),
    })
  }

  return data
}

/** 소득과 지출에서 저축률 계산 */
export function calcSavingsRate(monthlyIncome: number, monthlyExpense: number): number {
  if (monthlyIncome <= 0) return 0
  const rate = ((monthlyIncome - monthlyExpense) / monthlyIncome) * 100
  return Math.max(0, Math.min(100, Math.round(rate)))
}

/** 저축률 아키타입 */
export const savingsRateArchetypes = [
  {
    rate: 20,
    label: '일반 직장인',
    emoji: '🚶',
    years: 37,
    startAge: 30,
    fireAge: 67,
    message: '일반적인 직장인의 은퇴 경로',
    color: 'from-slate-400 to-slate-500',
    bgColor: 'bg-slate-50',
  },
  {
    rate: 50,
    label: '절약 전문가',
    emoji: '🏃',
    years: 17,
    startAge: 30,
    fireAge: 47,
    message: '수입의 절반을 투자하면 20년 빨라진다!',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    rate: 70,
    label: '터보 은퇴',
    emoji: '🚀',
    years: 9,
    startAge: 30,
    fireAge: 39,
    message: '극한의 저축이 만드는 30대 은퇴',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
  },
] as const
