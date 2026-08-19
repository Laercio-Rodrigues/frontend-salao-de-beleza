import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Table, Thead, Th, Td, Tr, EmptyState, Modal } from '../../components/ui'
import {
  listServices,
  createService,
  updateService,
  deleteService,
  type Service,
  type ServiceInput,
} from './services.api'
import { ServiceForm } from './ServiceForm'

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)

  const queryClient = useQueryClient()

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: listServices,
  })

  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      setModalOpen(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: ServiceInput) => updateService(editing!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      setModalOpen(false)
      setEditing(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })

  function openCreateModal() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEditModal(service: Service) {
    setEditing(service)
    setModalOpen(true)
  }

  function handleDelete(service: Service) {
    if (confirm(`Remover ${service.name}?`)) {
      deleteMutation.mutate(service.id)
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
          Serviços
        </h1>
        <Button onClick={openCreateModal}>Novo serviço</Button>
      </div>

      {isLoading && <p>Carregando...</p>}

      {!isLoading && services?.length === 0 && (
        <EmptyState>Nenhum serviço cadastrado ainda.</EmptyState>
      )}

      {!isLoading && services && services.length > 0 && (
        <Table>
          <Thead>
            <tr>
              <Th>Nome</Th>
              <Th>Duração</Th>
              <Th>Preço</Th>
              <Th></Th>
            </tr>
          </Thead>
          <tbody>
            {services.map((service) => (
              <Tr key={service.id}>
                <Td>{service.name}</Td>
                <Td>{service.durationMin} min</Td>
                <Td style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatPrice(service.price)}
                </Td>
                <Td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button $variant="secondary" onClick={() => openEditModal(service)}>
                      Editar
                    </Button>
                    <Button $variant="danger" onClick={() => handleDelete(service)}>
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
          title={editing ? 'Editar serviço' : 'Novo serviço'}
          onClose={() => setModalOpen(false)}
        >
          <ServiceForm
            initialData={editing ?? undefined}
            isSubmitting={isSaving}
            onCancel={() => setModalOpen(false)}
            onSubmit={(data) => {
              if (editing) {
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