import { PaymentMethod } from "@/domain/payment/enterprise/entities/payment-method";

export class PaymentMethodPresenter {
  static toHTTP(method: PaymentMethod) {
    return {
      id: method.id,
      name: method.name,
      description: method.description,
      active: method.active,
      ...(method.createdAt && { createdAt: method.createdAt.toISOString() }),
      ...(method.updatedAt && { updatedAt: method.updatedAt.toISOString() }),
    }
  }
}
