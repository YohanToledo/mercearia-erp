import { Either, right } from '@/core/either'
import { Role } from '@/domain/account/enterprise/entities/role'
import { Injectable } from '@nestjs/common'

import { RoleRepository } from '../repositories/role.repository'

interface FetchRolesUseCaseRequest {
  page: number
  limit: number
}

type FetchRolesUseCaseResponse = Either<
  null,
  { roles: Role[]; totalElements: number }
>

@Injectable()
export class FetchRolesUseCase {
  constructor(private roleRepository: RoleRepository) { }

  async execute(
    request: FetchRolesUseCaseRequest,
  ): Promise<FetchRolesUseCaseResponse> {
    const { page, limit } = request

    const { roles, total: totalElements } = await this.roleRepository.findMany(
      { page, limit },
    )

    return right({
      roles,
      totalElements,
    })
  }
}
