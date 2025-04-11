import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Customer } from '../../enterprise/entities/customer'
import { CustomerRepository } from '../repositories/customer.repository'
import { CustomerStatus } from '../../enterprise/entities/customer'

interface UpdateCustomerUseCaseRequest {
  id: number
  name?: string
  phone?: string
  email?: string
  status?: CustomerStatus
}

type UpdateCustomerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    customer: Customer
  }
>

@Injectable()
export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) { }

  async execute(
    request: UpdateCustomerUseCaseRequest,
  ): Promise<UpdateCustomerUseCaseResponse> {
    const { id } = request

    const customer = await this.customerRepository.findById(id)

    if (!customer) {
      return left(new ResourceNotFoundError())
    }

    customer.update(request)

    await this.customerRepository.save(customer)

    return right({
      customer,
    })
  }
}
