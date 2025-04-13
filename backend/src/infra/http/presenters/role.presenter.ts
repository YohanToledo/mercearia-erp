import { Role } from "@/domain/account/enterprise/entities/role";

export class RolePresenter {
  static toHTTP(role: Role) {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      ...(role.permissions && { permissions: role.permissions.map(permission => permission.name), })
    }
  }
}
