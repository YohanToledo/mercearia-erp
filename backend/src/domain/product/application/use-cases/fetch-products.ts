import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Product, ProductStatus } from '../../enterprise/entities/product'
import { ProductRepository } from '../repositories/product.repository'

interface FetchProductsUseCaseRequest {
  page: number
  limit: number
  filters: {
    search?: string
    status?: ProductStatus
  }
}

type FetchProductsUseCaseResponse = Either<
  null,
  { products: Product[]; totalElements: number }
>

@Injectable()
export class FetchProductsUseCase {
  constructor(private categoryRepository: ProductRepository) { }

  async execute(
    request: FetchProductsUseCaseRequest,
  ): Promise<FetchProductsUseCaseResponse> {
    const { page, limit, filters } = request

    const { products, total: totalElements } = await this.categoryRepository.findMany(
      { page, limit },
      filters,
    )

    return right({
      products,
      totalElements,
    })
  }
}
