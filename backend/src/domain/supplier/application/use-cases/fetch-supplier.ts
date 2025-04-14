import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Supplier } from '../../enterprise/entities/supplier'
import { SupplierRepository } from '../repositories/supplier.repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchSupplierUseCaseRequest {
  id: number
}

type FetchSupplierUseCaseResponse = Either<
  ResourceNotFoundError,
  Supplier
>

@Injectable()
export class FetchSupplierUseCase {
  constructor(private supplierRepostory: SupplierRepository) { }

  async execute(
    { id }: FetchSupplierUseCaseRequest,
  ): Promise<FetchSupplierUseCaseResponse> {
    const supplier = await this.supplierRepostory.findById(id)

    if (!supplier) {
      return left(new ResourceNotFoundError())
    }

    return right(supplier)
  }
}
