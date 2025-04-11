import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Product } from '../../enterprise/entities/product'
import { ProductRepository } from '../repositories/product.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchProductUseCaseRequest {
  id: number
}

type FetchProductUseCaseResponse = Either<
  ResourceNotFoundError,
  Product
>

@Injectable()
export class FetchProductUseCase {
  constructor(private productRepostory: ProductRepository) { }

  async execute(
    { id }: FetchProductUseCaseRequest,
  ): Promise<FetchProductUseCaseResponse> {
    const product = await this.productRepostory.findById(id)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    return right(product)
  }
}
