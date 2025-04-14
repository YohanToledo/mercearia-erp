import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { ProductCategoryPresenter } from '../../presenters/product-category.presenter'
import { FetchProductCategoryUseCase } from '@/domain/product/application/use-cases/fetch-category'

@Controller('products/categories/:id')
export class FetchProductCategoryController {
  constructor(private fetchCategory: FetchProductCategoryUseCase) { }

  @Get()
  async handle(
    @Param('id') caetgoryId: number,
  ) {
    if (Number.isNaN(caetgoryId))
      throw new BadRequestException('Invalid category id')

    const result = await this.fetchCategory.execute({ id: Number(caetgoryId) })

    if (result.isLeft()) {
      return result.value.toHttpException()
    }

    return ProductCategoryPresenter.toHTTP(result.value)
  }
}
