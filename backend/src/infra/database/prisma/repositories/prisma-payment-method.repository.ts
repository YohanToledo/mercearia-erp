import { PaginationParams } from '@/core/repositories/pagination-params'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { PaymentMethodRepository } from '@/domain/payment/application/repositories/payment-method.repository'
import { PaymentMethod } from '@/domain/payment/enterprise/entities/payment-method'
import { PrismaPaymentMethodTransformer } from '../transformers/prisma-payment-method.transformer'

@Injectable()
export class PrismaPaymentMethodRepository implements PaymentMethodRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(
    { page, limit }: PaginationParams,
    filters?: { search?: string, active?: boolean },
  ): Promise<{ methods: PaymentMethod[]; total: number }> {
    const { search, active } = filters || {}

    const whereConditions: Prisma.PaymentMethodWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
      ...(active !== undefined && { active }),
    }

    const total = await this.prisma.paymentMethod.count({
      where: whereConditions,
    })

    const methods = await this.prisma.paymentMethod.findMany({
      where: whereConditions,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      methods: methods.map(PrismaPaymentMethodTransformer.toDomain),
      total,
    }
  }

  async findById(id: number): Promise<PaymentMethod | null> {
    const method = await this.prisma.paymentMethod.findUnique({
      where: { id },
    })

    if (!method) {
      return null
    }

    return PrismaPaymentMethodTransformer.toDomain(method)
  }

  async save(method: Partial<PaymentMethod>): Promise<void> {
    const data = PrismaPaymentMethodTransformer.toPrismaUpdate(method)
    await this.prisma.paymentMethod.update(data)
  }

  async create(method: PaymentMethod): Promise<PaymentMethod> {
    const data = PrismaPaymentMethodTransformer.toPrisma(method)

    const created = await this.prisma.paymentMethod.create({
      data,
    })

    return PrismaPaymentMethodTransformer.toDomain(created)
  }
}
