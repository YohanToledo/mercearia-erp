import { _updateProduct } from './data/products'

export interface UpdateProductParams {
  id: string
}

export interface UpdateProductBody {
  name: string
  price: number
  stock: number
  status: 'ACTIVED' | 'DISABLED'
}

export async function updateProduct({ id, name, price, stock, status }: UpdateProductBody & UpdateProductParams) {
  _updateProduct(id, { name, price, stock, status })
}
