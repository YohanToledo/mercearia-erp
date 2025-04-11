import { getProducts } from './data/products';

export interface GetProductsQuery {
  page?: number | null
  limit?: number | null
  search?: string | null
}

export async function fetchProducts(query: GetProductsQuery) {
  console.log(query)
  const response = getProducts()

  return {
    products: response.data.content,
    meta: response.data.page
  }
}
