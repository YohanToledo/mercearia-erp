import { api } from '@/lib/axios'

export interface UpdateStatusSubscriberParams {
  subscriberId: string
}

export interface UpdateSubscriberStatusBody {
  status: 'ACTIVED' | 'DISABLED'
}

export async function updateSubscriberStatus({
  subscriberId,
  status,
}: UpdateSubscriberStatusBody & UpdateStatusSubscriberParams) {
  await api.patch(`/subscribers/${subscriberId}`, { status })
}
