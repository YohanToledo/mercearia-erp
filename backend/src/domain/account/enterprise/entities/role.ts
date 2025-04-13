import { Entity } from "@/core/entities/entity"
import { Permission } from "./types/role"

export interface RoleProps {
    name: string
    description: string
    active: boolean
    permissions?: Permission[]
    createdAt?: Date
    updatedAt?: Date
}

export class Role extends Entity<RoleProps> {
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

    get active() {
        return this.props.active
    }

    get permissions() {
        return this.props.permissions
    }

    set permissions(permissions: Permission[] | undefined) {
        this.props.permissions = permissions
    }

    set active(active: boolean) {
        this.props.active = active
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: RoleProps, id?: number) {
        return new Role(props, id ?? 0)
    }
}