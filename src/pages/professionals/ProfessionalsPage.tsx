import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Table, Thead, Th, Td, Tr, EmptyState, Modal } from '../../components/ui'
import {
  listProfessionals,
  createProfessional,
  updateProfessional,
  deleteProfessional,
  type Professional,
  type ProfessionalInput,
} from './professionals.api'
import { ProfessionalForm } from './ProfessionalForm'

export function ProfessionalsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Professional | null>(null)

  const queryClient = useQueryClient()

  const { data: professionals, isLoading } = useQuery({
    queryKey: ['professionals'],
    queryFn: listProfessionals,
  })

  const createMutation = useMutation({
    mutationFn: createProfessional,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] })
      setModalOpen(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: ProfessionalInput) => updateProfessional(editing!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] })
      setModalOpen(false)
      setEditing(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProfessional,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] })
    },
  })

  function openCreateModal() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEditModal(professional: Professional) {
    setEditing(professional)
    setModalOpen(true)
  }

  function handleDelete(professional: Professional) {
    if (confirm(`Remover ${professional.name}?`)) {
      deleteMutation.mutate(professional.id)
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
          Profissionais
        </h1>
        <Button onClick={openCreateModal}>Novo profissional</Button>
      </div>

      {isLoading && <p>Carregando...</p>}

      {!isLoading && professionals?.length === 0 && (
        <EmptyState>Nenhum profissional cadastrado ainda.</EmptyState>
      )}

      {!isLoading && professionals && professionals.length > 0 && (
        <Table>
          <Thead>
            <tr>
              <Th>Nome</Th>
              <Th>Especialidades</Th>
              <Th>Horário</Th>
              <Th></Th>
            </tr>
          </Thead>
          <tbody>
            {professionals.map((professional) => (
              <Tr key={professional.id}>
                <Td>{professional.name}</Td>
                <Td>{professional.specialties.join(', ') || '—'}</Td>
                <Td>
                  {professional.workStart} – {professional.workEnd}
                </Td>
                <Td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                      $variant="secondary"
                      onClick={() => openEditModal(professional)}
                    >
                      Editar
                    </Button>
                    <Button $variant="danger" onClick={() => handleDelete(professional)}>
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
          title={editing ? 'Editar profissional' : 'Novo profissional'}
          onClose={() => setModalOpen(false)}
        >
          <ProfessionalForm
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