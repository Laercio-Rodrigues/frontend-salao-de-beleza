import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Button, Modal, PageHeader } from '../../components/ui'
import {
  listAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  type Appointment,
  type AppointmentInput,
} from './appointments.api'
import { AppointmentForm } from './AppointmentForm'
import { DateNav } from './DateNav'
import { AppointmentsTable } from './AppointmentsTable'

// function todayISODate() {
//   return new Date().toISOString().slice(0, 10)
// }

function todayISODate() {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const dia = String(hoje.getDate()).padStart(2, '0')

  return `${ano}-${mes}-${dia}`
}

export function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(todayISODate())
  const [modalOpen, setModalOpen] = useState(false)
  const [formError, setFormError] = useState('')

  const queryClient = useQueryClient()

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments', selectedDate],
    queryFn: () => listAppointments(selectedDate),
  })

  const createMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      setModalOpen(false)
      setFormError('')
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 409) {
        setFormError(error.response.data.message)
      } else {
        setFormError('Não foi possível criar o agendamento. Tente novamente.')
      }
    },
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Appointment['status'] }) =>
      updateAppointmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
  })

  function openCreateModal() {
    setFormError('')
    setModalOpen(true)
  }

  function handleDelete(appointment: Appointment) {
    if (confirm(`Remover o agendamento de ${appointment.client.name}?`)) {
      deleteMutation.mutate(appointment.id)
    }
  }

  return (
    <div>
      <PageHeader title="Agenda">
        <Button onClick={openCreateModal}>Novo agendamento</Button>
      </PageHeader>

      <DateNav date={selectedDate} onChange={setSelectedDate} />

      {isLoading && <p>Carregando...</p>}

      {!isLoading && appointments && (
        <AppointmentsTable
          appointments={appointments}
          onMarkDone={(appointment) =>
            statusMutation.mutate({ id: appointment.id, status: 'DONE' })
          }
          onCancel={(appointment) =>
            statusMutation.mutate({ id: appointment.id, status: 'CANCELED' })
          }
          onDelete={handleDelete}
        />
      )}

      {modalOpen && (
        <Modal title="Novo agendamento" onClose={() => setModalOpen(false)}>
          <AppointmentForm
            defaultDate={selectedDate}
            isSubmitting={createMutation.isPending}
            errorMessage={formError}
            onCancel={() => setModalOpen(false)}
            onSubmit={(data: AppointmentInput) => createMutation.mutate(data)}
          />
        </Modal>
      )}
    </div>
  )
}