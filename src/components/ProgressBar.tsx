'use client'

const steps = [
  { num: 1, label: '기본 정보' },
  { num: 2, label: '은퇴 목표' },
  { num: 3, label: '투자 전략' },
  { num: 4, label: '부가 옵션' },
]

interface ProgressBarProps {
  current: number
}

export default function ProgressBar({ current }: ProgressBarProps) {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  s.num < current
                    ? 'bg-primary-600 text-white'
                    : s.num === current
                    ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {s.num < current ? '✓' : s.num}
              </div>
              <span
                className={`text-xs mt-1 ${
                  s.num <= current ? 'text-primary-600 font-medium' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-12 sm:w-16 h-0.5 mx-1 mt-[-12px] ${
                  s.num < current ? 'bg-primary-600' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
