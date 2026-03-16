'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  fontFamily: 'inherit',
})

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState('')

  useEffect(() => {
    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
    mermaid.render(id, chart.trim()).then(({ svg }) => {
      setSvg(svg)
    })
  }, [chart])

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}
    />
  )
}
