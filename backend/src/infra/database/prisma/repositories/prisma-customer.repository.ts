import { PaginationParams } from '@/core/repositories/pagination-params'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { Customer, CustomerStatus } from '@/domain/customer/enterprise/entities/customer';
import { PrismaCustomerTransformer } from '../transformers/prisma-customer.transformer';
import { CustomerRepository } from '@/domain/customer/application/repositories/customer.repository';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(
    { page, limit }: PaginationParams,
    filters?: { search?: string, status?: CustomerStatus },
  ): Promise<{ customers: Customer[]; total: number }> {
    const { search, status } = filters || {}

    const whereConditions: Prisma.CustomerWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
      ...(status && { status: status }),
    }

    const total = await this.prisma.customer.count({
      where: whereConditions,
    })

    const customers = await this.prisma.customer.findMany({
      where: whereConditions,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      customers: customers.map(PrismaCustomerTransformer.toDomain),
      total,
    }
  }

  async findById(id: number): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomerTransformer.toDomain(customer)
  }

  async save(customer: Partial<Customer>): Promise<void> {
    const data = PrismaCustomerTransformer.toPrismaUpdate(customer)
    await this.prisma.customer.update(data)
  }

  async create(customer: Customer): Promise<Customer> {
    const data = PrismaCustomerTransformer.toPrisma(customer)

    const createdCustomer = await this.prisma.customer.create({
      data,
    })

    return Customer.create(createdCustomer, createdCustomer.id)
  }

  async softDelete(customer: Customer): Promise<void> {
    const data = PrismaCustomerTransformer.toPrisma(customer)

    await this.prisma.customer.update({
      where: { id: data.id },
      data: {
        status: 'DELETED',
      },
    })
  }
}
