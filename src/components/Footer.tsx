'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-12 pb-8 px-4">
      <div className="border-t border-slate-200 pt-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-xs text-amber-800 leading-relaxed">
            ⚠️ <strong>면책 조항:</strong> 본 계산기는 투자 자문이 아닙니다.
            실제 투자 결과는 시장 상황, 세법 변경 등에 따라 달라질 수 있습니다.
            중요한 재무 결정 시 전문가와 상담하세요.
          </p>
        </div>

        {/* 사이트 맵 링크 */}
        <nav className="grid grid-cols-3 gap-2 mb-6" aria-label="사이트 맵">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
            🔥 FIRE 계산기
          </Link>
          <Link href="/quick" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
            ⚡ 간편 계산
          </Link>
          <Link href="/faq" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
            ❓ FAQ
          </Link>
          <Link href="/salary" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
            💰 연봉 실수령
          </Link>
          <Link href="/savings-rate" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
            📊 저축률 비교
          </Link>
        </nav>

        <div className="text-center space-y-2">
          <p className="text-xs text-slate-400">
            &copy; 2025 직장인 FIRE 계산기 &middot; 100% 무료
          </p>
          <p className="text-xs text-slate-400">
            🔒 모든 계산은 브라우저에서 처리됩니다 &middot; 익명 이용 통계 수집 (GA)
          </p>
        </div>
      </div>
    </footer>
  )
}
