import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface PermissionProps {
    name: string
    description: string
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

    static create(props: PermissionProps, id?: UniqueEntityID) {
        return new Permission(props, id)
    }
}