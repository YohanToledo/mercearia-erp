import { Customer } from '@/domain/customer/enterprise/entities/customer'
import { Prisma, Customer as PrismaCustomer } from '@prisma/client'

export class PrismaCustomerTransformer {
  static toDomain(raw: PrismaCustomer): Customer {
    return Customer.create(
      {
        name: raw.name,
        phone: raw.phone,
        email: raw.email,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(customer: Customer): Prisma.CustomerUncheckedCreateInput {
    return {
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      status: customer.status,
    }
  }

   static toPrismaUpdate(customer: Partial<Customer>): Prisma.CustomerUpdateArgs {
      if (!customer.id) {
        throw new Error('Customer ID is required to perform an update')
      }
  
      return {
        where: {
          id: customer.id,
        },
        data: {
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          status: customer.status,
        },
      }
    }
}
