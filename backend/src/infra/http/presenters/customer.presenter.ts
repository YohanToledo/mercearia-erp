import { Customer } from "@/domain/customer/enterprise/entities/customer";

export class CustomerPresenter {
  static toHTTP(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      status: customer.status,
      ...(customer.createdAt && { createdAt: customer.createdAt.toISOString() }),
      ...(customer.updatedAt && { updatedAt: customer.updatedAt.toISOString() }),
    }
  }
}
