import { useState, type SyntheticEvent } from 'react'
import { Button, TextField } from '../../components/ui'
import type { Service, ServiceInput } from './services.api'

interface ServiceFormProps {
  initialData?: Service
  onSubmit: (data: ServiceInput) => void
  onCancel: () => void
  isSubmitting: boolean
}

export function ServiceForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ServiceFormProps) {
  const [name, setName] = useState(initialData?.name ?? '')
  const [durationMin, setDurationMin] = useState(
    initialData?.durationMin?.toString() ?? '',
  )
  const [price, setPrice] = useState(initialData?.price?.toString() ?? '')

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    onSubmit({
      name,
      durationMin: Number(durationMin),
      price: Number(price),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <TextField
        label="Nome do serviço"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        autoFocus
      />
      <TextField
        label="Duração (minutos)"
        type="number"
        min={1}
        value={durationMin}
        onChange={(event) => setDurationMin(event.target.value)}
        required
      />
      <TextField
        label="Preço (R$)"
        type="number"
        min={0}
        step="0.01"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
        <Button type="button" $variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}