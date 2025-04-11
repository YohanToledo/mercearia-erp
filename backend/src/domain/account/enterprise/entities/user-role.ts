import { Entity } from "@/core/entities/entity"

export interface UserRoleProps {
  userId: string
  roleId: string
}

export class UserRole extends Entity<UserRoleProps> {
  get userId() {
    return this.props.userId
  }

  get roleId() {
    return this.props.roleId
  }

  static create(props: UserRoleProps) {
    return new UserRole(props)
  }
}