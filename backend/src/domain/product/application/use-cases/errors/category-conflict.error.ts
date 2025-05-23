import { UseCaseError } from '@/core/errors/use-case-error'
import { ConflictException, HttpException } from '@nestjs/common'

export class ProductCategoryConflictError extends Error implements UseCaseError {
  constructor(msg: string) {
    super(msg)
  }

  toHttpException(): HttpException {
    return new ConflictException(this.message)
  }
}
