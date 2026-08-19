import { api } from '../../api/client'

export interface Client {
  id: string
  name: string
  phone: string
  email?: string
  notes?: string
}

export type ClientInput = Omit<Client, 'id'>

export async function listClients() {
  const response = await api.get<Client[]>('/clients')
  return response.data
}

export async function createClient(data: ClientInput) {
  const response = await api.post<Client>('/clients', data)
  return response.data
}

export async function updateClient(id: string, data: Partial<ClientInput>) {
  const response = await api.put<Client>(`/clients/${id}`, data)
  return response.data
}

export async function deleteClient(id: string) {
  await api.delete(`/clients/${id}`)
}