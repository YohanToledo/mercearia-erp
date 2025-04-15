import { PaginationParams } from '@/core/repositories/pagination-params'
import { Expense, ExpenseStatus } from '../../enterprise/entities/expense';

export abstract class ExpenseRepository {
  abstract findMany(
    params: PaginationParams,
    filters?: { search?: string, status?: ExpenseStatus },
  ): Promise<{ expenses: Expense[]; total: number }>

  abstract countExpensesByCategory(categoryId: number): Promise<number>
  abstract findById(id: number): Promise<Expense | null>
  abstract save(expense: Expense): Promise<void>
  abstract create(expense: Expense): Promise<Expense>
}
