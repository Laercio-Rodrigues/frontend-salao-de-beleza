import styled from 'styled-components'
import type { AppointmentStatus } from './appointments.api'

const statusInfo: Record<AppointmentStatus, { label: string; bg: string; color: string }> = {
  SCHEDULED: {
    label: 'Agendado',
    bg: 'rgba(184, 137, 79, 0.14)',
    color: 'var(--color-gold)',
  },
  DONE: {
    label: 'Concluído',
    bg: 'rgba(107, 143, 113, 0.14)',
    color: 'var(--color-success)',
  },
  CANCELED: {
    label: 'Cancelado',
    bg: 'rgba(162, 62, 54, 0.14)',
    color: 'var(--color-danger)',
  },
}

const Badge = styled.span<{ $status: AppointmentStatus }>`
  display: inline-block;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $status }) => statusInfo[$status].bg};
  color: ${({ $status }) => statusInfo[$status].color};
`

interface StatusBadgeProps {
  status: AppointmentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge $status={status}>{statusInfo[status].label}</Badge>
}