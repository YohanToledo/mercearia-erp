import { Role } from '@/domain/account/enterprise/entities/role'
import { Prisma, Role as PrismaRole, Permission } from '@prisma/client'

type RoleWithRelations = PrismaRole & {
  permissions: Permission[] | null
}

export class PrismaRoleTransformer {
  static toDomain(raw: RoleWithRelations): Role {
    return Role.create(
      {
        name: raw.name,
        description: raw.description,
        active: raw.active,
        permissions: raw.permissions || undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }

  static toPrisma(role: Role): Prisma.RoleUncheckedCreateInput {
    return {
      name: role.name,
      description: role.description,
      active: role.active,
      ...(role.permissions && {
        permissions: {
          connect: role.permissions.map(permission => ({
            id: permission.id,
          })),
        },
      })
    }
  }

  static toPrismaUpdate(role: Partial<Role>): Prisma.RoleUpdateArgs {
    if (!role.id) {
      throw new Error('Role ID is required to perform an update')
    }

    return {
      where: {
        id: role.id,
      },
      data: {
        name: role.name,
        description: role.description,
        active: role.active,
      },
    }
  }
}
