// Google Analytics 4 유틸리티
// 측정 ID: G-7QH436XWJN

export const GA_MEASUREMENT_ID = 'G-7QH436XWJN'

// 타입 안전한 이벤트명
type AnalyticsEvent =
  | 'calculator_start'
  | 'step_complete'
  | 'calculation_done'
  | 'result_view'
  | 'recalculate'
  | 'feedback_submit'
  | 'kakao_chat_click'
  | 'quick_calc_view'
  | 'quick_to_detail'
  // 공유 이벤트
  | 'share_kakao'
  | 'share_twitter'
  | 'share_copy_link'
  | 'share_save_image'
  | 'share_modal_open'
  // 페이지별 이벤트
  | 'faq_view'
  | 'faq_item_click'
  | 'salary_calc_view'
  | 'salary_fire_calc'
  | 'savings_rate_view'
  | 'savings_rate_change'

interface EventParams {
  [key: string]: string | number | boolean | undefined
}

/** 페이지 뷰 기록 */
export function pageView(url: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

/** 커스텀 이벤트 기록 */
export function trackEvent(event: AnalyticsEvent, params?: EventParams) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', event, params)
}

// window.gtag 타입 선언
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}
