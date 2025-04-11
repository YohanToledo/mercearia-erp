import { PaginationParams } from '@/core/repositories/pagination-params'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { ProductCategoryRepository } from '@/domain/product/application/repositories/product-category.repository'
import { ProductCategory, ProductCategoryStatus } from '@/domain/product/enterprise/entities/product-category'
import { PrismaProductCategoryTransformer } from '../transformers/prisma-product-category.transformer'

@Injectable()
export class PrismaProductCategoryRepository implements ProductCategoryRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(
    { page, limit }: PaginationParams,
    filters?: { search?: string, status?: ProductCategoryStatus },
  ): Promise<{ categories: ProductCategory[]; total: number }> {
    const { search, status } = filters || {}

    const whereConditions: Prisma.ProductCategoryWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { status }
        ],
      }),
    }

    const total = await this.prisma.productCategory.count({
      where: whereConditions,
    })

    const categories = await this.prisma.productCategory.findMany({
      where: whereConditions,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      categories: categories.map(PrismaProductCategoryTransformer.toDomain),
      total,
    }
  }

  async findById(id: string): Promise<ProductCategory | null> {
    const product = await this.prisma.productCategory.findUnique({
      where: { id },
    })

    if (!product) {
      return null
    }

    return PrismaProductCategoryTransformer.toDomain(product)
  }

  async save(product: Partial<ProductCategory>): Promise<void> {
    const data = PrismaProductCategoryTransformer.toPrismaUpdate(product)
    await this.prisma.productCategory.update(data)
  }

  async create(product: ProductCategory): Promise<void> {
    const data = PrismaProductCategoryTransformer.toPrisma(product)

    await this.prisma.productCategory.create({
      data,
    })
  }

  async softDelete(product: ProductCategory): Promise<void> {
    const data = PrismaProductCategoryTransformer.toPrisma(product)

    await this.prisma.productCategory.update({
      where: { id: data.id },
      data: {
        status: 'DELETED',
      },
    })
  }
}
