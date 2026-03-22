import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './global.css'
import type { ReactNode } from 'react'
import { TimerProvider } from './components/TimerContext'
import { TimerToggle } from './components/TimerToggle'

export const metadata = {
  title: 'agentkit',
  description: 'AI를 제대로 일하게 만드는 법: 바이브 코딩을 넘어 에이전틱 코딩으로'
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const navbar = (
    <Navbar
      logo={
        <span className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <span className="brand-text">
            <strong>agentkit</strong>
            <small>Agentic Coding Workshop</small>
          </span>
        </span>
      }
      projectLink="https://github.com/effective-ai-lab/agentkit"
    >
      <TimerToggle />
      <ThemeSwitch lite className="navbar-theme-switch" />
    </Navbar>
  )
  const footer = (
    <Footer className="site-footer">
      <div className="footer-copy">
        <strong>agentkit</strong>
        <span>AI를 제대로 일하게 만드는 실습 가이드</span>
      </div>
    </Footer>
  )
  const pageMap = await getPageMap()

  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <TimerProvider>
          <Layout
            navbar={navbar}
            footer={footer}
            pageMap={pageMap}
            docsRepositoryBase="https://github.com/effective-ai-lab/agentkit/tree/main"
            feedback={{ content: null }}
            editLink=""
            search={<Search placeholder="문서 검색" />}
            toc={{ title: '목차', backToTop: null }}
            sidebar={{ defaultMenuCollapseLevel: 1 }}
          >
            {children}
          </Layout>
        </TimerProvider>
      </body>
    </html>
  )
}
