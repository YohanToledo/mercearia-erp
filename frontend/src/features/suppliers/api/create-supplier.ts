import { createNewSupplier } from "./data/suppliers"

export interface CreateSupplierBody {
  name: string
  description?: string
  phone?: string
  email?: string
  status: 'ACTIVE' | 'INACTIVE'
}

export async function createSupplier(data: CreateSupplierBody) {
  createNewSupplier({
    name: data.name,
    description: data.description || null,
    phone: data.phone || null,
    email: data.email || null,
    status: data.status
  })
}
