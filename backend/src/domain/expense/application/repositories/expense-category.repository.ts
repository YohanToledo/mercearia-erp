import { PaginationParams } from '@/core/repositories/pagination-params'
import { ExpenseCategory } from '../../enterprise/entities/expense-category';

export abstract class ExpenseCategoryRepository {
  abstract findMany(
    params: PaginationParams,
    filters?: { search?: string },
  ): Promise<{ categories: ExpenseCategory[]; total: number }>

  abstract findById(id: number): Promise<ExpenseCategory | null>
  abstract save(category: ExpenseCategory): Promise<void>
  abstract create(category: ExpenseCategory): Promise<ExpenseCategory>
}
