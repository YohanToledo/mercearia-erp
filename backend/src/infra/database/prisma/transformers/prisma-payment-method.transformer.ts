import { PaymentMethod } from '@/domain/payment/enterprise/entities/payment-method'
import { Prisma, PaymentMethod as PrismaPaymentMethod } from '@prisma/client'

export class PrismaPaymentMethodTransformer {
  static toDomain(raw: PrismaPaymentMethod): PaymentMethod {
    return PaymentMethod.create(
      {
        name: raw.name,
        description: raw.description,
        active: raw.active,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(method: PaymentMethod): Prisma.PaymentMethodUncheckedCreateInput {
    return {
      name: method.name,
      description: method.description,
      active: method.active,
    }
  }

  static toPrismaUpdate(method: Partial<PaymentMethod>): Prisma.PaymentMethodUpdateArgs {
    if (!method.id) {
      throw new Error('PaymentMethod ID is required to perform an update')
    }

    return {
      where: {
        id: method.id,
      },
      data: {
        name: method.name,
        description: method.description,
        active: method.active,
      },
    }
  }
}
