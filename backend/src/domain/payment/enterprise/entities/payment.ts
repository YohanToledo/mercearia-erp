import { Entity } from '@/core/entities/entity'
import { PaymentMethod } from './types/payment'

export interface PaymentProps {
    saleId: number
    methodId: number
    method: PaymentMethod | null
    amount: number
    paidAt: Date | null
    createdAt?: Date
    updatedAt?: Date
}

export class Payment extends Entity<PaymentProps> {
    get saleId() {
        return this.props.saleId
    }

    set saleId(saleId: number) {
        this.props.saleId = saleId
    }

    get methodId() {
        return this.props.methodId
    }

    set methodId(methodId: number) {
        this.props.methodId = methodId
    }

    get method() {
        return this.props.method
    }

    set method(method: PaymentMethod | null) {
        this.props.method = method
    }

    get amount() {
        return this.props.amount
    }

    set amount(amount: number) {
        this.props.amount = amount
    }

    get paidAt() {
        return this.props.paidAt
    }

    set paidAt(paidAt: Date | null) {
        this.props.paidAt = paidAt
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: PaymentProps, id?: number) {
        return new Payment(props, id ?? 0)
    }

    update(props: Partial<PaymentProps>): void {
        Object.assign(this.props, props)
    }
}
