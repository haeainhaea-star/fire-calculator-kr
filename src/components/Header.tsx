'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'FIRE 계산기', icon: '🔥', short: '홈' },
  { href: '/quick', label: '간편 계산', icon: '⚡', short: '간편' },
  { href: '/salary', label: '연봉 실수령', icon: '💰', short: '연봉' },
  { href: '/savings-rate', label: '저축률', icon: '📊', short: '저축률' },
  { href: '/faq', label: 'FAQ', icon: '❓', short: 'FAQ' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-slate-800 text-sm">직장인 FIRE 계산기</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-1" aria-label="메인 네비게이션">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  pathname === item.href
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.icon} {item.short}
              </Link>
            ))}
          </nav>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-1 text-slate-600 hover:text-slate-800"
            aria-label="메뉴 열기"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* 모바일 드로어 */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-50 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            className="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-xl md:hidden animate-slide-in-right"
            aria-label="모바일 네비게이션"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-sm">메뉴</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
                aria-label="메뉴 닫기"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l8 8M14 6l-8 8" />
                </svg>
              </button>
            </div>
            <div className="py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    pathname === item.href
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  )
}
