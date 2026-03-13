import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { getBaseMetadata } from '@/lib/metadata'
import { getWebApplicationSchema } from '@/lib/jsonld'
import JsonLd from '@/components/JsonLd'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  ...getBaseMetadata(),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* 네이버 서치어드바이저 인증코드 — 발급 후 content 값을 교체하세요 */}
        {/* <meta name="naver-site-verification" content="NAVER_VERIFICATION_CODE" /> */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3567344041069721"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7QH436XWJN"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7QH436XWJN', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-slate-50">
        <JsonLd data={getWebApplicationSchema()} />
        <div className="mx-auto max-w-screen-md">
          {children}
        </div>
      </body>
    </html>
  )
}
