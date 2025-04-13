import { User } from '@/domain/account/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      active: user.active,
      ...(user.role && user.role.permissions && {
        role: user.role.name,
        permissions: user.role.permissions.map(permission => permission.name)
      })
    }
  }
}
