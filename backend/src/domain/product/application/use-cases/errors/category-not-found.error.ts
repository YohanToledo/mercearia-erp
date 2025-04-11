import { UseCaseError } from '@/core/errors/use-case-error'
import { ConflictException, HttpException } from '@nestjs/common'

export class CategoryNotFoundError extends Error implements UseCaseError {
  constructor(categoryId: number) {
    super(`Category ${categoryId} not found.`)
  }

  toHttpException(): HttpException {
    return new ConflictException(this.message)
  }
}
