import { User } from '@/domain/account/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
      active: user.active,
    }
  }
}
