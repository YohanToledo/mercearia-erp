import { PaginationParams } from '@/core/repositories/pagination-params'
import { Product, ProductStatus } from '../../enterprise/entities/product';

export abstract class ProductRepository {
  abstract findMany(
    params: PaginationParams,
    filters?: { search?: string, status?: ProductStatus },
  ): Promise<{ products: Product[]; total: number }>

  abstract findById(id: number): Promise<Product | null>
  abstract save(product: Product): Promise<void>
  abstract create(product: Product): Promise<Product>
  abstract softDelete(product: Partial<Product>): Promise<void>
}
