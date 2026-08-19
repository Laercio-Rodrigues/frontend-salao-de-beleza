import { api } from '../../api/client'

export interface Professional {
  id: string
  name: string
  specialties: string[]
  workStart: string
  workEnd: string
}

export type ProfessionalInput = Omit<Professional, 'id'>

export async function listProfessionals() {
  const response = await api.get<Professional[]>('/professionals')
  return response.data
}

export async function createProfessional(data: ProfessionalInput) {
  const response = await api.post<Professional>('/professionals', data)
  return response.data
}

export async function updateProfessional(id: string, data: Partial<ProfessionalInput>) {
  const response = await api.put<Professional>(`/professionals/${id}`, data)
  return response.data
}

export async function deleteProfessional(id: string) {
  await api.delete(`/professionals/${id}`)
}