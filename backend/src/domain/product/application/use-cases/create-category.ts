import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ProductCategoryRepository } from '../repositories/product-category.repository'
import { ProductCategory, ProductCategoryStatus } from '../../enterprise/entities/product-category'
import { ProductCategoryConflictError } from './errors/product-category-conflict.error'

interface CreateProductCategoryUseCaseRequest {
  name: string
  description: string
  status: ProductCategoryStatus
}

type CreateProductCategoryUseCaseResponse = Either<ProductCategoryConflictError, ProductCategory>

@Injectable()
export class CreateProductCategoryUseCase {
  constructor(
    private categoryRepository: ProductCategoryRepository
  ) { }

  async execute(
    request: CreateProductCategoryUseCaseRequest,
  ): Promise<CreateProductCategoryUseCaseResponse> {
    const { name, description, status } = request

    const category = ProductCategory.create({
      name,
      description,
      status,
    })

    const createdProductCategory = await this.categoryRepository.create(category)

    return right(createdProductCategory)
  }
}
