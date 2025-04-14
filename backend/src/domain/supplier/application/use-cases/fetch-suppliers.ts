import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Supplier, SupplierStatus } from '../../enterprise/entities/supplier'
import { SupplierRepository } from '../repositories/supplier.repository'

interface FetchSuppliersUseCaseRequest {
  page: number
  limit: number
  filters: {
    search?: string
    status?: SupplierStatus
  }
}

type FetchSuppliersUseCaseResponse = Either<
  null,
  { suppliers: Supplier[]; totalElements: number }
>

@Injectable()
export class FetchSuppliersUseCase {
  constructor(private supplierRepository: SupplierRepository) { }

  async execute(
    request: FetchSuppliersUseCaseRequest,
  ): Promise<FetchSuppliersUseCaseResponse> {
    const { page, limit, filters } = request

    const { suppliers, total: totalElements } = await this.supplierRepository.findMany(
      { page, limit },
      filters,
    )

    return right({
      suppliers,
      totalElements,
    })
  }
}
