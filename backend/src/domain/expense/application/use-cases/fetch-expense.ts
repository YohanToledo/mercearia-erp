import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Expense } from '../../enterprise/entities/expense'
import { ExpenseRepository } from '../repositories/expense.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchExpenseUseCaseRequest {
  id: number
}

type FetchExpenseUseCaseResponse = Either<
  ResourceNotFoundError,
  Expense
>

@Injectable()
export class FetchExpenseUseCase {
  constructor(private expenseRepostory: ExpenseRepository) { }

  async execute(
    { id }: FetchExpenseUseCaseRequest,
  ): Promise<FetchExpenseUseCaseResponse> {
    const expense = await this.expenseRepostory.findById(id)

    if (!expense) {
      return left(new ResourceNotFoundError())
    }

    return right(expense)
  }
}
