import { _updateCustomer } from './data/customers'

export interface UpdateCustomerParams {
  id: string
}

export interface UpdateCustomerBody {
  name: string
  phone?: string
  email?: string
  status: 'ACTIVED' | 'DISABLED'
}

export async function updateCustomer({ id, name, phone, email, status }: UpdateCustomerBody & UpdateCustomerParams) {
  _updateCustomer(id, { name, phone: phone || null, email: email || null, status })
}
