import { Entity } from '@/core/entities/entity'

export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX'

export interface PaymentProps {
    saleId: number
    method: PaymentMethod
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

    get method() {
        return this.props.method
    }

    set method(method: PaymentMethod) {
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
