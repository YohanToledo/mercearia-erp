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

    static create(props: PermissionProps, id?: number) {
        return new Permission(props, id ?? 0)
    }
}