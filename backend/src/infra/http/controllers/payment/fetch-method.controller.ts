import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common'

import { PaymentMethodPresenter } from '../../presenters/payment-method.presenter'
import { FetchPaymentMethodUseCase } from '@/domain/payment/application/use-cases/fetch-method'

@Controller('payments/methods/:id')
export class FetchPaymentMethodController {
  constructor(private fetchPaymentMethod: FetchPaymentMethodUseCase) { }

  @Get()
  async handle(
    @Param('id') methodId: number,
  ) {
    if(Number.isNaN(methodId))
      throw new BadRequestException('Invalid method id')

    const result = await this.fetchPaymentMethod.execute({ id: Number(methodId) })

    if(result.isLeft()){
      return result.value.toHttpException()
    }

    return PaymentMethodPresenter.toHTTP(result.value)
  }
}
