import { api } from '../../api/client'

export type AppointmentStatus = 'SCHEDULED' | 'DONE' | 'CANCELED'

export interface Appointment {
  id: string
  date: string
  status: AppointmentStatus
  client: { id: string; name: string; phone: string }
  professional: { id: string; name: string }
  service: { id: string; name: string; durationMin: number; price: number }
}

export interface AppointmentInput {
  date: string
  clientId: string
  professionalId: string
  serviceId: string
}

export async function listAppointments(date: string) {
  const response = await api.get<Appointment[]>('/appointments', {
    params: { date },
  })
  return response.data
}

export async function createAppointment(data: AppointmentInput) {
  const response = await api.post<Appointment>('/appointments', data)
  return response.data
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const response = await api.patch<Appointment>(`/appointments/${id}/status`, {
    status,
  })
  return response.data
}

export async function deleteAppointment(id: string) {
  await api.delete(`/appointments/${id}`)
}