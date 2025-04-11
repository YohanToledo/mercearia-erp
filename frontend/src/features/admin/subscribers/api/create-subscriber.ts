import { api } from '@/lib/axios'

export interface CreateSubscriberBody {
  name: string
  email: string
  type: 'ADMIN' | 'COMMON'
}

export async function createSubscriber(data: CreateSubscriberBody) {
  await api.post(`/subscribers`, data)
}
