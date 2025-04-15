import { Entity } from '@/core/entities/entity'
import { ExpenseCategory } from './expense-category'

export type ExpenseStatus = 'PAID' | 'PENDING'

export interface ExpenseProps {
    description: string
    amount: number
    status: ExpenseStatus
    categoryId: number
    category?: ExpenseCategory
    createdAt?: Date
    updatedAt?: Date
}

export class Expense extends Entity<ExpenseProps> {
    get amount() {
        return this.props.amount
    }

    set amount(amount: number) {
        this.props.amount = amount
    }

    get description() {
        return this.props.description
    }

    set description(description: string) {
        this.props.description = description
    }

    get status() {
        return this.props.status
    }

    set status(status: ExpenseStatus) {
        this.props.status = status
    }

    get categoryId() {
        return this.props.categoryId
    }

    set categoryId(categoryId: number) {
        this.props.categoryId = categoryId
    }

    get category(): ExpenseCategory | undefined {
        return this.props.category
    }

    set category(category: ExpenseCategory) {
        this.props.category = category
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: ExpenseProps, id?: number) {
        return new Expense(props, id ?? 0)
    }

    update(props: Partial<ExpenseProps>): void {
        Object.assign(this.props, props)
    }
}
