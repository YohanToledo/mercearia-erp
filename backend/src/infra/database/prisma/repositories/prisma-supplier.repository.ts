import { PaginationParams } from '@/core/repositories/pagination-params'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { Supplier, SupplierStatus } from '@/domain/supplier/enterprise/entities/supplier';
import { SupplierRepository } from '@/domain/supplier/application/repositories/supplier.repository';
import { PrismaSupplierTransformer } from '../transformers/prisma-supplier.transformer';

@Injectable()
export class PrismaSupplierRepository implements SupplierRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(
    { page, limit }: PaginationParams,
    filters?: { search?: string, status?: SupplierStatus },
  ): Promise<{ suppliers: Supplier[]; total: number }> {
    const { search, status } = filters || {}

    const whereConditions: Prisma.SupplierWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
      ...(status && { status: status }),
    }

    const total = await this.prisma.supplier.count({
      where: whereConditions,
    })

    const suppliers = await this.prisma.supplier.findMany({
      where: whereConditions,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      suppliers: suppliers.map(PrismaSupplierTransformer.toDomain),
      total,
    }
  }

  async findById(id: number): Promise<Supplier | null> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    })

    if (!supplier) {
      return null
    }

    return PrismaSupplierTransformer.toDomain(supplier)
  }

  async save(supplier: Partial<Supplier>): Promise<void> {
    const data = PrismaSupplierTransformer.toPrismaUpdate(supplier)
    await this.prisma.supplier.update(data)
  }

  async create(supplier: Supplier): Promise<Supplier> {
    const data = PrismaSupplierTransformer.toPrisma(supplier)

    const createdSupplier = await this.prisma.supplier.create({
      data,
    })

    return Supplier.create(createdSupplier, createdSupplier.id)
  }

  async softDelete(supplier: Supplier): Promise<void> {
    const data = PrismaSupplierTransformer.toPrisma(supplier)

    await this.prisma.supplier.update({
      where: { id: data.id },
      data: {
        status: 'DELETED',
      },
    })
  }
}
