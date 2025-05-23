import { PaginationParams } from '@/core/repositories/pagination-params'
import { ProductCategory, ProductCategoryStatus } from '../../enterprise/entities/product-category';

export abstract class ProductCategoryRepository {
  abstract findMany(
    params: PaginationParams,
    filters?: { search?: string, status?: ProductCategoryStatus },
  ): Promise<{ categories: ProductCategory[]; total: number }>

  abstract findById(id: number): Promise<ProductCategory | null>
  abstract save(category: ProductCategory): Promise<void>
  abstract create(category: ProductCategory): Promise<ProductCategory>
  abstract softDelete(id: ProductCategory): Promise<void>
}
