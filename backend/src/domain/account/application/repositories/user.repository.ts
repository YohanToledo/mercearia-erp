import { PaginationParams } from '@/core/repositories/pagination-params'

import { User } from '../../enterprise/entities/user'

export abstract class UserRepository {
  abstract findMany(
    params: PaginationParams,
    filters?: { search?: string },
  ): Promise<{ users: User[]; total: number }>

  abstract findById(id: string): Promise<User | null>
  abstract findByUsername(username: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract save(user: User): Promise<void>
  abstract create(user: User): Promise<void>
  abstract delete(user: Partial<User>): Promise<void>
}
