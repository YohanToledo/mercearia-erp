import { _updateCustomerStatus } from './data/customers'

export interface UpdateStatusCustomerParams {
  id: string
}

export interface UpdateCustomerStatusBody {
  status: 'ACTIVED' | 'DISABLED'
}

export async function updateCustomerStatus({ id, status }: UpdateCustomerStatusBody & UpdateStatusCustomerParams) {
  _updateCustomerStatus(id,  status)
}
