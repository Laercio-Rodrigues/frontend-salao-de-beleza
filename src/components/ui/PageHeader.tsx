import type { ReactNode } from 'react'
import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: 1.75rem;
`

interface PageHeaderProps {
  title: string
  children?: ReactNode
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <Header>
      <Title>{title}</Title>
      {children}
    </Header>
  )
}
