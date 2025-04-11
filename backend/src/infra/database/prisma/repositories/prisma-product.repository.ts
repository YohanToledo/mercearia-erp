import { PaginationParams } from '@/core/repositories/pagination-params'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { ProductRepository } from '@/domain/product/application/repositories/product.repository'
import { Product, ProductStatus } from '@/domain/product/enterprise/entities/product'
import { PrismaProductTransformer } from '../transformers/prisma-product.transformer'

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(
    { page, limit }: PaginationParams,
    filters?: { search?: string, status?: ProductStatus },
  ): Promise<{ products: Product[]; total: number }> {
    const { search, status } = filters || {}

    const whereConditions: Prisma.ProductWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { status }
          //TODO: implementar search pelo code
        ],
      }),
    }

    const total = await this.prisma.product.count({
      where: whereConditions,
    })

    const products = await this.prisma.product.findMany({
      where: whereConditions,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      products: products.map(PrismaProductTransformer.toDomain),
      total,
    }
  }

  async findByCode(code: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { code },
    })

    if (!product) {
      return null
    }

    return PrismaProductTransformer.toDomain(product)
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return null
    }

    return PrismaProductTransformer.toDomain(product)
  }

  async save(product: Partial<Product>): Promise<void> {
    const data = PrismaProductTransformer.toPrismaUpdate(product)
    await this.prisma.product.update(data)
  }

  async create(product: Product): Promise<void> {
    const data = PrismaProductTransformer.toPrisma(product)

    await this.prisma.product.create({
      data,
    })
  }

  async softDelete(product: Product): Promise<void> {
    const data = PrismaProductTransformer.toPrisma(product)

    await this.prisma.product.update({
      where: { id: data.id },
      data: {
        status: 'DELETED',
      },
    })
  }
}
