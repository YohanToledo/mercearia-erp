import { Product } from "@/domain/product/enterprise/entities/product";

export class ProductPresenter {
  static toHTTP(product: Product) {
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
      ...(product.createdAt && { createdAt: product.createdAt.toISOString() }),
      ...(product.updatedAt && { updatedAt: product.updatedAt.toISOString() }),
    }
  }
}
