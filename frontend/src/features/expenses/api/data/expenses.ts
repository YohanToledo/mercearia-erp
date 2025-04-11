interface Expense {
    id: string;
    description: string
    amount: number
    category: string
    date: any
    paymentMethod: string
    status: ExpenseStatus
    invoiceNumber?: string
    notes?: string
}

type ExpenseStatus = 'PAID' | 'PENDING'

let expenses: Expense[] = [];

function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpensesFromLocalStorage() {
    const storedExpenses = localStorage.getItem('expenses');
    expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
}


// Create a new expense
export function createNewExpense(expense: Omit<Expense, 'id'>): Expense {
    loadExpensesFromLocalStorage();

    const newExpense: Expense = { id: String(Date.now()), ...expense };
    expenses.push(newExpense);
    saveExpensesToLocalStorage();
    return newExpense;
}

// Read all expenses
export function getExpenses() {
    loadExpensesFromLocalStorage();

    return {
        data: {
            content: expenses,
            page: {
                current: 1,
                size: expenses.length,
                totalCount: expenses.length,
                totalPages: 1
            }
        }
    }
}

// Read a single expense by ID
export function getExpenseById(id: string): Expense | undefined {
    loadExpensesFromLocalStorage();

    return expenses.find(expense => expense.id === id);
}

// Update a expense by ID
export function _updateExpense(id: string, updatedExpense: Partial<Omit<Expense, 'id'>>): Expense | undefined {
    loadExpensesFromLocalStorage();

    const expenseIndex = expenses.findIndex(expense => expense.id === id);
    if (expenseIndex === -1) return undefined;

    expenses[expenseIndex] = { ...expenses[expenseIndex], ...updatedExpense };
    saveExpensesToLocalStorage();

    return expenses[expenseIndex];
}

export function _updateExpenseStatus(id: string, status: ExpenseStatus): Expense | undefined {
    loadExpensesFromLocalStorage();

    const expenseIndex = expenses.findIndex(expense => expense.id === id);
    if (expenseIndex === -1) return undefined;

    expenses[expenseIndex] = { ...expenses[expenseIndex], status };

    saveExpensesToLocalStorage();
    return expenses[expenseIndex];
}

// Delete a expense by ID
export function deleteExpense(id: string): boolean {
    loadExpensesFromLocalStorage();

    const initialLength = expenses.length;
    expenses = expenses.filter(expense => expense.id !== id);

    saveExpensesToLocalStorage();
    return expenses.length < initialLength;
}