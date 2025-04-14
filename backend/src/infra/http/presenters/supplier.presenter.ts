import { Supplier } from "@/domain/supplier/enterprise/entities/supplier";

export class SupplierPresenter {
  static toHTTP(supplier: Supplier) {
    return {
      id: supplier.id,
      description: supplier.description,
      name: supplier.name,
      phone: supplier.phone,
      email: supplier.email,
      status: supplier.status,
      ...(supplier.createdAt && { createdAt: supplier.createdAt.toISOString() }),
      ...(supplier.updatedAt && { updatedAt: supplier.updatedAt.toISOString() }),
    }
  }
}
