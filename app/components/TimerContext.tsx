'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface TimerContextValue {
  visible: boolean
  setVisible: (v: boolean) => void
}

const TimerContext = createContext<TimerContextValue>({ visible: true, setVisible: () => {} })

export function TimerProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true)
  return (
    <TimerContext.Provider value={{ visible, setVisible }}>
      {children}
    </TimerContext.Provider>
  )
}

export function useTimerVisibility() {
  return useContext(TimerContext)
}
