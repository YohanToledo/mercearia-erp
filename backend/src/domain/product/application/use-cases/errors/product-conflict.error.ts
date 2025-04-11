import { UseCaseError } from '@/core/errors/use-case-error'
import { ConflictException, HttpException } from '@nestjs/common'

export class ProductConflictError extends Error implements UseCaseError {
  constructor() {
    super(`Error to create product.`)
  }

  toHttpException(): HttpException {
    return new ConflictException(this.message)
  }
}
