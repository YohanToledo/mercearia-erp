import { Entity } from '@/core/entities/entity'
import { User } from '@/domain/account/enterprise/entities/user'
import { Customer } from '@/domain/customer/enterprise/entities/customer'
import { Payment } from '@/domain/payment/enterprise/entities/payment'

export type SaleStatus = 'PAID' | 'PENDING' | 'CANCELLED'

export interface SaleProps {
    customerId: number | null
    customer?: Customer
    status: SaleStatus
    totalAmount: number
    // paymentMethod: PaymentMethod | null
    paidAt: Date | null

    userId: number
    user: User

    // saleItems: SaleItem[]
    payments: Payment[]

    createdAt?: Date
    updatedAt?: Date
}

export class Sale extends Entity<SaleProps> {
    get customerId() {
        return this.props.customerId
    }

    set customerId(customerId: number | null) {
        this.props.customerId = customerId
    }

    get customer() {
        return this.props.customer || undefined
    }

    set customer(customer: Customer | undefined) {
        this.props.customer = customer
    }

    get status() {
        return this.props.status
    }

    set status(status: SaleStatus) {
        this.props.status = status
    }

    get totalAmount() {
        return this.props.totalAmount
    }

    set totalAmount(totalAmount: number) {
        this.props.totalAmount = totalAmount
    }

    // get paymentMethod() {
    //     return this.props.paymentMethod
    // }

    // set paymentMethod(paymentMethod: PaymentMethod | null) {
    //     this.props.paymentMethod = paymentMethod
    // }

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

    static create(props: SaleProps, id?: number) {
        return new Sale(props, id ?? 0)
    }

    update(props: Partial<SaleProps>): void {
        Object.assign(this.props, props)
    }
}
