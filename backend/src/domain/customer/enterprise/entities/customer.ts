import { Entity } from '@/core/entities/entity'

export type CustomerStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'

export interface CustomerProps {
    name: string
    phone: string | null
    email: string | null
    status: CustomerStatus
    createdAt?: Date
    updatedAt?: Date
}

export class Customer extends Entity<CustomerProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get phone() {
        return this.props.phone
    }

    set phone(phone: string | null) {
        this.props.phone = phone
    }

    get email() {
        return this.props.email
    }

    set email(email: string | null) {
        this.props.email = email
    }

    get status() {
        return this.props.status
    }

    set status(status: CustomerStatus) {
        this.props.status = status
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: CustomerProps, id?: number) {
        return new Customer(props, id ?? 0)
    }

    update(props: Partial<CustomerProps>): void {
        Object.assign(this.props, props)
    }
}
