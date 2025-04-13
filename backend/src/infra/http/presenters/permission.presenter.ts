import { Permission } from "@/domain/account/enterprise/entities/permission";

export class PermissionPresenter {
  static toHTTP(permission: Permission) {
    return {
      id: permission.id,
      name: permission.name,
      description: permission.description,
      resource: permission.resource,
    }
  }
}
