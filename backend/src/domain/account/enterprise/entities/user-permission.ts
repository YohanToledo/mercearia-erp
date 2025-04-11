import { Entity } from "@/core/entities/entity"

export interface UserPermissionProps {
    userId: string
    permissionId: string
}

export class UserPermission extends Entity<UserPermissionProps> {
    get userId() {
        return this.props.userId
    }

    get permissionId() {
        return this.props.permissionId
    }

    static create(props: UserPermissionProps) {
        return new UserPermission(props)
    }
}