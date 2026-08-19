import styled from 'styled-components'

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
`

export const Thead = styled.thead`
  background: var(--color-ivory-dim);
`

export const Th = styled.th`
  text-align: left;
  padding: 0.85rem 1.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-gray);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

export const Td = styled.td`
  padding: 0.9rem 1.25rem;
  font-size: 0.95rem;
  color: var(--color-ink);
  border-top: 1px solid var(--color-ivory-dim);
`

export const Tr = styled.tr`
  &:hover td {
    background: var(--color-ivory-dim);
  }
`

export const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  color: var(--color-gray);
  font-size: 0.95rem;
`