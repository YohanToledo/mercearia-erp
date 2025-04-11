import { z } from 'zod'

import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PaginationQueryParamsSchema } from '../../validators/pagination-query.validator'
import { ContentWithPaginationPresenter } from '../../presenters/content-whith-pagination.presenter'
import { FetchProductsUseCase } from '@/domain/product/application/use-cases/fetch-products'
import { ProductPresenter } from '../../presenters/product.presenter'

const ProductQueryParamsSchema = PaginationQueryParamsSchema.extend({
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED']).optional()
})

type ProductQueryParams = z.infer<typeof ProductQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(ProductQueryParamsSchema)

@Controller('products')
export class FetchProductsController {
  constructor(private fetchProducts: FetchProductsUseCase) { }

  @Get()
  async handle(
    @Query(queryValidationPipe) query: ProductQueryParams,
  ) {
    const { page, limit, search, status } = query

    const result = await this.fetchProducts.execute({
      page,
      limit,
      filters: {
        search,
        status
      },
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { products, totalElements } = result.value

    return ContentWithPaginationPresenter(
      products.map(ProductPresenter.toHTTP),
      totalElements,
      page,
      limit,
    )
  }
}
