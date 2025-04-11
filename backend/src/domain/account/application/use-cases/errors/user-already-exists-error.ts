import { UseCaseError } from '@/core/errors/use-case-error'
import { ConflictException, HttpException } from '@nestjs/common'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`O usuário "${identifier}" already exists.`)
  }

  toHttpException(): HttpException {
    return new ConflictException(this.message)
  }
}
