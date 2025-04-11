import { getExpenses } from "./data/expenses"

export interface GetExpensesQuery {
  page?: number | null
  limit?: number | null
  search?: string | null
}

export async function fetchExpenses(query: GetExpensesQuery) {
  console.log(query)
  const response = getExpenses()

  return {
    expenses: response.data.content,
    meta: response.data.page
  }
}
