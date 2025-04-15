import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Expense, ExpenseStatus } from '../../enterprise/entities/expense'
import { ExpenseRepository } from '../repositories/expense.repository'

interface FetchExpensesUseCaseRequest {
  page: number
  limit: number
  filters: {
    search?: string
    status?: ExpenseStatus
  }
}

type FetchExpensesUseCaseResponse = Either<
  null,
  { expenses: Expense[]; totalElements: number }
>

@Injectable()
export class FetchExpensesUseCase {
  constructor(private categoryRepository: ExpenseRepository) { }

  async execute(
    request: FetchExpensesUseCaseRequest,
  ): Promise<FetchExpensesUseCaseResponse> {
    const { page, limit, filters } = request

    const { expenses, total: totalElements } = await this.categoryRepository.findMany(
      { page, limit },
      filters,
    )

    return right({
      expenses,
      totalElements,
    })
  }
}
