import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { ProductCategory, ProductCategoryStatus } from '../../enterprise/entities/product-category'
import { ProductCategoryRepository } from '../repositories/product-category.repository'

interface UpdateProductCategoryUseCaseRequest {
  id: number
  name?: string
  description?: string
  status?: ProductCategoryStatus
}

type UpdateProductCategoryUseCaseResponse = Either<
  ResourceNotFoundError,
  ProductCategory
>

@Injectable()
export class UpdateProductCategoryUseCase {
  constructor(private categoryRepository: ProductCategoryRepository) { }

  async execute(
    request: UpdateProductCategoryUseCaseRequest,
  ): Promise<UpdateProductCategoryUseCaseResponse> {
    const { id } = request

    const category = await this.categoryRepository.findById(id)

    if (!category) {
      return left(new ResourceNotFoundError())
    }

    category.update(request)

    await this.categoryRepository.save(category)

    return right(category)
  }
}
