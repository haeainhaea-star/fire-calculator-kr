'use client'

import { create } from 'zustand'
import { type CalculatorInput, type CalculatorResult, calculate } from '@/lib/calculator'

interface CalculatorState {
  // 현재 단계
  step: number
  setStep: (step: number) => void

  // 입력 값
  input: CalculatorInput
  updateInput: (partial: Partial<CalculatorInput>) => void

  // 결과
  result: CalculatorResult | null
  runCalculation: () => void

  // 피드백 모달
  showFeedback: boolean
  setShowFeedback: (show: boolean) => void
}

const defaultInput: CalculatorInput = {
  age: 30,
  monthlyIncome: 400,
  monthlySaving: 150,
  currentAssets: 5000,
  targetRetireAge: 45,
  monthlyExpense: 250,
  expectedReturn: 7,
  inflationRate: 3,
  withdrawalRate: 3.5,
  sideIncome: 100,
  sideIncomeYears: 10,
  pensionStartAge: 65,
  monthlyPension: 80,
  withdrawalStrategy: 'selfDividend',
}

export const useCalculator = create<CalculatorState>((set, get) => ({
  step: 1,
  setStep: (step) => set({ step }),

  input: defaultInput,
  updateInput: (partial) =>
    set((state) => ({
      input: { ...state.input, ...partial },
    })),

  result: null,
  runCalculation: () => {
    const result = calculate(get().input)
    set({ result })
  },

  showFeedback: false,
  setShowFeedback: (show) => set({ showFeedback: show }),
}))
