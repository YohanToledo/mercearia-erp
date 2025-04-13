import { User } from '@/domain/account/enterprise/entities/user'
import { Prisma, User as PrismaUser, Role as PrismaRole, Permission } from '@prisma/client'

type RoleWithRelations = PrismaRole & {
  permissions: Permission[]
}

type UserWithRelations = PrismaUser & {
  role: RoleWithRelations | null
}
export class PrismaUserTransformer {
  static toDomain(raw: UserWithRelations): User {
    return User.create(
      {
        username: raw.username,
        password: raw.password,
        name: raw.name,
        email: raw.email,
        active: raw.active,
        roleId: raw.roleId,
        role: raw.role || undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      username: user.username,
      password: user.password,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      active: user.active,
    }
  }

  static toPrismaUpdate(user: Partial<User>): Prisma.UserUpdateArgs {
    if (!user.id) {
      throw new Error('User ID is required to perform an update')
    }

    return {
      where: {
        id: user.id,
      },
      data: {
        username: user.username,
        name: user.name,
        email: user.email,
        active: user.active,
        password: user.password,
        roleId: user.roleId,
      },
    }
  }
}
