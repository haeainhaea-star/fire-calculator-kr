'use client'

import { formatNumber } from '@/lib/calculator'

interface SliderInputProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (value: number) => void
  description?: string
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '만원',
  onChange,
  description,
}: SliderInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-20 text-right text-sm font-semibold text-primary-600 bg-primary-50 rounded-lg px-2 py-1 border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          <span className="text-xs text-slate-500">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>{formatNumber(min)}{unit}</span>
        <span>{formatNumber(max)}{unit}</span>
      </div>
      {description && (
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      )}
    </div>
  )
}
