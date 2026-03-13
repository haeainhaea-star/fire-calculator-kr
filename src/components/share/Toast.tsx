'use client'

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  show: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ message, show, onClose, duration = 2000 }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 300)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  if (!show && !visible) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
      <div
        className={`bg-slate-800 text-white text-sm px-5 py-3 rounded-xl shadow-lg transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {message}
      </div>
    </div>
  )
}
