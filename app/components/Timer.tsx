'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useTimerVisibility } from './TimerContext'

interface TimerProps {
  minutes: number
  label?: string
}

const btnStyle: React.CSSProperties = {
  padding: '2px 6px',
  borderRadius: '4px',
  border: '1px solid rgba(128,128,128,0.3)',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: '12px',
  lineHeight: '20px',
  color: 'inherit',
}

export function Timer({ minutes: defaultMinutes, label }: TimerProps) {
  const { visible } = useTimerVisibility()
  const [initialMinutes, setInitialMinutes] = useState(defaultMinutes)
  const [totalSeconds, setTotalSeconds] = useState(defaultMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(String(defaultMinutes))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isRunning || totalSeconds <= 0) return
    const id = setInterval(() => {
      setTotalSeconds((s) => {
        if (s <= 1) {
          setIsRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning, totalSeconds])

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus()
  }, [isEditing])

  const reset = useCallback(() => {
    setTotalSeconds(initialMinutes * 60)
    setIsRunning(false)
    setHasStarted(false)
  }, [initialMinutes])

  const toggle = useCallback(() => {
    if (!hasStarted) setHasStarted(true)
    setIsRunning((r) => !r)
  }, [hasStarted])

  const addMinute = useCallback(() => {
    setTotalSeconds((s) => s + 60)
  }, [])

  const startEdit = useCallback(() => {
    if (isRunning) return
    setEditValue(String(Math.ceil(totalSeconds / 60)))
    setIsEditing(true)
  }, [isRunning, totalSeconds])

  const commitEdit = useCallback(() => {
    const parsed = parseInt(editValue, 10)
    if (!isNaN(parsed) && parsed > 0 && parsed <= 120) {
      setInitialMinutes(parsed)
      setTotalSeconds(parsed * 60)
      setHasStarted(false)
      setIsRunning(false)
    }
    setIsEditing(false)
  }, [editValue])

  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const ss = String(totalSeconds % 60).padStart(2, '0')
  const isFinished = totalSeconds === 0 && hasStarted

  if (!visible) return null

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 12px',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'var(--font-geist-mono, monospace)',
      background: isFinished
        ? 'rgba(239, 68, 68, 0.15)'
        : isRunning
          ? 'rgba(59, 130, 246, 0.1)'
          : 'rgba(128, 128, 128, 0.1)',
      border: `1px solid ${
        isFinished
          ? 'rgba(239, 68, 68, 0.3)'
          : isRunning
            ? 'rgba(59, 130, 246, 0.25)'
            : 'rgba(128, 128, 128, 0.2)'
      }`,
      transition: 'all 0.2s',
    }}>
      {label && (
        <span style={{ fontSize: '13px', opacity: 0.7 }}>{label}</span>
      )}
      {isEditing ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <input
            ref={inputRef}
            type="number"
            min={1}
            max={120}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEdit()
              if (e.key === 'Escape') setIsEditing(false)
            }}
            onBlur={commitEdit}
            style={{
              width: '40px',
              padding: '2px 4px',
              borderRadius: '4px',
              border: '1px solid rgba(59, 130, 246, 0.5)',
              background: 'transparent',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'inherit',
              textAlign: 'center',
              color: 'inherit',
              outline: 'none',
            }}
          />
          <span style={{ fontSize: '13px', opacity: 0.5 }}>분</span>
        </span>
      ) : (
        <span
          onClick={startEdit}
          title={isRunning ? undefined : '클릭해서 시간 변경'}
          style={{
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '1px',
            color: isFinished ? '#ef4444' : undefined,
            minWidth: '52px',
            textAlign: 'center',
            cursor: isRunning ? 'default' : 'pointer',
            borderBottom: isRunning ? 'none' : '1px dashed rgba(128,128,128,0.3)',
          }}
        >
          {mm}:{ss}
        </span>
      )}
      <div style={{ display: 'flex', gap: '4px' }}>
        <button onClick={toggle} style={{ ...btnStyle, padding: '2px 8px' }}>
          {isFinished ? '완료' : isRunning ? '⏸' : hasStarted ? '▶' : '시작'}
        </button>
        {hasStarted && (
          <>
            <button onClick={addMinute} title="+1분" style={btnStyle}>+1</button>
            <button onClick={reset} title="초기화" style={btnStyle}>↺</button>
          </>
        )}
      </div>
    </div>
  )
}
