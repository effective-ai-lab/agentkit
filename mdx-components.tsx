import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Mermaid } from './app/components/Mermaid'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components) {
  return {
    ...docsComponents,
    ...components,
    pre: ({ children, ...props }) => {
      const child = children as any
      if (
        child?.props?.className === 'language-mermaid' ||
        child?.props?.['data-language'] === 'mermaid'
      ) {
        return <Mermaid chart={child.props.children as string} />
      }
      const Pre = docsComponents.pre ?? 'pre'
      return <Pre {...props}>{children}</Pre>
    },
  }
}
