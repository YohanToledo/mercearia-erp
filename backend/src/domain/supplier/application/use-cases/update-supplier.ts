import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Supplier } from '../../enterprise/entities/supplier'
import { SupplierRepository } from '../repositories/supplier.repository'
import { SupplierStatus } from '../../enterprise/entities/supplier'

interface UpdateSupplierUseCaseRequest {
  id: number
  name?: string
  description?: string
  phone?: string
  email?: string
  status?: SupplierStatus
}

type UpdateSupplierUseCaseResponse = Either<
  ResourceNotFoundError,
  Supplier
>

@Injectable()
export class UpdateSupplierUseCase {
  constructor(private supplierRepository: SupplierRepository) { }

  async execute(
    request: UpdateSupplierUseCaseRequest,
  ): Promise<UpdateSupplierUseCaseResponse> {
    const { id } = request

    const supplier = await this.supplierRepository.findById(id)

    if (!supplier) {
      return left(new ResourceNotFoundError())
    }

    supplier.update(request)

    await this.supplierRepository.save(supplier)

    return right(supplier)
  }
}
