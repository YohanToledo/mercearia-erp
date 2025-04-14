import { _updateSupplier } from './data/suppliers'

export interface UpdateSupplierParams {
  id: string
}

export interface UpdateSupplierBody {
  name: string
  description?: string
  phone?: string
  email?: string
  status: 'ACTIVE' | 'INACTIVE'
}

export async function updateSupplier({ id, name, description, phone, email, status }: UpdateSupplierBody & UpdateSupplierParams) {
  _updateSupplier(id, { name, description: description || null, phone: phone || null, email: email || null, status })
}
