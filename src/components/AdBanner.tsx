'use client'

import { useEffect, useRef } from 'react'

const ADSENSE_ID = 'ca-pub-3567344041069721'

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

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_ID}
        {...(slot && { 'data-ad-slot': slot })}
        data-ad-format={format}
        {...(responsive && { 'data-full-width-responsive': 'true' })}
      />
    </div>
  )
}
