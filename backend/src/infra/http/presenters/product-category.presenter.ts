import { ProductCategory } from "@/domain/product/enterprise/entities/product-category";

export class ProductCategoryPresenter {
  static toHTTP(category: ProductCategory) {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      status: category.status,
      ...(category.createdAt && { createdAt: category.createdAt.toISOString() }),
      ...(category.updatedAt && { updatedAt: category.updatedAt.toISOString() }),
    }
  }
}
