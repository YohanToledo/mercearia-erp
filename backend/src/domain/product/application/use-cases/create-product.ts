import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ProductRepository } from '../repositories/product.repository'
import { Product, ProductStatus } from '../../enterprise/entities/product'
import { ProductCategoryRepository } from '../repositories/product-category.repository'
import { CategoryNotFoundError } from './errors/category-not-found.error'
import { ProductConflictError } from './errors/product-conflict.error'

interface CreateProductUseCaseRequest {
  name: string
  description: string
  unitCost: number
  salePrice: number
  profitMargin?: number
  status: ProductStatus
  categoryId: number
  stock: number
  minStockLevel?: number
}

type CreateProductUseCaseResponse = Either<ProductConflictError | CategoryNotFoundError, Product>

@Injectable()
export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: ProductCategoryRepository
  ) { }

  async execute(
    request: CreateProductUseCaseRequest,
  ): Promise<CreateProductUseCaseResponse> {
    const { name, description, unitCost, salePrice, profitMargin, status, categoryId, stock, minStockLevel } = request

    const category = await this.categoryRepository.findById(categoryId)
    if(!category) return left(new CategoryNotFoundError(categoryId))

    const product = Product.create({
      name,
      description,
      unitCost,
      salePrice,
      profitMargin: profitMargin || this.calculateProfitMargin(unitCost, salePrice),
      status,
      categoryId,
      stock,
      minStockLevel: minStockLevel || 0,
    })

    const createdProduct = await this.productRepository.create(product)

    return right(createdProduct)
  }

  private calculateProfitMargin(unitCost: number, salePrice: number): number {
    if (unitCost === 0) return 0
    return ((salePrice - unitCost) / unitCost) * 100
  }
}
