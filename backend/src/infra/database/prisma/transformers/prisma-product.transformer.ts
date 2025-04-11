import { Product } from '@/domain/product/enterprise/entities/product'
import { Prisma, Product as PrismaProduct } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export class PrismaProductTransformer {
  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
        description: raw.description,
        unitCost: raw.unitCost.toNumber(),
        salePrice: raw.salePrice.toNumber(),
        profitMargin: raw.profitMargin.toNumber(),
        status: raw.status,
        categoryId: raw.categoryId,
        stock: raw.stock,
        minStockLevel: raw.minStockLevel,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      name: product.name,
      description: product.description,
      unitCost: new Decimal(product.unitCost),
      salePrice: new Decimal(product.salePrice),
      profitMargin: new Decimal(product.profitMargin),
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
          id: product.id,
        },
        data: {
          name: product.name,
          description: product.description,
          ...(product.unitCost && { unitCost: new Decimal(product.unitCost) }),
          ...(product.salePrice && { salePrice: new Decimal(product.salePrice) }),
          ...(product.profitMargin && { profitMargin: new Decimal(product.profitMargin) }),
          status: product.status,
          categoryId: product.categoryId,
          stock: product.stock,
          minStockLevel: product.minStockLevel,
        },
      }
    }
}
