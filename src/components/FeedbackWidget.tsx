'use client'

import { useState } from 'react'
import { useCalculator } from '@/store/useCalculator'

const KAKAO_OPEN_CHAT_URL = 'https://open.kakao.com/o/g74cn8ki'

export default function FeedbackWidget() {
  const { showFeedback, setShowFeedback } = useCalculator()
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'other'>('feature')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!message.trim()) return

    // Google Forms 또는 간단한 서버리스 함수로 전송
    // MVP에서는 콘솔 로그 + localStorage에 저장
    const feedback = {
      type: feedbackType,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    }

    // localStorage에 피드백 저장
    try {
      const existing = JSON.parse(localStorage.getItem('fire-feedback') || '[]')
      existing.push(feedback)
      localStorage.setItem('fire-feedback', JSON.stringify(existing))
    } catch {}

    console.log('[Feedback]', feedback)
    setSubmitted(true)
  }

  const handleClose = () => {
    setShowFeedback(false)
    setMessage('')
    setSubmitted(false)
  }

  if (!showFeedback) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-white rounded-t-3xl max-w-screen-md mx-auto p-6 pb-8">
          {!submitted ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">💬 피드백</h3>
                <button
                  onClick={handleClose}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* 피드백 유형 */}
              <div className="flex gap-2 mb-4">
                {[
                  { key: 'feature' as const, label: '💡 기능 요청' },
                  { key: 'bug' as const, label: '🐛 버그 신고' },
                  { key: 'other' as const, label: '💭 기타' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setFeedbackType(opt.key)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      feedbackType === opt.key
                        ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                        : 'bg-slate-50 text-slate-500 border-2 border-transparent'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* 메시지 입력 */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="의견을 자유롭게 남겨주세요 ✍️"
                className="w-full border border-slate-200 rounded-xl p-4 text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              />

              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="w-full bg-primary-600 text-white rounded-xl py-3 font-semibold text-sm mt-3 hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                보내기
              </button>

              {/* 카톡 오픈채팅 */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400 mb-2">더 자세한 이야기를 나누고 싶다면?</p>
                <a
                  href={KAKAO_OPEN_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-500 transition-all"
                >
                  💬 카카오톡 오픈채팅 참여
                </a>
              </div>
            </>
          ) : (
            /* 감사 메시지 */
            <div className="text-center py-6">
              <p className="text-4xl mb-3">🙏</p>
              <h3 className="text-lg font-bold text-slate-800">감사합니다!</h3>
              <p className="text-sm text-slate-500 mt-2">
                소중한 의견 잘 반영하겠습니다
              </p>
              <button
                onClick={handleClose}
                className="mt-4 bg-primary-600 text-white rounded-xl px-6 py-3 font-semibold text-sm hover:bg-primary-700 transition-all"
              >
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
