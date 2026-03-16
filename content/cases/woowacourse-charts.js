export const layerChart = `block-beta
  columns 1
  block:L3:1
    columns 1
    L3Title["Layer 3. 교육 철학 · 디자인 패턴"]
    L3Desc["반복되는 도구·패턴에서 왜 이것이 효과적인가를 추출해 교육 철학과 디자인 패턴으로 정제"]
  end
  block:L2:1
    columns 1
    L2Title["Layer 2. 도구화"]
    L2Desc["raw 데이터에서 반복되는 패턴을 발견하고 재사용 가능한 도구·템플릿·가이드로 구조화"]
  end
  block:L1:1
    columns 1
    L1Title["Layer 1. Raw 데이터 (교육 실험 기록)"]
    L1Desc["각 교육자가 매주 기록하는 교육 실험의 원본 데이터"]
  end
  L1 --> L2 --> L3
  style L3 fill:#f0e6ff,stroke:#7c3aed
  style L2 fill:#e0f2fe,stroke:#0284c7
  style L1 fill:#ecfdf5,stroke:#059669`

export const cycleChart = `flowchart LR
  A["교육자 A 실험 기록"] --> P["패턴 발견"]
  B["교육자 B 실험 기록"] --> P
  C["교육자 C 실험 기록"] --> P
  P --> T["도구화"]
  T --> E["에센스 추출"]
  E -->|"에센스가 다음 실험을 안내"| P
  style A fill:#ecfdf5,stroke:#059669
  style B fill:#ecfdf5,stroke:#059669
  style C fill:#ecfdf5,stroke:#059669
  style P fill:#e0f2fe,stroke:#0284c7
  style T fill:#e0f2fe,stroke:#0284c7
  style E fill:#f0e6ff,stroke:#7c3aed`
