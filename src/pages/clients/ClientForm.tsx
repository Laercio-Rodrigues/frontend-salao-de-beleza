import { useState, type SyntheticEvent } from 'react'
import { Button, TextField } from '../../components/ui'
import type { Client, ClientInput } from './clients.api'

interface ClientFormProps {
  initialData?: Client
  onSubmit: (data: ClientInput) => void
  onCancel: () => void
  isSubmitting: boolean
}

export function ClientForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ClientFormProps) {
  const [name, setName] = useState(initialData?.name ?? '')
  const [phone, setPhone] = useState(initialData?.phone ?? '')
  const [email, setEmail] = useState(initialData?.email ?? '')
  const [notes, setNotes] = useState(initialData?.notes ?? '')

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    onSubmit({ name, phone, email: email || undefined, notes: notes || undefined })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <TextField
        label="Nome"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        autoFocus
      />
      <TextField
        label="Telefone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        required
        placeholder="66999998888"
      />
      <TextField
        label="E-mail (opcional)"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label="Observações (opcional)"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
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