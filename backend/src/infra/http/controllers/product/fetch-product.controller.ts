import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common'

import { ProductPresenter } from '../../presenters/product.presenter'
import { FetchProductUseCase } from '@/domain/product/application/use-cases/fetch-product'

@Controller('products/:id')
export class FetchProductController {
  constructor(private fetchProduct: FetchProductUseCase) { }

  @Get()
  async handle(
    @Param('id') productId: number,
  ) {
    if(Number.isNaN(productId))
      throw new BadRequestException('Invalid product id')

    const result = await this.fetchProduct.execute({ id: Number(productId) })

    if(result.isLeft()){
      return result.value.toHttpException()
    }

    return ProductPresenter.toHTTP(result.value)
  }
}
