import { createNewExpense } from "./data/expenses";

export interface CreateExpenseBody {
  description: string
  amount: number
  category: string
  date: any
  paymentMethod: string
  status: 'PAID' | 'PENDING'
  invoiceNumber?: string
  notes?: string
}

export async function createExpense(data: CreateExpenseBody) {
  createNewExpense(data)
}
