import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ExpenseCategoryRepository } from '../repositories/expense-category.repository'
import { ExpenseCategory } from '../../enterprise/entities/expense-category'

interface FetchExpenseCategoryUseCaseRequest {
  id: number
}

type FetchExpenseCategoryUseCaseResponse = Either<
  ResourceNotFoundError,
  ExpenseCategory
>

@Injectable()
export class FetchExpenseCategoryUseCase {
  constructor(private categoryRepository: ExpenseCategoryRepository) { }

  async execute(
    { id }: FetchExpenseCategoryUseCaseRequest,
  ): Promise<FetchExpenseCategoryUseCaseResponse> {
    const category = await this.categoryRepository.findById(id)

    if (!category) {
      return left(new ResourceNotFoundError())
    }

    return right(category)
  }
}
