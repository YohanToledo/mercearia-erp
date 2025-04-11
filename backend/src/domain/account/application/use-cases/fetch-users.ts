import { Either, right } from '@/core/either'
import { User } from '@/domain/account/enterprise/entities/user'
import { Injectable } from '@nestjs/common'

import { UserRepository } from '../repositories/user.repository'

interface FetchUsersUseCaseRequest {
  page: number
  limit: number
  filters: {
    search?: string
  }
}

type FetchUsersUseCaseResponse = Either<
  null,
  { users: User[]; totalElements: number }
>

@Injectable()
export class FetchUsersUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(
    request: FetchUsersUseCaseRequest,
  ): Promise<FetchUsersUseCaseResponse> {
    const { page, limit, filters } = request

    const { users, total: totalElements } = await this.userRepository.findMany(
      { page, limit },
      filters,
    )

    return right({
      users,
      totalElements,
    })
  }
}
