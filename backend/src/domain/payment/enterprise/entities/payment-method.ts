import { Entity } from '@/core/entities/entity'

export interface PaymentMethodProps {
    name: string
    description: string | null
    active: boolean
    createdAt?: Date
    updatedAt?: Date
}

export class PaymentMethod extends Entity<PaymentMethodProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get description() {
        return this.props.description
    }

    set description(description: string | null) {
        this.props.description = description
    }

    get active() {
        return this.props.active
    }

    set active(active: boolean) {
        this.props.active = active
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: PaymentMethodProps, id?: number) {
        return new PaymentMethod(props, id ?? 0)
    }

    update(props: Partial<PaymentMethodProps>): void {
        Object.assign(this.props, props)
    }
}
