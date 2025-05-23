import { Entity } from "@/core/entities/entity"

export interface RolePermissionProps {
    roleId: string
    permissionId: string
    createdAt?: Date
    updatedAt?: Date
}

export class RolePermission extends Entity<RolePermissionProps> {
    get roleId() {
        return this.props.roleId
    }

    get permissionId() {
        return this.props.permissionId
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: RolePermissionProps, id?: number) {
        return new RolePermission(props, id ?? 0)
    }
}