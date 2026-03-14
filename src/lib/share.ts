import { SITE_URL } from './metadata'
import type { CalculatorInput, CalculatorResult } from './calculator'
import { formatKoreanMoney } from './calculator'

/** 공유용 URL 생성 (쿼리파라미터 인코딩) */
export function getShareUrl(input: CalculatorInput, result: CalculatorResult): string {
  const params = new URLSearchParams({
    age: String(input.age),
    fire: String(result.fireAge),
    rate: String(Math.round((input.monthlySaving / input.monthlyIncome) * 100)),
    years: String(result.yearsToFire),
  })
  return `${SITE_URL}?${params.toString()}`
}

/** 트위터 공유 텍스트 생성 */
export function getShareText(input: CalculatorInput, result: CalculatorResult): string {
  const savingsRate = Math.round((input.monthlySaving / input.monthlyIncome) * 100)
  return `나는 ${result.fireAge}세에 FIRE 달성 가능! 🔥\n저축률 ${savingsRate}%로 ${result.yearsToFire}년 후 조기은퇴\n\n너의 FIRE 나이는? 👉`
}

/** 링크 복사용 공유 메시지 (URL + CTA 포함) */
export function getShareMessage(input: CalculatorInput, result: CalculatorResult): string {
  const savingsRate = Math.round((input.monthlySaving / input.monthlyIncome) * 100)
  const url = getShareUrl(input, result)
  return `나는 ${result.fireAge}세에 FIRE 달성 가능! 🔥\n저축률 ${savingsRate}%로 ${result.yearsToFire}년 후 조기은퇴\n\n너도 계산해봐 👉 ${url}`
}

/** 트위터 공유 Intent URL */
export function getTwitterShareUrl(input: CalculatorInput, result: CalculatorResult): string {
  const text = getShareText(input, result)
  const shareUrl = getShareUrl(input, result)
  const hashtags = 'FIRE,파이어족,조기은퇴,재테크'
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`
}

/** 클립보드에 복사 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // 대체: textarea 방식
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const result = document.execCommand('copy')
    document.body.removeChild(textarea)
    return result
  }
}

/** HTML element를 PNG로 다운로드 (html2canvas dynamic import) */
export async function captureAndDownload(
  element: HTMLElement,
  filename: string = 'fire-result.png',
  scale: number = 2
): Promise<boolean> {
  try {
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(element, {
      scale,
      backgroundColor: '#0f172a',
      useCORS: true,
      logging: false,
    })

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png')
    )
    if (!blob) return false

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
    return true
  } catch {
    return false
  }
}

/** 공유 카드 데이터 */
export interface ShareCardData {
  currentAge: number
  fireAge: number
  yearsToFire: number
  fireNumber: string
  monthlySaving: number
  savingsRate: number
  successRate: number
}

export function getShareCardData(input: CalculatorInput, result: CalculatorResult): ShareCardData {
  return {
    currentAge: input.age,
    fireAge: result.fireAge,
    yearsToFire: result.yearsToFire,
    fireNumber: formatKoreanMoney(result.fireNumber),
    monthlySaving: input.monthlySaving,
    savingsRate: Math.round((input.monthlySaving / input.monthlyIncome) * 100),
    successRate: result.successRate,
  }
}
