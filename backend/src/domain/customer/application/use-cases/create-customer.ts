import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { CustomerRepository } from '../repositories/customer.repository'
import { Customer, CustomerStatus } from '../../enterprise/entities/customer'
import { CustomerConflictError } from './errors/customer-conflict.error'
import { LogService } from '@/domain/log/application/services/log.service'

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
    private logService: LogService,
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

    await this.logService.create({
      action: 'INSERT',
      entity: 'Customer',
      entityId: createdCustomer.id,
      newValue: createdCustomer,
    })

    return right({ customer: createdCustomer })
  }
}
