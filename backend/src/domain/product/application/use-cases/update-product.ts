import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Product, ProductStatus } from '../../enterprise/entities/product'
import { ProductRepository } from '../repositories/product.repository'

interface UpdateProductUseCaseRequest {
  id: number
  name?: string
  description?: string
  unitCost?: number
  salePrice?: number
  profitMargin?: number
  status?: ProductStatus
  categoryId?: number
  stock?: number
  minStockLevel?: number
}

type UpdateProductUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

@Injectable()
export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) { }

  async execute(
    request: UpdateProductUseCaseRequest,
  ): Promise<UpdateProductUseCaseResponse> {
    const { id } = request

    const product = await this.productRepository.findById(id)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    product.update(request)

    await this.productRepository.save(product)

    return right({
      product,
    })
  }
}
