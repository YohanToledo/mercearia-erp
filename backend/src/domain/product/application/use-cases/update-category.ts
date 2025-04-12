import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Product, ProductStatus } from '../../enterprise/entities/product'
import { ProductRepository } from '../repositories/product.repository'
import { ProductCategoryStatus } from '../../enterprise/entities/product-category'

interface UpdateProductCategoryUseCaseRequest {
  id: number
  name?: string
  description?: string
  status?: ProductCategoryStatus
}

type UpdateProductCategoryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    category: Product
  }
>

@Injectable()
export class UpdateProductCategoryUseCase {
  constructor(private categoryRepository: ProductRepository) { }

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

    return right({
      category,
    })
  }
}
