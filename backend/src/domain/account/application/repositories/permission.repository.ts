import { PaginationParams } from '@/core/repositories/pagination-params'

import { Permission } from '../../enterprise/entities/permission'

export abstract class PermissionRepository {
  abstract findMany(
    params: PaginationParams,
  ): Promise<{ permissions: Permission[]; total: number }>

  abstract findManyByIds(ids: number[]): Promise<Permission[]>
}
