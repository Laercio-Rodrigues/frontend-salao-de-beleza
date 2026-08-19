import type { ReactNode } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(33, 28, 30, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 50;
`

const Panel = styled.div`
  background: var(--color-ivory);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lift);
  width: 100%;
  max-width: 460px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`

const Title = styled.h2`
  font-size: 1.4rem;
  color: var(--color-ink);
`

interface ModalProps {
  title: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ title, onClose, children }: ModalProps) {
  return (
    <Overlay
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <Panel role="dialog" aria-modal="true" aria-label={title}>
        <Title>{title}</Title>
        {children}
      </Panel>
    </Overlay>
  )
}