import { useState, type SyntheticEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button, TextField, Select, Alert } from '../../components/ui'
import { listClients } from '../clients/clients.api'
import { listProfessionals } from '../professionals/professionals.api'
import { listServices } from '../services/services.api'
import type { AppointmentInput } from './appointments.api'

interface AppointmentFormProps {
  defaultDate: string
  onSubmit: (data: AppointmentInput) => void
  onCancel: () => void
  isSubmitting: boolean
  errorMessage?: string
}

export function AppointmentForm({
  defaultDate,
  onSubmit,
  onCancel,
  isSubmitting,
  errorMessage,
}: AppointmentFormProps) {
  const [dateTime, setDateTime] = useState(`${defaultDate}T09:00`)
  const [clientId, setClientId] = useState('')
  const [professionalId, setProfessionalId] = useState('')
  const [serviceId, setServiceId] = useState('')

  const { data: clients } = useQuery({ queryKey: ['clients'], queryFn: listClients })
  const { data: professionals } = useQuery({
    queryKey: ['professionals'],
    queryFn: listProfessionals,
  })
  const { data: services } = useQuery({ queryKey: ['services'], queryFn: listServices })

  // function handleSubmit(event: SyntheticEvent) {
  //   event.preventDefault()
  //   onSubmit({
  //     date: new Date(dateTime).toISOString(),
  //     clientId,
  //     professionalId,
  //     serviceId,
  //   })
  // }

function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    
    // Cria um objeto Date usando o valor local do input e converte para ISO completo com o fuso correto do navegador
    const localDate = new Date(dateTime)

    onSubmit({
      date: localDate.toISOString(),
      clientId,
      professionalId,
      serviceId,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <TextField
        label="Data e hora"
        type="datetime-local"
        value={dateTime}
        onChange={(event) => setDateTime(event.target.value)}
        required
      />

      <Select
        label="Cliente"
        value={clientId}
        onChange={(event) => setClientId(event.target.value)}
        required
      >
        <option value="">Selecione um cliente</option>
        {clients?.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </Select>

      <Select
        label="Profissional"
        value={professionalId}
        onChange={(event) => setProfessionalId(event.target.value)}
        required
      >
        <option value="">Selecione um profissional</option>
        {professionals?.map((professional) => (
          <option key={professional.id} value={professional.id}>
            {professional.name}
          </option>
        ))}
      </Select>

      <Select
        label="Serviço"
        value={serviceId}
        onChange={(event) => setServiceId(event.target.value)}
        required
      >
        <option value="">Selecione um serviço</option>
        {services?.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name} ({service.durationMin} min)
          </option>
        ))}
      </Select>

      {errorMessage && <Alert role="alert">{errorMessage}</Alert>}

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Agendando...' : 'Agendar'}
        </Button>
        <Button type="button" $variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}