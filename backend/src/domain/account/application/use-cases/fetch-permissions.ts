import { Either, right } from '@/core/either'
import { Permission } from '@/domain/account/enterprise/entities/permission'
import { Injectable } from '@nestjs/common'

import { PermissionRepository } from '../repositories/permission.repository'

interface FetchPermissionsUseCaseRequest {
  page: number
  limit: number
}

type FetchPermissionsUseCaseResponse = Either<
  null,
  { permissions: Permission[]; totalElements: number }
>

@Injectable()
export class FetchPermissionsUseCase {
  constructor(private permissionRepository: PermissionRepository) { }

  async execute(
    request: FetchPermissionsUseCaseRequest,
  ): Promise<FetchPermissionsUseCaseResponse> {
    const { page, limit } = request

    const { permissions, total: totalElements } = await this.permissionRepository.findMany(
      { page, limit },
    )

    return right({
      permissions,
      totalElements,
    })
  }
}
