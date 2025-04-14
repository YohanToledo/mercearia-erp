import { z } from 'zod'

import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PaginationQueryParamsSchema } from '../../validators/pagination-query.validator'
import { ContentWithPaginationPresenter } from '../../presenters/content-whith-pagination.presenter'
import { FetchSuppliersUseCase } from '@/domain/supplier/application/use-cases/fetch-suppliers'
import { SupplierPresenter } from '../../presenters/supplier.presenter'

const SupplierQueryParamsSchema = PaginationQueryParamsSchema.extend({
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED']).optional()
})

type SupplierQueryParams = z.infer<typeof SupplierQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(SupplierQueryParamsSchema)

@Controller('suppliers')
export class FetchSuppliersController {
  constructor(private fetchSuppliers: FetchSuppliersUseCase) { }

  @Get()
  async handle(
    @Query(queryValidationPipe) query: SupplierQueryParams,
  ) {
    const { page, limit, search, status } = query

    const result = await this.fetchSuppliers.execute({
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

    const { suppliers, totalElements } = result.value

    return ContentWithPaginationPresenter(
      suppliers.map(SupplierPresenter.toHTTP),
      totalElements,
      page,
      limit,
    )
  }
}
