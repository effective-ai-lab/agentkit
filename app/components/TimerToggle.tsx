'use client'

import { useTimerVisibility } from './TimerContext'

export function TimerToggle() {
  const { visible, setVisible } = useTimerVisibility()

  return (
    <button
      onClick={() => setVisible(!visible)}
      title={visible ? '타이머 숨기기' : '타이머 보이기'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        borderRadius: '6px',
        border: '1px solid rgba(128,128,128,0.2)',
        background: visible ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        cursor: 'pointer',
        fontSize: '13px',
        color: 'inherit',
        transition: 'all 0.2s',
      }}
    >
      <span style={{ fontSize: '14px' }}>{visible ? '⏱' : '⏱'}</span>
      <span style={{ opacity: visible ? 1 : 0.5 }}>
        {visible ? 'ON' : 'OFF'}
      </span>
    </button>
  )
}
