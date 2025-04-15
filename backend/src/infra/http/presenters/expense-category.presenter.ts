import { ExpenseCategory } from "@/domain/expense/enterprise/entities/expense-category";

export class ExpenseCategoryPresenter {
  static toHTTP(category: ExpenseCategory) {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      ...(category.createdAt && { createdAt: category.createdAt.toISOString() }),
      ...(category.updatedAt && { updatedAt: category.updatedAt.toISOString() }),
    }
  }
}
