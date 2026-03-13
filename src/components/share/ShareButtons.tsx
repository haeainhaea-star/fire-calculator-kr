'use client'

import { trackEvent } from '@/lib/analytics'

interface ShareButtonsProps {
  onKakao?: () => void
  onTwitter: () => void
  onCopyLink: () => void
  onSaveImage: () => void
  kakaoAvailable?: boolean
}

const buttons = [
  { key: 'kakao', icon: '💬', label: '카카오톡', color: 'bg-yellow-400 text-yellow-900' },
  { key: 'twitter', icon: '𝕏', label: 'X(트위터)', color: 'bg-slate-800 text-white' },
  { key: 'link', icon: '🔗', label: '링크 복사', color: 'bg-slate-100 text-slate-700' },
  { key: 'image', icon: '📸', label: '이미지 저장', color: 'bg-slate-100 text-slate-700' },
] as const

export default function ShareButtons({
  onKakao,
  onTwitter,
  onCopyLink,
  onSaveImage,
  kakaoAvailable = false,
}: ShareButtonsProps) {
  const handleClick = (key: string) => {
    switch (key) {
      case 'kakao':
        if (kakaoAvailable && onKakao) {
          trackEvent('share_kakao')
          onKakao()
        }
        break
      case 'twitter':
        trackEvent('share_twitter')
        onTwitter()
        break
      case 'link':
        trackEvent('share_copy_link')
        onCopyLink()
        break
      case 'image':
        trackEvent('share_save_image')
        onSaveImage()
        break
    }
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {buttons.map((btn) => {
        const isDisabled = btn.key === 'kakao' && !kakaoAvailable
        return (
          <button
            key={btn.key}
            onClick={() => handleClick(btn.key)}
            disabled={isDisabled}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all active:scale-95 ${
              isDisabled
                ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                : `${btn.color} hover:opacity-90`
            }`}
          >
            <span className="text-xl">{btn.icon}</span>
            <span className="text-xs font-medium">{btn.label}</span>
          </button>
        )
      })}
    </div>
  )
}
