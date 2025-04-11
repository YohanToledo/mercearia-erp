import { _updateProductStatus } from './data/products'

export interface UpdateStatusProductParams {
  id: string
}

export interface UpdateProductStatusBody {
  status: 'ACTIVED' | 'DISABLED'
}

export async function updateProductStatus({ id, status }: UpdateProductStatusBody & UpdateStatusProductParams) {
  _updateProductStatus(id,  status)
}
