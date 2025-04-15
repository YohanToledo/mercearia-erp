import { ExpenseCategory } from '@/domain/expense/enterprise/entities/expense-category'
import { Prisma, ExpenseCategory as PrismaExpenseCategory } from '@prisma/client'

export class PrismaExpenseCategoryTransformer {
  static toDomain(raw: PrismaExpenseCategory): ExpenseCategory {
    return ExpenseCategory.create(
      {
        name: raw.name,
        description: raw.description,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(category: ExpenseCategory): Prisma.ExpenseCategoryUncheckedCreateInput {
    return {
      name: category.name,
      description: category.description,
    }
  }

   static toPrismaUpdate(category: Partial<ExpenseCategory>): Prisma.ExpenseCategoryUpdateArgs {
      if (!category.id) {
        throw new Error('ExpenseCategory ID is required to perform an update')
      }
  
      return {
        where: {
          id: category.id,
        },
        data: {
          name: category.name,
          description: category.description,
        },
      }
    }
}
