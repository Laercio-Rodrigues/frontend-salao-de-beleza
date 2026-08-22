import styled from 'styled-components'
import { Button } from '../../components/ui'

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  input {
    border: 1px solid var(--color-gray-light);
    border-radius: var(--radius-sm);
    padding: 0.6rem 0.85rem;
    font-size: 0.95rem;
  }
`

function shiftDate(date: string, days: number) {
  const next = new Date(`${date}T12:00:00`)
  next.setDate(next.getDate() + days)
  return next.toISOString().slice(0, 10)
}

interface DateNavProps {
  date: string
  onChange: (date: string) => void
}

export function DateNav({ date, onChange }: DateNavProps) {
  return (
    <Nav>
      <Button $variant="secondary" onClick={() => onChange(shiftDate(date, -1))}>
        ← Dia anterior
      </Button>
      <input
        type="date"
        value={date}
        onChange={(event) => onChange(event.target.value)}
      />
      <Button $variant="secondary" onClick={() => onChange(shiftDate(date, 1))}>
        Próximo dia →
      </Button>
    </Nav>
  )
}