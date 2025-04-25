export interface PaymentMethod {
    id: number
    name: string
    description: string | null
    active: boolean
    createdAt?: Date
    updatedAt?: Date
}