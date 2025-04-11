import { Product } from "@/domain/product/enterprise/entities/product";

export class ProductPresenter {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      name: product.name,
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
