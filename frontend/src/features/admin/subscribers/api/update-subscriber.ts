import { api } from '@/lib/axios'

export interface UpdateSubscriberParams {
  id: string
}

export interface UpdateSubscriberBody {
  name: string
  email: string
  type: 'ADMIN' | 'COMMON'
}

export async function updateSubscriber({
  id,
  name,
  email,
  type,
}: UpdateSubscriberBody & UpdateSubscriberParams) {
  await api.patch(`/subscribers/${id}`, { name, email, type })
}
