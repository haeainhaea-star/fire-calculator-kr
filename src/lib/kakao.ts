// ===== Kakao SDK 유틸리티 =====
// 앱 ID: 1404873

import { SITE_URL } from './metadata'
import type { CalculatorInput, CalculatorResult } from './calculator'
import { formatKoreanMoney } from './calculator'

const KAKAO_JS_KEY = '518fe85e8475987c6c4f7eccf5faf299'

/** Kakao SDK 초기화 */
export function initKakao(): boolean {
  if (typeof window === 'undefined') return false
  if (!window.Kakao) return false
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JS_KEY)
  }
  return window.Kakao.isInitialized()
}

/** Kakao SDK 준비 여부 */
export function isKakaoReady(): boolean {
  if (typeof window === 'undefined') return false
  return !!window.Kakao?.isInitialized()
}

/** 카카오톡 피드 공유 */
export function shareToKakao(input: CalculatorInput, result: CalculatorResult): void {
  if (!isKakaoReady()) return

  const fireAge = input.age + result.yearsToFire
  const savingsRate = Math.round((input.monthlySaving / input.monthlyIncome) * 100)

  window.Kakao!.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `나는 ${fireAge}세에 FIRE 달성 가능! 🔥`,
      description: `월 ${input.monthlySaving}만원 저축(저축률 ${savingsRate}%)으로 ${result.yearsToFire}년 후 조기은퇴 · 필요 자금 ${formatKoreanMoney(result.fireNumber)}원`,
      imageUrl: `${SITE_URL}/og-image.png`,
      link: {
        mobileWebUrl: SITE_URL,
        webUrl: SITE_URL,
      },
    },
    buttons: [
      {
        title: '나도 계산해보기',
        link: {
          mobileWebUrl: SITE_URL,
          webUrl: SITE_URL,
        },
      },
    ],
  })
}

// window.Kakao 타입 선언
declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void
      isInitialized: () => boolean
      Share: {
        sendDefault: (options: KakaoShareOptions) => void
      }
    }
  }
}

interface KakaoShareOptions {
  objectType: 'feed'
  content: {
    title: string
    description: string
    imageUrl: string
    link: {
      mobileWebUrl: string
      webUrl: string
    }
  }
  buttons?: Array<{
    title: string
    link: {
      mobileWebUrl: string
      webUrl: string
    }
  }>
}
