import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface RoleProps {
    name: string
}

export class Role extends Entity<RoleProps> {
    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    static create(props: RoleProps, id?: UniqueEntityID) {
        return new Role(props, id)
    }
}