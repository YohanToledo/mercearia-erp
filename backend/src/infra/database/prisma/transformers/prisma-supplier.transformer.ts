import { Supplier } from '@/domain/supplier/enterprise/entities/supplier'
import { Prisma, Supplier as PrismaSupplier } from '@prisma/client'

export class PrismaSupplierTransformer {
  static toDomain(raw: PrismaSupplier): Supplier {
    return Supplier.create(
      {
        name: raw.name,
        description: raw.description,
        phone: raw.phone,
        email: raw.email,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(supplier: Supplier): Prisma.SupplierUncheckedCreateInput {
    return {
      name: supplier.name,
      description: supplier.description,
      phone: supplier.phone,
      email: supplier.email,
      status: supplier.status,
    }
  }

   static toPrismaUpdate(supplier: Partial<Supplier>): Prisma.SupplierUpdateArgs {
      if (!supplier.id) {
        throw new Error('Supplier ID is required to perform an update')
      }
  
      return {
        where: {
          id: supplier.id,
        },
        data: {
          name: supplier.name,
          description: supplier.description,
          phone: supplier.phone,
          email: supplier.email,
          status: supplier.status,
        },
      }
    }
}
