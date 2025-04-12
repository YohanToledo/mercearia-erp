import { Entity } from '@/core/entities/entity'

export type StockMovementType =  'SALE' | 'PURCHASE' | 'ADJUSTMENT' | 'RETURN'

export interface StockMovementProps {
    productId: number
    type: StockMovementType
    quantity: number
    createdAt?: Date
}

export class StockMovement extends Entity<StockMovementProps> {

    get productId(){
        return this.props.productId
    }

    set productId(productId: number){
        this.props.productId = productId
    }

    get type(){
        return this.props.type
    }

    set type(type: StockMovementType){
        this.props.type = type
    }

    get quantity(){
        return this.props.quantity
    }

    set quantity(quantity: number){
        this.props.quantity = quantity
    }

    get createdAt() {
        return this.props.createdAt
    }

    static create(props: StockMovementProps, id?: number) {
        return new StockMovement(props, id ?? 0)
    }

    update(props: Partial<StockMovementProps>): void {
        Object.assign(this.props, props)
    }
}
