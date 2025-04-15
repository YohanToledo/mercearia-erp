import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { PaymentMethod } from '../../enterprise/entities/payment-method'
import { PaymentMethodRepository } from '../repositories/payment-method.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchPaymentMethodUseCaseRequest {
  id: number
}

type FetchPaymentMethodUseCaseResponse = Either<
  ResourceNotFoundError,
  PaymentMethod
>

@Injectable()
export class FetchPaymentMethodUseCase {
  constructor(private paymentMethodRepostory: PaymentMethodRepository) { }

  async execute(
    { id }: FetchPaymentMethodUseCaseRequest,
  ): Promise<FetchPaymentMethodUseCaseResponse> {
    const paymentMethod = await this.paymentMethodRepostory.findById(id)

    if (!paymentMethod) {
      return left(new ResourceNotFoundError())
    }

    return right(paymentMethod)
  }
}
