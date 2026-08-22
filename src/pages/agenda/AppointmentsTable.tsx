import { Table, Thead, Th, Td, Tr, EmptyState, Button } from '../../components/ui'
import { StatusBadge } from './StatusBadge'
import type { Appointment } from './appointments.api'

function formatTime(isoDate: string) {
  return new Date(isoDate).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

interface AppointmentsTableProps {
  appointments: Appointment[]
  onMarkDone: (appointment: Appointment) => void
  onCancel: (appointment: Appointment) => void
  onDelete: (appointment: Appointment) => void
}

export function AppointmentsTable({
  appointments,
  onMarkDone,
  onCancel,
  onDelete,
}: AppointmentsTableProps) {
  if (appointments.length === 0) {
    return <EmptyState>Nenhum agendamento para esse dia.</EmptyState>
  }

  return (
    <Table>
      <Thead>
        <tr>
          <Th>Horário</Th>
          <Th>Cliente</Th>
          <Th>Profissional</Th>
          <Th>Serviço</Th>
          <Th>Status</Th>
          <Th></Th>
        </tr>
      </Thead>
      <tbody>
        {appointments.map((appointment) => (
          <Tr key={appointment.id}>
            <Td style={{ fontFamily: 'var(--font-mono)' }}>
              {formatTime(appointment.date)}
            </Td>
            <Td>{appointment.client.name}</Td>
            <Td>{appointment.professional.name}</Td>
            <Td>{appointment.service.name}</Td>
            <Td>
              <StatusBadge status={appointment.status} />
            </Td>
            <Td>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {appointment.status === 'SCHEDULED' && (
                  <>
                    <Button $variant="secondary" onClick={() => onMarkDone(appointment)}>
                      Concluir
                    </Button>
                    <Button $variant="secondary" onClick={() => onCancel(appointment)}>
                      Cancelar
                    </Button>
                  </>
                )}
                <Button $variant="danger" onClick={() => onDelete(appointment)}>
                  Remover
                </Button>
              </div>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )
}
