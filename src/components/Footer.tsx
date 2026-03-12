'use client'

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
        <div className="text-center space-y-2">
          <p className="text-xs text-slate-400">
            © 2024 직장인 FIRE 계산기 · 100% 무료 · 데이터 수집 없음
          </p>
          <p className="text-xs text-slate-400">
            🔒 모든 계산은 브라우저에서 처리됩니다
          </p>
        </div>
      </div>
    </footer>
  )
}
