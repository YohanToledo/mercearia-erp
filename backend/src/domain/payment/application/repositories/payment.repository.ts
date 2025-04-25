import { PaginationParams } from '@/core/repositories/pagination-params'
import { Payment } from '../../enterprise/entities/payment';

export abstract class PaymentRepository {
  abstract findMany(
    params: PaginationParams,
    filters?: { search?: string },
  ): Promise<{ payments: Payment[]; total: number }>

  abstract findById(id: number): Promise<Payment | null>
  abstract save(payment: Payment): Promise<void>
  abstract create(payment: Payment): Promise<Payment>
  abstract softDelete(payment: Payment): Promise<void>
}
