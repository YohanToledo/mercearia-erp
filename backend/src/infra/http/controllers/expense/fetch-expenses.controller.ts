import { z } from 'zod'

import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PaginationQueryParamsSchema } from '../../validators/pagination-query.validator'
import { ContentWithPaginationPresenter } from '../../presenters/content-whith-pagination.presenter'
import { FetchExpensesUseCase } from '@/domain/expense/application/use-cases/fetch-expenses'
import { ExpensePresenter } from '../../presenters/expense.presenter'

const ExpenseQueryParamsSchema = PaginationQueryParamsSchema.extend({
  search: z.string().optional(),
  status: z.enum(['PAID', 'PENDING']).optional()
})

type ExpenseQueryParams = z.infer<typeof ExpenseQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(ExpenseQueryParamsSchema)

@Controller('expenses')
export class FetchExpensesController {
  constructor(private fetchExpenses: FetchExpensesUseCase) { }

  @Get()
  async handle(
    @Query(queryValidationPipe) query: ExpenseQueryParams,
  ) {
    const { page, limit, search, status } = query

    const result = await this.fetchExpenses.execute({
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

    const { expenses, totalElements } = result.value

    return ContentWithPaginationPresenter(
      expenses.map(ExpensePresenter.toHTTP),
      totalElements,
      page,
      limit,
    )
  }
}
