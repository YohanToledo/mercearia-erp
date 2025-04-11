import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Product } from '@/domain/product/enterprise/entities/product'
import { Prisma, Product as PrismaProduct } from '@prisma/client'

export class PrismaProductTransformer {
  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
        code: raw.code,
        description: raw.description,
        unitCost: raw.unitCost,
        salePrice: raw.salePrice,
        profitMargin: raw.profitMargin,
        status: raw.status,
        categoryId: raw.categoryId,
        stock: raw.stock,
        minStockLevel: raw.minStockLevel,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      code: product.code,
      description: product.description,
      unitCost: product.unitCost,
      salePrice: product.salePrice,
      profitMargin: product.profitMargin,
      status: product.status,
      categoryId: product.categoryId,
      stock: product.stock,
      minStockLevel: product.minStockLevel,
    }
  }

   static toPrismaUpdate(product: Partial<Product>): Prisma.ProductUpdateArgs {
      if (!product.id) {
        throw new Error('Product ID is required to perform an update')
      }
  
      return {
        where: {
          id: product.id.toString(),
        },
        data: {
          name: product.name,
          description: product.description,
          unitCost: product.unitCost,
          salePrice: product.salePrice,
          profitMargin: product.profitMargin,
          status: product.status,
          categoryId: product.categoryId,
          stock: product.stock,
          minStockLevel: product.minStockLevel,
        },
      }
    }
}
