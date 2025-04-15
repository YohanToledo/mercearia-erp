import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ExpenseCategory } from '../../enterprise/entities/expense-category'
import { ExpenseCategoryRepository } from '../repositories/expense-category.repository'

interface FetchExpenseCategoriesUseCaseRequest {
  page: number
  limit: number
  filters: {
    search?: string
  }
}

type FetchExpenseCategoriesUseCaseResponse = Either<
  null,
  { categories: ExpenseCategory[]; totalElements: number }
>

@Injectable()
export class FetchExpenseCategoriesUseCase {
  constructor(private categoryRepository: ExpenseCategoryRepository) { }

  async execute(
    request: FetchExpenseCategoriesUseCaseRequest,
  ): Promise<FetchExpenseCategoriesUseCaseResponse> {
    const { page, limit, filters } = request

    const { categories, total: totalElements } = await this.categoryRepository.findMany(
      { page, limit },
      filters,
    )

    return right({
      categories,
      totalElements,
    })
  }
}
