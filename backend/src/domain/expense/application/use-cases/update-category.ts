import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { ExpenseCategory } from '../../enterprise/entities/expense-category'
import { ExpenseCategoryRepository } from '../repositories/expense-category.repository'

interface UpdateExpenseCategoryUseCaseRequest {
  id: number
  name?: string
  description?: string
}

type UpdateExpenseCategoryUseCaseResponse = Either<
  ResourceNotFoundError,
  ExpenseCategory
>

@Injectable()
export class UpdateExpenseCategoryUseCase {
  constructor(private categoryRepository: ExpenseCategoryRepository) { }

  async execute(
    request: UpdateExpenseCategoryUseCaseRequest,
  ): Promise<UpdateExpenseCategoryUseCaseResponse> {
    const { id } = request

    const category = await this.categoryRepository.findById(id)

    if (!category) {
      return left(new ResourceNotFoundError())
    }

    category.update(request)

    await this.categoryRepository.save(category)

    return right(category)
  }
}
