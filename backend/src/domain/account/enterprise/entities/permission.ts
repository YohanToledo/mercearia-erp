import { Entity } from "@/core/entities/entity"

export interface PermissionProps {
    name: string
    description: string
    resource: string
    createdAt?: Date
    updatedAt?: Date
}

export class Permission extends Entity<PermissionProps> {
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

    get resource() {
        return this.props.resource
    }

    set resource(resource: string) {
        this.props.resource = resource
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: PermissionProps, id?: number) {
        return new Permission(props, id ?? 0)
    }
}