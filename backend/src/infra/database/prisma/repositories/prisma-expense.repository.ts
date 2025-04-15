import { PaginationParams } from '@/core/repositories/pagination-params'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { ExpenseRepository } from '@/domain/expense/application/repositories/expense.repository'
import { Expense, ExpenseStatus } from '@/domain/expense/enterprise/entities/expense'
import { PrismaExpenseTransformer } from '../transformers/prisma-expense.transformer'

@Injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  constructor(private prisma: PrismaService) { }

  async findMany(
    { page, limit }: PaginationParams,
    filters?: { search?: string, status?: ExpenseStatus },
  ): Promise<{ expenses: Expense[]; total: number }> {
    const { search, status } = filters || {}

    const whereConditions: Prisma.ExpenseWhereInput = {
      ...(search && {
        OR: [
          { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
      ...(status && { status: status }),
    }

    const total = await this.prisma.expense.count({
      where: whereConditions,
    })

    const expenses = await this.prisma.expense.findMany({
      where: whereConditions,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      expenses: expenses.map(PrismaExpenseTransformer.toDomain),
      total,
    }
  }

  async countExpensesByCategory(categoryId: number): Promise<number> {
    return this.prisma.expense.count({
      where: {
        categoryId,
      },
    })
  }

  async findById(id: number): Promise<Expense | null> {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    })

    if (!expense) {
      return null
    }

    return PrismaExpenseTransformer.toDomain(expense)
  }

  async save(expense: Partial<Expense>): Promise<void> {
    const data = PrismaExpenseTransformer.toPrismaUpdate(expense)
    await this.prisma.expense.update(data)
  }

  async create(expense: Expense): Promise<Expense> {
    const data = PrismaExpenseTransformer.toPrisma(expense)

    const createdExpense = await this.prisma.expense.create({
      data,
    })

    return PrismaExpenseTransformer.toDomain(createdExpense)
  }
}
