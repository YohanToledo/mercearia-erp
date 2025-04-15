import { z } from 'zod'

import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PaginationQueryParamsSchema } from '../../validators/pagination-query.validator'
import { ContentWithPaginationPresenter } from '../../presenters/content-whith-pagination.presenter'
import { FetchPaymentMethodsUseCase } from '@/domain/payment/application/use-cases/fetch-methods'
import { PaymentMethodPresenter } from '../../presenters/payment-method.presenter'

const PaymentMethodQueryParamsSchema = PaginationQueryParamsSchema.extend({
  search: z.string().optional(),
  active: z.boolean().optional()
})

type PaymentMethodQueryParams = z.infer<typeof PaymentMethodQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(PaymentMethodQueryParamsSchema)

@Controller('payments/methods')
export class FetchPaymentMethodsController {
  constructor(private fetchPaymentMethods: FetchPaymentMethodsUseCase) { }

  @Get()
  async handle(
    @Query(queryValidationPipe) query: PaymentMethodQueryParams,
  ) {
    const { page, limit, search, active } = query

    const result = await this.fetchPaymentMethods.execute({
      page,
      limit,
      filters: {
        search,
        active
      },
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { methods, totalElements } = result.value

    return ContentWithPaginationPresenter(
      methods.map(PaymentMethodPresenter.toHTTP),
      totalElements,
      page,
      limit,
    )
  }
}
