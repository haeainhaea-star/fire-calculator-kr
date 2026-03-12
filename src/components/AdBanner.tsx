'use client'

import { useEffect, useRef } from 'react'

interface AdBannerProps {
  /** 광고 슬롯 ID (AdSense에서 생성) — 없으면 자동 광고 */
  slot?: string
  /** 광고 포맷: auto(자동), rectangle(직사각형), horizontal(가로형) */
  format?: 'auto' | 'rectangle' | 'horizontal'
  /** 반응형 여부 */
  responsive?: boolean
  className?: string
}

export default function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isLoaded = useRef(false)

  useEffect(() => {
    // AdSense ID가 없거나 플레이스홀더인 경우 스킵
    const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
    if (!adsenseId || adsenseId === 'ca-pub-XXXXXXXXXX') return

    // 이미 로드된 광고는 스킵
    if (isLoaded.current) return
    isLoaded.current = true

    try {
      const adsbygoogle = (window as any).adsbygoogle || []
      adsbygoogle.push({})
    } catch (e) {
      // 광고 로드 실패 시 무시
    }
  }, [])

  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  // 퍼블리셔 ID가 없거나 플레이스홀더면 개발용 플레이스홀더 표시
  if (!adsenseId || adsenseId === 'ca-pub-XXXXXXXXXX') {
    return (
      <div className={`bg-slate-100 rounded-xl p-4 text-center ${className}`}>
        <p className="text-xs text-slate-400">📢 광고 영역 (AdSense 연동 대기)</p>
      </div>
    )
  }

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseId}
        {...(slot && { 'data-ad-slot': slot })}
        data-ad-format={format}
        {...(responsive && { 'data-full-width-responsive': 'true' })}
      />
    </div>
  )
}
