import { PaginationParams } from '@/core/repositories/pagination-params'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { ExpenseCategoryRepository } from '@/domain/expense/application/repositories/expense-category.repository'
import { ExpenseCategory } from '@/domain/expense/enterprise/entities/expense-category'
import { PrismaExpenseCategoryTransformer } from '../transformers/prisma-expense-category.transformer'

@Injectable()
export class PrismaExpenseCategoryRepository implements ExpenseCategoryRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(
    { page, limit }: PaginationParams,
    filters?: { search?: string },
  ): Promise<{ categories: ExpenseCategory[]; total: number }> {
    const { search } = filters || {}

    const whereConditions: Prisma.ExpenseCategoryWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
    }

    const total = await this.prisma.expenseCategory.count({
      where: whereConditions,
    })

    const categories = await this.prisma.expenseCategory.findMany({
      where: whereConditions,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      categories: categories.map(PrismaExpenseCategoryTransformer.toDomain),
      total,
    }
  }

  async findById(id: number): Promise<ExpenseCategory | null> {
    const expense = await this.prisma.expenseCategory.findUnique({
      where: { id },
    })

    if (!expense) {
      return null
    }

    return PrismaExpenseCategoryTransformer.toDomain(expense)
  }

  async save(expense: Partial<ExpenseCategory>): Promise<void> {
    const data = PrismaExpenseCategoryTransformer.toPrismaUpdate(expense)
    await this.prisma.expenseCategory.update(data)
  }

  async create(expense: ExpenseCategory): Promise<ExpenseCategory> {
    const data = PrismaExpenseCategoryTransformer.toPrisma(expense)

    const created = await this.prisma.expenseCategory.create({
      data,
    })

    return PrismaExpenseCategoryTransformer.toDomain(created)
  }
}
