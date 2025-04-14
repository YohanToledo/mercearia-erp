import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { SupplierRepository } from '../repositories/supplier.repository'
import { Supplier, SupplierStatus } from '../../enterprise/entities/supplier'
import { SupplierConflictError } from './errors/supplier-conflict.error'

interface CreateSupplierUseCaseRequest {
  name: string
  description?: string
  phone?: string
  email?: string
  status: SupplierStatus
}

type CreateSupplierUseCaseResponse = Either<SupplierConflictError, { supplier: Supplier }>

@Injectable()
export class CreateSupplierUseCase {
  constructor(
    private supplierRepository: SupplierRepository,
  ) { }

  async execute(
    request: CreateSupplierUseCaseRequest,
  ): Promise<CreateSupplierUseCaseResponse> {
    const { name, phone = null, email = null, description = null, status } = request

    const supplier = Supplier.create({
      name,
      description,
      phone,
      email,
      status,
    })

    const createdSupplier = await this.supplierRepository.create(supplier)

    return right({ supplier: createdSupplier })
  }
}
