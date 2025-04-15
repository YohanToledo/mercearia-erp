import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Expense, ExpenseStatus } from '../../enterprise/entities/expense'
import { ExpenseRepository } from '../repositories/expense.repository'

interface UpdateExpenseUseCaseRequest {
  id: number
  description?: string
  amount?: number
  status?: ExpenseStatus
  categoryId?: number
}

type UpdateExpenseUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    expense: Expense
  }
>

@Injectable()
export class UpdateExpenseUseCase {
  constructor(private expenseRepository: ExpenseRepository) { }

  async execute(
    request: UpdateExpenseUseCaseRequest,
  ): Promise<UpdateExpenseUseCaseResponse> {
    const { id } = request

    const expense = await this.expenseRepository.findById(id)

    if (!expense) {
      return left(new ResourceNotFoundError())
    }

    expense.update(request)

    await this.expenseRepository.save(expense)

    return right({
      expense,
    })
  }
}
