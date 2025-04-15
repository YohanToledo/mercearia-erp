import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { PaymentMethod } from '../../enterprise/entities/payment-method'
import { PaymentMethodRepository } from '../repositories/payment-method.repository'

interface FetchPaymentMethodsUseCaseRequest {
  page: number
  limit: number
  filters: {
    search?: string
    active?: boolean
  }
}

type FetchPaymentMethodsUseCaseResponse = Either<
  null,
  { methods: PaymentMethod[]; totalElements: number }
>

@Injectable()
export class FetchPaymentMethodsUseCase {
  constructor(private paymentMethodRepository: PaymentMethodRepository) { }

  async execute(
    request: FetchPaymentMethodsUseCaseRequest,
  ): Promise<FetchPaymentMethodsUseCaseResponse> {
    const { page, limit, filters } = request

    const { methods, total: totalElements } = await this.paymentMethodRepository.findMany(
      { page, limit },
      filters,
    )

    return right({
      methods,
      totalElements,
    })
  }
}
