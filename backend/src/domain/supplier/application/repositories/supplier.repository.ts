import { PaginationParams } from '@/core/repositories/pagination-params'
import { Supplier, SupplierStatus } from '../../enterprise/entities/supplier';

export abstract class SupplierRepository {
  abstract findMany(
    params: PaginationParams,
    filters?: { search?: string, status?: SupplierStatus },
  ): Promise<{ suppliers: Supplier[]; total: number }>

  abstract findById(id: number): Promise<Supplier | null>
  abstract save(supplier: Supplier): Promise<void>
  abstract create(supplier: Supplier): Promise<Supplier>
  abstract softDelete(supplier: Supplier): Promise<void>
}
