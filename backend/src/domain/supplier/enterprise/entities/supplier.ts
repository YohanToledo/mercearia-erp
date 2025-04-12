import { Entity } from '@/core/entities/entity'

export type SupplierStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'

export interface SupplierProps {
    name: string
    description: string | null
    phone: string | null
    email: string | null
    status: SupplierStatus
    createdAt?: Date
    updatedAt?: Date
}

export class Supplier extends Entity<SupplierProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get description(){
        return this.props.description
    }

    set description(description: string | null){
        this.props.description = description
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

    set status(status: SupplierStatus) {
        this.props.status = status
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: SupplierProps, id?: number) {
        return new Supplier(props, id ?? 0)
    }

    update(props: Partial<SupplierProps>): void {
        Object.assign(this.props, props)
    }
}
