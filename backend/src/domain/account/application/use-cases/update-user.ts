import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UserRepository } from '@/domain/account/application/repositories/user.repository'
import { User } from '@/domain/account/enterprise/entities/user'
import { Injectable } from '@nestjs/common'

interface UpdateUserUseCaseRequest {
  id: string
  name?: string
  email?: string
  status?: string
}

type UpdateUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: UpdateUserUseCaseRequest,
  ): Promise<UpdateUserUseCaseResponse> {
    const { id, name, email, status } = request

    const user = await this.userRepository.findById(id)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.update({ name, email })

    await this.userRepository.save(user)

    return right({
      user,
    })
  }
}
