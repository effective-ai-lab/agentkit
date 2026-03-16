# CLAUDE.md

## 프로젝트 개요

**agentkit** — Nextra 4 기반 한국어 워크숍 교육 사이트

- 워크숍 주제: AI 도구로 프롬프트 증강기를 만들며 반복을 자산(AGENTS.md)으로 만드는 과정
- 3세션 구성: 만든다(양) → 반복 발견 → 자산화(질)
- 실무 사례(cases) 섹션 포함

## 기술 스택

- **프레임워크**: Next.js 15 + Nextra 4 (nextra-theme-docs)
- **콘텐츠**: MDX 파일 (`content/` 디렉터리)
- **스타일**: CSS Custom Properties (`app/global.css`)
- **빌드**: `npm run build` (next build + pagefind 검색 인덱스)
- **개발**: `npm run dev`

## 디렉터리 구조

```
content/
  _meta.js          # 최상위 네비게이션 (워크숍, 실무 사례)
  index.mdx          # 홈페이지
  workshop/          # 워크숍 콘텐츠
    session-1/       # Gemini Canvas, AI Studio
    session-2/       # Lovable
    session-3/       # AGENTS.md 자산화
  cases/             # 실무 사례 모음
app/
  global.css         # 전역 스타일 (Notion 스타일 디자인 시스템)
```

## MDX 작성 규칙

### 한글 볼드/이탤릭 처리

MDX 파서(remark/micromark)는 `**볼드**` 앞뒤로 한글이 바로 붙으면 파싱에 실패합니다.

- BAD: `공동창업자인 **안드레 카파시**는`
- GOOD: `공동창업자인 <strong>안드레 카파시</strong>는`

**규칙: 한글 텍스트 사이에서 볼드/이탤릭을 쓸 때는 `<strong>`, `<em>` HTML 태그를 사용한다.**

예외적으로 아래 경우는 `**` 마크다운이 정상 동작합니다:
- 줄의 시작: `**목표**: 같은 프롬프트...`
- 앞뒤에 공백이 있는 경우: `초반에는 **다양하게, 많이** 써봐야`
- 리스트 항목 시작: `- **여러 도구를 동시에 쓴다** — ...`

### Nextra 컴포넌트

자주 사용하는 import:
```jsx
import { Steps, Callout, Cards } from 'nextra/components'
```

### 콘텐츠 작성 컨벤션

- 콘텐츠 언어: 한국어
- `_meta.js`로 사이드바 순서와 제목 관리
- YouTube 임베드: `<iframe>` + `style={{ aspectRatio: '16/9' }}` 사용
- 외부 링크: `[텍스트](URL)` 형식

## 커밋 & 배포

- auto-commit hook이 Write/Edit 후 자동으로 커밋 & 푸시 실행
- 커밋 메시지 언어: 한국어
