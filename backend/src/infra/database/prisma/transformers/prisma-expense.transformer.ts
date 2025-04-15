import { Expense } from '@/domain/expense/enterprise/entities/expense'
import { Prisma, Expense as PrismaExpense } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export class PrismaExpenseTransformer {
  static toDomain(raw: PrismaExpense): Expense {
    return Expense.create(
      {
        description: raw.description,
        amount: raw.amount.toNumber(),
        status: raw.status,
        categoryId: raw.categoryId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(expense: Expense): Prisma.ExpenseUncheckedCreateInput {
    return {
      description: expense.description,
      amount: new Decimal(expense.amount),
      status: expense.status,
      categoryId: expense.categoryId,
    }
  }

  static toPrismaUpdate(expense: Partial<Expense>): Prisma.ExpenseUpdateArgs {
    if (!expense.id) {
      throw new Error('Expense ID is required to perform an update')
    }

    return {
      where: {
        id: expense.id,
      },
      data: {
        description: expense.description,
        ...(expense.amount && { amount: new Decimal(expense.amount) }),
        status: expense.status,
        categoryId: expense.categoryId,
      },
    }
  }
}
