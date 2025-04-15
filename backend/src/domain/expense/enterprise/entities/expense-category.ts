import { Entity } from '@/core/entities/entity'

export interface ExpenseCategoryProps {
    name: string
    description: string
    createdAt?: Date
    updatedAt?: Date
}

export class ExpenseCategory extends Entity<ExpenseCategoryProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get description() {
        return this.props.description
    }

    set description(description: string) {
        this.props.description = description
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: ExpenseCategoryProps, id?: number) {
        return new ExpenseCategory(props, id ?? 0)
    }

    update(props: Partial<ExpenseCategoryProps>): void {
        Object.assign(this.props, props)
    }
}
