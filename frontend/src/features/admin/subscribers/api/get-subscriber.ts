import { api } from '@/lib/axios'

export interface GetSubscriberQuery {
  page?: number | null
  limit?: number | null
  search?: string | null
}

export interface GetSubscriberResponse {
  content: {
    id: string
    name: string
    email: string
    type: 'ADMIN' | 'COMMON'
    status: 'ACTIVED' | 'DISABLED'
  }[]
  page: {
    current: number
    size: number
    totalCount: number
    totalPages: number
  }
}

export async function getSubscribers({
  page,
  limit,
  search,
}: GetSubscriberQuery) {
  const response = await api.get<GetSubscriberResponse>('/subscribers', {
    params: {
      page,
      limit,
      name: search,
    },
  })

  return {
    subscribers: response.data.content,
    meta: response.data.page,
  }
}
