import type { Metadata } from 'next'

export const SITE_URL = 'https://fire-calculator-kr.vercel.app'
export const SITE_NAME = '직장인 FIRE 계산기'

export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: '직장인 FIRE 계산기 2026 | 건보료·국민연금 반영 조기은퇴 시뮬레이터',
      template: '%s | 직장인 FIRE 계산기',
    },
    description:
      '연봉, 저축률, 투자수익률을 입력하면 FIRE(조기은퇴) 달성 시점을 계산합니다. 건강보험료, 국민연금, 인출전략까지 한국 실정에 맞춘 무료 시뮬레이터.',
    keywords: [
      'FIRE 계산기',
      '파이어족 계산기',
      '조기은퇴 계산기',
      '은퇴자금 시뮬레이터',
      '직장인 은퇴 계획',
      '저축률 계산',
      '건보료 피부양자',
      '4% 룰',
      '경제적 자유',
    ],
    openGraph: {
      title: '직장인 FIRE 계산기 — 건보료·국민연금·인출전략까지',
      description: '한국 직장인을 위한 FIRE 은퇴 시뮬레이터. 100% 무료.',
      type: 'website',
      locale: 'ko_KR',
      siteName: SITE_NAME,
      url: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: '/',
    },
    verification: {
      // 네이버 서치어드바이저에서 발급받은 코드로 교체하세요
      // other: { 'naver-site-verification': 'NAVER_VERIFICATION_CODE' },
      // 구글 서치콘솔에서 발급받은 코드로 교체하세요
      // google: 'GOOGLE_VERIFICATION_CODE',
    },
  }
}

/** 페이지별 메타데이터 생성 */
export const pageMetadata = {
  home: {
    title: '직장인 FIRE 계산기 2026 | 건보료·국민연금 반영 조기은퇴 시뮬레이터',
    description:
      '연봉, 저축률, 투자수익률을 입력하면 FIRE(조기은퇴) 달성 시점을 계산합니다. 건강보험료, 국민연금, 인출전략까지 한국 실정에 맞춘 무료 시뮬레이터.',
  },
  quick: {
    title: '30초 FIRE 간편 계산기 | 몇 살에 은퇴 가능할까?',
    description:
      '3가지만 입력하면 조기은퇴 가능 나이를 바로 알려드립니다. 100% 무료, 데이터 수집 없음.',
  },
  faq: {
    title: 'FIRE 자주 묻는 질문 | 파이어족 Q&A',
    description:
      'FIRE(조기은퇴)에 대한 모든 궁금증을 해결하세요. 4% 룰, 저축률, 건보료, 국민연금 등 파이어족 필수 정보.',
  },
  salary: {
    title: '2026 연봉 실수령액표 | 연봉별 FIRE 달성 시뮬레이션',
    description:
      '2026년 4대보험 기준 연봉별 실수령액을 확인하고, FIRE(조기은퇴) 달성 시점을 바로 시뮬레이션해보세요.',
  },
  savingsRate: {
    title: '저축률별 FIRE 달성 시점 비교 | 저축률의 힘',
    description:
      '저축률에 따른 FIRE 조기은퇴 달성 기간을 시뮬레이션. 나의 저축률로 몇 년 안에 은퇴 가능한지 확인하세요.',
  },
} as const
