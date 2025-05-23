import { ProductCategory } from '@/domain/product/enterprise/entities/product-category'
import { Prisma, ProductCategory as PrismaProductCategory } from '@prisma/client'

export class PrismaProductCategoryTransformer {
  static toDomain(raw: PrismaProductCategory): ProductCategory {
    return ProductCategory.create(
      {
        name: raw.name,
        description: raw.description,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(category: ProductCategory): Prisma.ProductCategoryUncheckedCreateInput {
    return {
      name: category.name,
      description: category.description,
      status: category.status,
    }
  }

   static toPrismaUpdate(category: Partial<ProductCategory>): Prisma.ProductCategoryUpdateArgs {
      if (!category.id) {
        throw new Error('ProductCategory ID is required to perform an update')
      }
  
      return {
        where: {
          id: category.id,
        },
        data: {
          name: category.name,
          description: category.description,
          status: category.status,
        },
      }
    }
}
