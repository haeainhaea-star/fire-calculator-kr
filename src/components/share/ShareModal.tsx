'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { CalculatorInput, CalculatorResult } from '@/lib/calculator'
import { getShareCardData, getShareUrl, getShareMessage, getTwitterShareUrl, copyToClipboard } from '@/lib/share'
import { initKakao, isKakaoReady, shareToKakao } from '@/lib/kakao'
import { trackEvent } from '@/lib/analytics'
import ShareCard from './ShareCard'
import ShareButtons from './ShareButtons'
import Toast from './Toast'

interface ShareModalProps {
  input: CalculatorInput
  result: CalculatorResult
  onClose: () => void
}

export default function ShareModal({ input, result, onClose }: ShareModalProps) {
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [kakaoReady, setKakaoReady] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const shareData = getShareCardData(input, result)
  const shareUrl = getShareUrl(input, result)

  // Kakao SDK 초기화
  useEffect(() => {
    const tryInit = () => {
      if (initKakao()) {
        setKakaoReady(true)
      }
    }
    // SDK가 아직 로드되지 않았을 수 있으므로 재시도
    tryInit()
    if (!isKakaoReady()) {
      const timer = setInterval(() => {
        tryInit()
        if (isKakaoReady()) clearInterval(timer)
      }, 500)
      return () => clearInterval(timer)
    }
  }, [])

  const showNotification = useCallback((msg: string) => {
    setToastMsg(msg)
    setShowToast(true)
  }, [])

  const handleTwitter = () => {
    window.open(getTwitterShareUrl(input, result), '_blank', 'width=600,height=400')
  }

  const handleCopyLink = async () => {
    const shareMessage = getShareMessage(input, result)
    const ok = await copyToClipboard(shareMessage)
    showNotification(ok ? '링크가 복사되었습니다!' : '복사에 실패했습니다')
  }

  const handleKakao = () => {
    shareToKakao(input, result)
  }

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="mx-auto max-w-screen-md bg-white rounded-t-2xl shadow-xl">
          {/* 핸들 */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-slate-300 rounded-full" />
          </div>

          <div className="px-5 pb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-700">결과 공유하기</h3>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                닫기
              </button>
            </div>

            {/* 카드 미리보기 */}
            <div className="bg-slate-100 rounded-xl p-3 flex justify-center overflow-hidden">
              <div className="transform scale-[0.5] origin-top" style={{ width: 600, height: 315 }}>
                <ShareCard ref={cardRef} data={shareData} />
              </div>
            </div>

            {/* 공유 버튼들 */}
            <ShareButtons
              onKakao={handleKakao}
              onTwitter={handleTwitter}
              onCopyLink={handleCopyLink}
              kakaoAvailable={kakaoReady}
            />
          </div>
        </div>
      </div>

      <Toast
        message={toastMsg}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}
