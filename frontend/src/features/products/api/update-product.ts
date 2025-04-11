import { _updateProduct } from './data/products'

export interface UpdateProductParams {
  id: string
}

export interface UpdateProductBody {
  name: string
  salePrice: number
  stock: number
  status: 'ACTIVED' | 'DISABLED'
}

export async function updateProduct({ id, name, salePrice, stock, status }: UpdateProductBody & UpdateProductParams) {
  _updateProduct(id, { name, salePrice, stock, status })
}
