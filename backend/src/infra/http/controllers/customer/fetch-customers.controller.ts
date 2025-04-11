import { z } from 'zod'

import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PaginationQueryParamsSchema } from '../../validators/pagination-query.validator'
import { ContentWithPaginationPresenter } from '../../presenters/content-whith-pagination.presenter'
import { FetchCustomersUseCase } from '@/domain/customer/application/use-cases/fetch-customers'
import { CustomerPresenter } from '../../presenters/customer.presenter'

const CustomerQueryParamsSchema = PaginationQueryParamsSchema.extend({
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED']).optional()
})

type CustomerQueryParams = z.infer<typeof CustomerQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(CustomerQueryParamsSchema)

@Controller('customers')
export class FetchCustomersController {
  constructor(private fetchCustomers: FetchCustomersUseCase) { }

  @Get()
  async handle(
    @Query(queryValidationPipe) query: CustomerQueryParams,
  ) {
    const { page, limit, search, status } = query

    const result = await this.fetchCustomers.execute({
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

    const { customers, totalElements } = result.value

    return ContentWithPaginationPresenter(
      customers.map(CustomerPresenter.toHTTP),
      totalElements,
      page,
      limit,
    )
  }
}
