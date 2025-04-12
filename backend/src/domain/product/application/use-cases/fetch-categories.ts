import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ProductCategory, ProductCategoryStatus } from '../../enterprise/entities/product-category'
import { ProductCategoryRepository } from '../repositories/product-category.repository'

interface FetchProductCategoriesUseCaseRequest {
  page: number
  limit: number
  filters: {
    search?: string
    status?: ProductCategoryStatus
  }
}

type FetchProductCategoriesUseCaseResponse = Either<
  null,
  { categories: ProductCategory[]; totalElements: number }
>

@Injectable()
export class FetchProductCategoriesUseCase {
  constructor(private categoryRepository: ProductCategoryRepository) { }

  async execute(
    request: FetchProductCategoriesUseCaseRequest,
  ): Promise<FetchProductCategoriesUseCaseResponse> {
    const { page, limit, filters } = request

    const { categories, total: totalElements } = await this.categoryRepository.findMany(
      { page, limit },
      filters,
    )

    return right({
      categories,
      totalElements,
    })
  }
}
