import { Expense } from "@/domain/expense/enterprise/entities/expense";

export class ExpensePresenter {
  static toHTTP(expense: Expense) {
    return {
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      status: expense.status,
      categoryId: expense.categoryId,
      ...(expense.createdAt && { createdAt: expense.createdAt.toISOString() }),
      ...(expense.updatedAt && { updatedAt: expense.updatedAt.toISOString() }),
    }
  }
}
