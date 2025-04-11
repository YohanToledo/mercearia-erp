import { Entity } from '@/core/entities/entity'
import { ProductCategory } from '@prisma/client'

export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'

export interface ProductProps {
    name: string
    description: string | null
    unitCost: number
    salePrice: number
    profitMargin: number
    status: ProductStatus
    categoryId: number
    category?: ProductCategory
    stock: number
    minStockLevel: number
    createdAt?: Date
    updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
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

    get unitCost() {
        return this.props.unitCost
    }

    set unitCost(unitCost: number) {
        this.props.unitCost = unitCost
    }

    get salePrice() {
        return this.props.salePrice
    }

    set salePrice(salePrice: number) {
        this.props.salePrice = salePrice
    }

    get profitMargin() {
        return this.props.profitMargin
    }

    set profitMargin(profitMargin: number) {
        this.props.profitMargin = profitMargin
    }

    get status() {
        return this.props.status
    }

    set status(status: ProductStatus) {
        this.props.status = status
    }

    get categoryId() {
        return this.props.categoryId
    }

    set categoryId(categoryId: number) {
        this.props.categoryId = categoryId
    }

    get category(): ProductCategory | undefined {
        return this.props.category
    }

    set category(category: ProductCategory) {
        this.props.category = category
    }

    get stock() {
        return this.props.stock
    }

    set stock(stock: number) {
        this.props.stock = stock
    }

    get minStockLevel() {
        return this.props.minStockLevel
    }

    set minStockLevel(minStockLevel: number) {
        this.props.minStockLevel = minStockLevel
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: ProductProps, id?: number) {
        return new Product(props, id ?? 0)
    }

    update(props: Partial<ProductProps>): void {
        Object.assign(this.props, props)
    }
}
