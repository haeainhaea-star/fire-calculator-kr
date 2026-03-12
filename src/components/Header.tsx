'use client'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="font-bold text-slate-800 text-sm">직장인 FIRE 계산기</span>
        </a>
        <a
          href="/quick"
          className="text-xs text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          ⚡ 간편 계산
        </a>
      </div>
    </header>
  )
}
