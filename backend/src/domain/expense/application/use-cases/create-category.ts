import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ExpenseCategoryRepository } from '../repositories/expense-category.repository'
import { ExpenseCategory } from '../../enterprise/entities/expense-category'
import { ExpenseCategoryConflictError } from './errors/category-conflict.error'

interface CreateExpenseCategoryUseCaseRequest {
  name: string
  description: string
}

type CreateExpenseCategoryUseCaseResponse = Either<ExpenseCategoryConflictError, ExpenseCategory>

@Injectable()
export class CreateExpenseCategoryUseCase {
  constructor(
    private categoryRepository: ExpenseCategoryRepository
  ) { }

  async execute(
    request: CreateExpenseCategoryUseCaseRequest,
  ): Promise<CreateExpenseCategoryUseCaseResponse> {
    const { name, description } = request

    const category = ExpenseCategory.create({
      name,
      description,
      
    })

    const createdExpenseCategory = await this.categoryRepository.create(category)

    return right(createdExpenseCategory)
  }
}
