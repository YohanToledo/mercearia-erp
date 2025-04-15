import { PaginationParams } from '@/core/repositories/pagination-params'
import { PaymentMethod } from '../../enterprise/entities/payment-method';

export abstract class PaymentMethodRepository {
  abstract findMany(
    params: PaginationParams,
    filters?: { search?: string, active?: boolean },
  ): Promise<{ methods: PaymentMethod[]; total: number }>

  abstract findById(id: number): Promise<PaymentMethod | null>
  abstract save(method: PaymentMethod): Promise<void>
  abstract create(method: PaymentMethod): Promise<PaymentMethod>
}
