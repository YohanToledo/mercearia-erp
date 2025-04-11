import { createNewProduct } from "./data/products"

export interface CreateProductBody {
  name: string;
  salePrice: number;
  stock: number;
  status: 'ACTIVED' | 'DISABLED'
}

export async function createProduct(data: CreateProductBody) {
  createNewProduct(data)
}
