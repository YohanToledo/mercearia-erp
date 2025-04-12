import { z } from 'zod'

import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PaginationQueryParamsSchema } from '../../validators/pagination-query.validator'
import { ContentWithPaginationPresenter } from '../../presenters/content-whith-pagination.presenter'
import { FetchProductCategoriesUseCase } from '@/domain/product/application/use-cases/fetch-categories'
import { ProductCategoryPresenter } from '../../presenters/product-category.presenter'

const ProductCategoryQueryParamsSchema = PaginationQueryParamsSchema.extend({
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED']).optional()
})

type ProductCategoryQueryParams = z.infer<typeof ProductCategoryQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(ProductCategoryQueryParamsSchema)

@Controller('products/categories')
export class FetchProductCategoriesController {
  constructor(private fetchProductCategories: FetchProductCategoriesUseCase) { }

  @Get()
  async handle(
    @Query(queryValidationPipe) query: ProductCategoryQueryParams,
  ) {
    const { page, limit, search, status } = query

    const result = await this.fetchProductCategories.execute({
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

    const { categories, totalElements } = result.value

    return ContentWithPaginationPresenter(
      categories.map(ProductCategoryPresenter.toHTTP),
      totalElements,
      page,
      limit,
    )
  }
}
