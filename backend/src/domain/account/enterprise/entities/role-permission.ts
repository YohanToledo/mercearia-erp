import { Entity } from "@/core/entities/entity"

export interface RolePermissionProps {
    roleId: string
    permissionId: string
}

export class RolePermission extends Entity<RolePermissionProps> {
    get roleId() {
        return this.props.roleId
    }

    get permissionId() {
        return this.props.permissionId
    }

    static create(props: RolePermissionProps) {
        return new RolePermission(props)
    }
}