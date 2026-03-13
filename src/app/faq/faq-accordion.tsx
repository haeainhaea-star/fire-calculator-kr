'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

interface FAQ {
  question: string
  answer: string
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    const isOpening = openIndex !== index
    setOpenIndex(isOpening ? index : null)
    if (isOpening) {
      trackEvent('faq_item_click' as any, { question: faqs[index].question.slice(0, 50) })
    }
  }

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <button
            onClick={() => toggle(i)}
            className="w-full px-4 py-4 flex items-center justify-between text-left"
            aria-expanded={openIndex === i}
          >
            <h3 className="text-sm font-semibold text-slate-700 pr-4">
              {faq.question}
            </h3>
            <span
              className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
            >
              ▾
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-4 pb-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
