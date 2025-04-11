import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { CustomerRepository } from '../repositories/customer.repository'
import { Customer, CustomerStatus } from '../../enterprise/entities/customer'
import { CustomerConflictError } from './errors/customer-conflict.error'

interface CreateCustomerUseCaseRequest {
  name: string
  phone?: string
  email?: string
  status: CustomerStatus
}

type CreateCustomerUseCaseResponse = Either<CustomerConflictError, { customer: Customer }>

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private customerRepository: CustomerRepository,
  ) { }

  async execute(
    request: CreateCustomerUseCaseRequest,
  ): Promise<CreateCustomerUseCaseResponse> {
    const { name, phone = null, email = null, status } = request

    const customer = Customer.create({
      name,
      phone,
      email,
      status,
    })

    const createdCustomer = await this.customerRepository.create(customer)

    return right({ customer: createdCustomer })
  }
}
