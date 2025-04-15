import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ExpenseRepository } from '../repositories/expense.repository'
import { Expense, ExpenseStatus } from '../../enterprise/entities/expense'
import { ExpenseCategoryRepository } from '../repositories/expense-category.repository'
import { CategoryNotFoundError } from './errors/category-not-found.error'
import { ExpenseConflictError } from './errors/expense-conflict.error'

interface CreateExpenseUseCaseRequest {
  description: string
  amount: number
  status: ExpenseStatus
  categoryId: number
}

type CreateExpenseUseCaseResponse = Either<ExpenseConflictError | CategoryNotFoundError, Expense>

@Injectable()
export class CreateExpenseUseCase {
  constructor(
    private expenseRepository: ExpenseRepository,
    private categoryRepository: ExpenseCategoryRepository
  ) { }

  async execute(
    request: CreateExpenseUseCaseRequest,
  ): Promise<CreateExpenseUseCaseResponse> {
    const { description, amount, status, categoryId } = request

    const category = await this.categoryRepository.findById(categoryId)
    if(!category) return left(new CategoryNotFoundError(categoryId))

    const expense = Expense.create({
      description,
      amount,
      status,
      categoryId,
    })

    const createdExpense = await this.expenseRepository.create(expense)

    return right(createdExpense)
  }
}
