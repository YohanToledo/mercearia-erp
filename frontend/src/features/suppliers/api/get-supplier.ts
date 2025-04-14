import { getSuppliers } from './data/suppliers';

export interface GetSuppliersQuery {
  page?: number | null
  limit?: number | null
  search?: string | null
}

export async function fetchSuppliers(query: GetSuppliersQuery) {
  console.log(query)
  const response = getSuppliers()

  return {
    suppliers: response.data.content,
    meta: response.data.page
  }
}
