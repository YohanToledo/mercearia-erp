import { PaginationParams } from '@/core/repositories/pagination-params'
import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PermissionRepository } from '@/domain/account/application/repositories/permission.repository';
import { Permission } from '@/domain/account/enterprise/entities/permission';
import { PrismaPermissionTransformer } from '../transformers/prisma-permission.transformer';

@Injectable()
export class PrismaPermissionRepository implements PermissionRepository {
  constructor(private prisma: PrismaService) { }

  async findMany(
    { page, limit }: PaginationParams,
  ): Promise<{ permissions: Permission[]; total: number }> {
    const total = await this.prisma.permission.count()

    const permissions = await this.prisma.permission.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      permissions: permissions.map(PrismaPermissionTransformer.toDomain),
      total,
    }
  }

  async findManyByIds(
    ids: number[]
  ): Promise<Permission[]> {
    const total = await this.prisma.permission.count()

    const permissions = await this.prisma.permission.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return permissions.map(PrismaPermissionTransformer.toDomain)
  }
}
