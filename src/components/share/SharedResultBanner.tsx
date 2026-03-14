'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

interface SharedData {
  age: number
  fireAge: number
  rate: number
  years: number
}

export default function SharedResultBanner() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<SharedData | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const age = searchParams.get('age')
    const fire = searchParams.get('fire')
    const rate = searchParams.get('rate')
    const years = searchParams.get('years')

    if (age && fire && rate && years) {
      setData({
        age: Number(age),
        fireAge: Number(fire),
        rate: Number(rate),
        years: Number(years),
      })
      trackEvent('shared_link_visit', {
        fire_age: fire,
        savings_rate: rate,
      })
    }
  }, [searchParams])

  if (!data || dismissed) return null

  return (
    <div className="mx-4 mt-4 mb-2 animate-fade-in">
      {/* 친구 결과 카드 */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white relative overflow-hidden">
        {/* 배경 장식 */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}
        />

        <p className="text-xs text-slate-400 mb-2">친구의 FIRE 시뮬레이션 결과</p>

        <div className="text-2xl font-bold mb-3">
          🔥 {data.fireAge}세에 FIRE 달성!
        </div>

        <div className="space-y-1.5 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            현재 {data.age}세 → {data.years}년 후 조기은퇴
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            저축률 {data.rate}%
          </div>
        </div>

        {/* CTA 버튼 — 카드 안에 배치 */}
        <button
          onClick={() => {
            trackEvent('shared_link_cta_click')
            window.history.replaceState({}, '', '/')
            setDismissed(true)
          }}
          className="w-full mt-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl py-3.5 font-bold text-sm hover:from-orange-600 hover:to-red-600 active:scale-[0.98] transition-all animate-pulse-subtle"
        >
          나도 내 FIRE 나이 알아보기 →
        </button>

        <p className="text-center text-xs text-slate-400 mt-2">
          30초면 충분해요 · 100% 무료
        </p>
      </div>
    </div>
  )
}
