import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: '직장인 FIRE 계산기 | 은퇴 자금 파이어 시뮬레이터',
  description: '건보료·국민연금·인출전략까지 고려한 한국형 FIRE 계산기. 배당소득 vs 자가배당 세금 비교, 부가수입 효과까지 무료로 시뮬레이션하세요.',
  keywords: 'FIRE 계산기, 조기은퇴, 파이어족, 은퇴자금, 건보료, 국민연금, 배당소득, 자가배당, ETF',
  openGraph: {
    title: '직장인 FIRE 계산기 — 건보료·국민연금·인출전략까지',
    description: '한국 직장인을 위한 FIRE 은퇴 시뮬레이터. 100% 무료.',
    type: 'website',
    locale: 'ko_KR',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-screen-md">
          {children}
        </div>
      </body>
    </html>
  )
}
