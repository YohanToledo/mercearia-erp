import { UseCaseError } from '@/core/errors/use-case-error'
import { ConflictException, HttpException } from '@nestjs/common'

export class PermissionNotFoundError extends Error implements UseCaseError {
  constructor() {
    super(`One of the permissions are not found!`)
  }

  toHttpException(): HttpException {
    return new ConflictException(this.message)
  }
}
