import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '직장인 FIRE 계산기'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e1e2e 0%, #0f172a 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 16 }}>🔥</div>
        <div style={{ fontSize: 48, fontWeight: 700, marginBottom: 12 }}>
          직장인 FIRE 계산기
        </div>
        <div style={{ fontSize: 24, opacity: 0.7 }}>
          건보료·국민연금·인출전략까지 반영한 한국형 조기은퇴 시뮬레이터
        </div>
      </div>
    ),
    { ...size }
  )
}
