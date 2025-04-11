import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Customer, CustomerStatus } from '../../enterprise/entities/customer'
import { CustomerRepository } from '../repositories/customer.repository'

interface FetchCustomersUseCaseRequest {
  page: number
  limit: number
  filters: {
    search?: string
    status?: CustomerStatus
  }
}

type FetchCustomersUseCaseResponse = Either<
  null,
  { customers: Customer[]; totalElements: number }
>

@Injectable()
export class FetchCustomersUseCase {
  constructor(private customerRepository: CustomerRepository) { }

  async execute(
    request: FetchCustomersUseCaseRequest,
  ): Promise<FetchCustomersUseCaseResponse> {
    const { page, limit, filters } = request

    const { customers, total: totalElements } = await this.customerRepository.findMany(
      { page, limit },
      filters,
    )

    return right({
      customers,
      totalElements,
    })
  }
}
