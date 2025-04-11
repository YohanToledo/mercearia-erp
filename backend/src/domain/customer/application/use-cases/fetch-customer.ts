import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Customer } from '../../enterprise/entities/customer'
import { CustomerRepository } from '../repositories/customer.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchCustomerUseCaseRequest {
  id: number
}

type FetchCustomerUseCaseResponse = Either<
  ResourceNotFoundError,
  Customer
>

@Injectable()
export class FetchCustomerUseCase {
  constructor(private customerRepostory: CustomerRepository) { }

  async execute(
    { id }: FetchCustomerUseCaseRequest,
  ): Promise<FetchCustomerUseCaseResponse> {
    const customer = await this.customerRepostory.findById(id)

    if (!customer) {
      return left(new ResourceNotFoundError())
    }

    return right(customer)
  }
}
