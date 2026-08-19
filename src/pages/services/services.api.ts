import { api } from '../../api/client'

export interface Service {
  id: string
  name: string
  durationMin: number
  price: number
}

export type ServiceInput = Omit<Service, 'id'>

export async function listServices() {
  const response = await api.get<Service[]>('/services')
  return response.data
}

export async function createService(data: ServiceInput) {
  const response = await api.post<Service>('/services', data)
  return response.data
}

export async function updateService(id: string, data: Partial<ServiceInput>) {
  const response = await api.put<Service>(`/services/${id}`, data)
  return response.data
}

export async function deleteService(id: string) {
  await api.delete(`/services/${id}`)
}