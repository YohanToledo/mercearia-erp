import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common'

import { CustomerPresenter } from '../../presenters/customer.presenter'
import { FetchCustomerUseCase } from '@/domain/customer/application/use-cases/fetch-customer'

@Controller('customers/:id')
export class FetchCustomerController {
  constructor(private fetchCustomer: FetchCustomerUseCase) { }

  @Get()
  async handle(
    @Param('id') customerId: number,
  ) {
    if(Number.isNaN(customerId))
      throw new BadRequestException('Invalid customer id')

    const result = await this.fetchCustomer.execute({ id: Number(customerId) })

    if(result.isLeft()){
      return result.value.toHttpException()
    }

    return CustomerPresenter.toHTTP(result.value)
  }
}
