import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ProductCategoryRepository } from '../repositories/product-category.repository'
import { ProductCategory } from '../../enterprise/entities/product-category'

interface FetchProductCategoryUseCaseRequest {
  id: number
}

type FetchProductCategoryUseCaseResponse = Either<
  ResourceNotFoundError,
  ProductCategory
>

@Injectable()
export class FetchProductCategoryUseCase {
  constructor(private categoryRepository: ProductCategoryRepository) { }

  async execute(
    { id }: FetchProductCategoryUseCaseRequest,
  ): Promise<FetchProductCategoryUseCaseResponse> {
    const category = await this.categoryRepository.findById(id)

    if (!category) {
      return left(new ResourceNotFoundError())
    }

    return right(category)
  }
}
