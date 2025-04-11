import { api } from '@/lib/axios'

export interface ValidateTokenRequest {
  token: string | null
}

export async function validateToken({ token }: ValidateTokenRequest) {
  await api.post('/sessions/validate', { token })
}
