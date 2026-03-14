'use client'

import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { trackEvent } from '@/lib/analytics'
import FeedbackWidget from '@/components/FeedbackWidget'
import ProgressBar from '@/components/ProgressBar'
import Step1 from '@/components/steps/Step1'
import Step2 from '@/components/steps/Step2'
import Step3 from '@/components/steps/Step3'
import Step4 from '@/components/steps/Step4'
import ResultDashboard from '@/components/result/ResultDashboard'
import SharedResultBanner from '@/components/share/SharedResultBanner'
import { useCalculator } from '@/store/useCalculator'

function Landing() {
  const { setStep } = useCalculator()

  return (
    <div className="animate-fade-in px-4 pt-8 pb-6">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-800 leading-tight">
          🔥 직장인 FIRE 계산기
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          건보료·국민연금·인출전략까지 고려한<br />
          <strong className="text-slate-700">한국형 FIRE 시뮬레이터</strong>
        </p>
      </div>

      {/* 킬러 피처 카드 */}
      <div className="mt-8 space-y-3">
        {[
          {
            emoji: '🏥',
            title: '건보료 폭탄 방지',
            desc: '배당소득 vs 자가배당 건보료 비교',
            tag: '인기',
            tagColor: 'bg-red-100 text-red-600',
          },
          {
            emoji: '💰',
            title: '세금 절세 전략',
            desc: '15.4% → 7.9% 실효세율 비교 분석',
            tag: '핵심',
            tagColor: 'bg-blue-100 text-blue-600',
          },
          {
            emoji: '🌱',
            title: '부가수입 효과',
            desc: '월 100만원 = 3억 자산 효과 시뮬레이션',
            tag: '신규',
            tagColor: 'bg-green-100 text-green-600',
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4"
          >
            <span className="text-2xl">{feature.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-700">{feature.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${feature.tagColor}`}>
                  {feature.tag}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => {
          trackEvent('calculator_start', { source: 'landing' })
          setStep(1)
        }}
        className="w-full mt-8 bg-gradient-to-r from-primary-600 to-blue-700 text-white rounded-2xl py-4 font-bold text-base hover:from-primary-700 hover:to-blue-800 active:scale-[0.98] transition-all shadow-lg shadow-primary-200"
      >
        무료로 계산 시작하기 →
      </button>

      {/* Trust Badges */}
      <div className="flex justify-center gap-4 mt-4">
        <span className="text-xs text-slate-400">🔒 로그인 불필요</span>
        <span className="text-xs text-slate-400">📱 모바일 최적화</span>
        <span className="text-xs text-slate-400">💯 100% 무료</span>
      </div>

      {/* 간편 계산 링크 */}
      <div className="mt-8 bg-slate-50 rounded-2xl p-4 text-center">
        <p className="text-sm text-slate-600">시간이 없다면?</p>
        <a
          href="/quick"
          className="inline-block mt-2 text-primary-600 font-semibold text-sm hover:text-primary-700"
        >
          ⚡ 30초 간편 계산 →
        </a>
      </div>
    </div>
  )
}

export default function Home() {
  const { step, setStep } = useCalculator()

  return (
    <main className="pb-8">
      <Header />

      {step === 0 && (
        <>
          <Suspense fallback={null}>
            <SharedResultBanner onStart={() => setStep(1)} />
          </Suspense>
          <Landing />
        </>
      )}

      {step >= 1 && step <= 4 && (
        <div className="pt-2 pb-4">
          <ProgressBar current={step} />
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}
        </div>
      )}

      {step === 5 && (
        <div className="pt-4 pb-4">
          <ResultDashboard />
        </div>
      )}

      <Footer />
      <FeedbackWidget />

      {/* Floating Buttons (결과 화면 전용) */}
      <FloatingButtons />
    </main>
  )
}

const KAKAO_OPEN_CHAT_URL = 'https://open.kakao.com/o/g74cn8ki'

function FloatingButtons() {
  const { setShowFeedback, showFeedback, step } = useCalculator()

  // 결과 화면에서만 표시
  if (step !== 5 || showFeedback) return null

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {/* 카카오톡 오픈채팅 */}
      <a
        href={KAKAO_OPEN_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('kakao_chat_click')}
        className="bg-yellow-400 text-yellow-900 w-12 h-12 rounded-full shadow-lg shadow-yellow-200 flex items-center justify-center text-xl hover:bg-yellow-500 active:scale-90 transition-all"
        aria-label="카카오톡 오픈채팅"
      >
        💬
      </a>
      {/* 피드백 */}
      <button
        onClick={() => setShowFeedback(true)}
        className="bg-primary-600 text-white w-12 h-12 rounded-full shadow-lg shadow-primary-300 flex items-center justify-center text-xl hover:bg-primary-700 active:scale-90 transition-all"
        aria-label="피드백"
      >
        ✍️
      </button>
    </div>
  )
}
