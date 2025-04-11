import { createNewProduct } from "./data/products"

export interface CreateProductBody {
  name: string;
  price: number;
  stock: number;
  status: 'ACTIVED' | 'DISABLED'
}

export async function createProduct(data: CreateProductBody) {
  createNewProduct(data)
}
