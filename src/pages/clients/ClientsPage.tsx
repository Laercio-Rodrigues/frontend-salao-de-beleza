import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Table, Thead, Th, Td, Tr, EmptyState, Modal } from '../../components/ui'
import {
  listClients,
  createClient,
  updateClient,
  deleteClient,
  type Client,
  type ClientInput,
} from './clients.api'
import { ClientForm } from './ClientForm'

export function ClientsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const queryClient = useQueryClient()

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: listClients,
  })

  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      setModalOpen(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: ClientInput) => updateClient(editingClient!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      setModalOpen(false)
      setEditingClient(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  function openCreateModal() {
    setEditingClient(null)
    setModalOpen(true)
  }

  function openEditModal(client: Client) {
    setEditingClient(client)
    setModalOpen(true)
  }

  function handleDelete(client: Client) {
    if (confirm(`Remover ${client.name}? Essa ação pode ser desfeita pelo suporte.`)) {
      deleteMutation.mutate(client.id)
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem' }}>
          Clientes
        </h1>
        <Button onClick={openCreateModal}>Novo cliente</Button>
      </div>

      {isLoading && <p>Carregando...</p>}

      {!isLoading && clients?.length === 0 && (
        <EmptyState>Nenhum cliente cadastrado ainda.</EmptyState>
      )}

      {!isLoading && clients && clients.length > 0 && (
        <Table>
          <Thead>
            <tr>
              <Th>Nome</Th>
              <Th>Telefone</Th>
              <Th>E-mail</Th>
              <Th></Th>
            </tr>
          </Thead>
          <tbody>
            {clients.map((client) => (
              <Tr key={client.id}>
                <Td>{client.name}</Td>
                <Td>{client.phone}</Td>
                <Td>{client.email || '—'}</Td>
                <Td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button $variant="secondary" onClick={() => openEditModal(client)}>
                      Editar
                    </Button>
                    <Button $variant="danger" onClick={() => handleDelete(client)}>
                      Remover
                    </Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}

      {modalOpen && (
        <Modal
          title={editingClient ? 'Editar cliente' : 'Novo cliente'}
          onClose={() => setModalOpen(false)}
        >
          <ClientForm
            initialData={editingClient ?? undefined}
            isSubmitting={isSaving}
            onCancel={() => setModalOpen(false)}
            onSubmit={(data) => {
              if (editingClient) {
                updateMutation.mutate(data)
              } else {
                createMutation.mutate(data)
              }
            }}
          />
        </Modal>
      )}
    </div>
  )
}