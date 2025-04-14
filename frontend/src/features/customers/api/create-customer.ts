import { createNewCustomer } from "./data/customers"

export interface CreateCustomerBody {
  name: string
  phone?: string
  email?: string
  status: 'ACTIVED' | 'DISABLED'
}

export async function createCustomer(data: CreateCustomerBody) {
  createNewCustomer({
    name: data.name,
    phone: data.phone || null,
    email: data.email || null,
    status: data.status
  })
}
