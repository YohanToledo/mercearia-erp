import { _updateSupplierStatus } from './data/suppliers'

export interface UpdateStatusSupplierParams {
  id: string
}

export interface UpdateSupplierStatusBody {
  status: 'ACTIVE' | 'INACTIVE'
}

export async function updateSupplierStatus({ id, status }: UpdateSupplierStatusBody & UpdateStatusSupplierParams) {
  _updateSupplierStatus(id, status)
}
