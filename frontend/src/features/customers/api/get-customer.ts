import { getCustomers } from './data/customers';

export interface GetCustomersQuery {
  page?: number | null
  limit?: number | null
  search?: string | null
}

export async function fetchCustomers(query: GetCustomersQuery) {
  console.log(query)
  const response = getCustomers()

  return {
    customers: response.data.content,
    meta: response.data.page
  }
}
