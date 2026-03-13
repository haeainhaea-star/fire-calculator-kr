'use client'

import { forwardRef } from 'react'
import type { ShareCardData } from '@/lib/share'

interface ShareCardProps {
  data: ShareCardData
  variant?: 'og' | 'instagram'
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ data, variant = 'og' }, ref) => {
    const isSquare = variant === 'instagram'
    const width = isSquare ? 540 : 600
    const height = isSquare ? 540 : 315

    return (
      <div
        ref={ref}
        style={{
          width,
          height,
          background: 'linear-gradient(135deg, #1e1e2e 0%, #0f172a 100%)',
          color: 'white',
          fontFamily: 'Pretendard, -apple-system, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isSquare ? '40px' : '32px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 배경 그라데이션 포인트 */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
            opacity: 0.15,
          }}
        />

        {/* 타이틀 */}
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
          🔥 나의 FIRE 플랜
        </div>

        {/* 구분선 */}
        <div
          style={{
            height: 2,
            background: 'linear-gradient(90deg, #f97316, #ef4444, transparent)',
            marginBottom: isSquare ? 24 : 16,
          }}
        />

        {/* 핵심 정보 */}
        <div style={{ fontSize: isSquare ? 28 : 24, fontWeight: 700, marginBottom: 12 }}>
          {data.currentAge}세 → {data.fireAge}세{' '}
          <span style={{ fontSize: 16, opacity: 0.7 }}>
            ({data.yearsToFire}년 후 FIRE)
          </span>
        </div>

        {/* 상세 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isSquare ? 10 : 6 }}>
          <div style={{ fontSize: 15, opacity: 0.9 }}>
            필요 자금: <strong>{data.fireNumber}원</strong>
          </div>
          <div style={{ fontSize: 15, opacity: 0.9 }}>
            월 저축액: <strong>{data.monthlySaving}만원</strong> | 저축률:{' '}
            <strong>{data.savingsRate}%</strong>
          </div>
          <div style={{ fontSize: 15, opacity: 0.9 }}>
            달성 확률: <strong>{data.successRate}%</strong>
          </div>
        </div>

        {/* 구분선 */}
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.15)',
            marginTop: isSquare ? 24 : 16,
            marginBottom: 12,
          }}
        />

        {/* 워터마크 */}
        <div style={{ fontSize: 12, opacity: 0.4 }}>
          fire-calculator-kr.vercel.app
        </div>
      </div>
    )
  }
)

ShareCard.displayName = 'ShareCard'
export default ShareCard
