import { UseCaseError } from '@/core/errors/use-case-error'
import { HttpException, NotFoundException } from '@nestjs/common'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found!')
  }

  toHttpException(): HttpException {
    return new NotFoundException(this.message)
  }
}
