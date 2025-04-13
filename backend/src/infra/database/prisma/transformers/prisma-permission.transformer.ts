import { Permission } from '@/domain/account/enterprise/entities/permission'
import { Prisma, Permission as PrismaPermission } from '@prisma/client'

export class PrismaPermissionTransformer {
  static toDomain(raw: PrismaPermission): Permission {
    return Permission.create(
      {
        name: raw.name,
        description: raw.description,
        resource: raw.resource,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }
}
