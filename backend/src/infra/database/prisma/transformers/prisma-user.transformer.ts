import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/account/enterprise/entities/user'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserTransformer {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        username: raw.username,
        password: raw.password,
        name: raw.name,
        email: raw.email,
        active: raw.active,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      username: user.username,
      password: user.password,
      name: user.name,
      email: user.email,
      active: user.active,
    }
  }

  static toPrismaUpdate(user: Partial<User>): Prisma.UserUpdateArgs {
    if (!user.id) {
      throw new Error('User ID is required to perform an update')
    }

    return {
      where: {
        id: user.id.toString(),
      },
      data: {
        username: user.username,
        name: user.name,
        email: user.email,
        active: user.active,
        password: user.password,
      },
    }
  }
}
