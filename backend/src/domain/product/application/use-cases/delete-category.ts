import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ProductCategoryRepository } from '../repositories/product-category.repository'
import { ProductCategory } from '../../enterprise/entities/product-category'
import { ProductRepository } from '../repositories/product.repository'
import { ProductCategoryConflictError } from './errors/category-conflict.error'

interface DeleteProductCategoryUseCaseRequest {
  id: number
}

type DeleteProductCategoryUseCaseResponse = Either<
  ResourceNotFoundError
  | ProductCategoryConflictError,
  null
>

@Injectable()
export class DeleteProductCategoryUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: ProductCategoryRepository
  ) { }

  async execute(
    { id }: DeleteProductCategoryUseCaseRequest,
  ): Promise<DeleteProductCategoryUseCaseResponse> {

    const category = await this.categoryRepository.findById(id)

    if (!category) {
      return left(new ResourceNotFoundError())
    }

    const total = await this.productRepository.countProductsByCategory(id)
    if (total !== 0) return left(new ProductCategoryConflictError('Category has products. Unable to delete'))


    await this.categoryRepository.softDelete(category)

    return right(null)
  }
}
