import { PaginationParams } from '@/core/repositories/pagination-params'
import { Customer, CustomerStatus } from '../../enterprise/entities/customer';

export abstract class CustomerRepository {
  abstract findMany(
    params: PaginationParams,
    filters?: { search?: string, status?: CustomerStatus },
  ): Promise<{ customers: Customer[]; total: number }>

  abstract findById(id: number): Promise<Customer | null>
  abstract save(customer: Customer): Promise<void>
  abstract create(customer: Customer): Promise<Customer>
  abstract softDelete(customer: Partial<Customer>): Promise<void>
}
