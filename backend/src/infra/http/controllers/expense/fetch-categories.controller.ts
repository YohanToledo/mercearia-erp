import { z } from 'zod'

import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PaginationQueryParamsSchema } from '../../validators/pagination-query.validator'
import { ContentWithPaginationPresenter } from '../../presenters/content-whith-pagination.presenter'
import { FetchExpenseCategoriesUseCase } from '@/domain/expense/application/use-cases/fetch-categories'
import { ExpenseCategoryPresenter } from '../../presenters/expense-category.presenter'

const ExpenseCategoryQueryParamsSchema = PaginationQueryParamsSchema.extend({
  search: z.string().optional(),
})

type ExpenseCategoryQueryParams = z.infer<typeof ExpenseCategoryQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(ExpenseCategoryQueryParamsSchema)

@Controller('expenses/categories')
export class FetchExpenseCategoriesController {
  constructor(private fetchExpenseCategories: FetchExpenseCategoriesUseCase) { }

  @Get()
  async handle(
    @Query(queryValidationPipe) query: ExpenseCategoryQueryParams,
  ) {
    const { page, limit, search } = query

    const result = await this.fetchExpenseCategories.execute({
      page,
      limit,
      filters: {
        search,
      },
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { categories, totalElements } = result.value

    return ContentWithPaginationPresenter(
      categories.map(ExpenseCategoryPresenter.toHTTP),
      totalElements,
      page,
      limit,
    )
  }
}
