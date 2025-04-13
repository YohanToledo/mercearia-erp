import { PaginationParams } from '@/core/repositories/pagination-params'

import { Role } from '../../enterprise/entities/role'

export abstract class RoleRepository {
  abstract findMany(
    params: PaginationParams,
  ): Promise<{ roles: Role[]; total: number }>

  abstract findById(id: number): Promise<Role | null>
  abstract save(role: Role): Promise<void>
  abstract create(role: Role): Promise<Role>
  abstract delete(id: number): Promise<void>
}
