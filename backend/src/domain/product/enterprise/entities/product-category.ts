import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type ProductCategoryStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'

export interface ProductCategoryProps {
    name: string
    description: string
    status: ProductCategoryStatus
    createdAt?: Date
    updatedAt?: Date
}

export class ProductCategory extends Entity<ProductCategoryProps> {
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

    get status() {
        return this.props.status
    }

    set status(status: ProductCategoryStatus) {
        this.props.status = status
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: ProductCategoryProps, id?: UniqueEntityID) {
        return new ProductCategory(props, id)
    }

    update(props: Partial<ProductCategoryProps>): void {
        Object.assign(this.props, props)
    }
}
