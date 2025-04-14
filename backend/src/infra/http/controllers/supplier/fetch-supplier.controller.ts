import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common'

import { SupplierPresenter } from '../../presenters/supplier.presenter'
import { FetchSupplierUseCase } from '@/domain/supplier/application/use-cases/fetch-supplier'

@Controller('suppliers/:id')
export class FetchSupplierController {
  constructor(private fetchSupplier: FetchSupplierUseCase) { }

  @Get()
  async handle(
    @Param('id') supplierId: number,
  ) {
    if(Number.isNaN(supplierId))
      throw new BadRequestException('Invalid supplier id')

    const result = await this.fetchSupplier.execute({ id: Number(supplierId) })

    if(result.isLeft()){
      return result.value.toHttpException()
    }

    return SupplierPresenter.toHTTP(result.value)
  }
}
