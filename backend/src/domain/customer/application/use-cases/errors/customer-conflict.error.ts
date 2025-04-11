import { UseCaseError } from '@/core/errors/use-case-error'
import { ConflictException, HttpException } from '@nestjs/common'

export class CustomerConflictError extends Error implements UseCaseError {
  constructor() {
    super(`Error to create customer.`)
  }

  toHttpException(): HttpException {
    return new ConflictException(this.message)
  }
}
