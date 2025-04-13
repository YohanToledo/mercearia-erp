import { PaginationParams } from '@/core/repositories/pagination-params'
import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { Role } from '@/domain/account/enterprise/entities/role';
import { PrismaRoleTransformer } from '../transformers/prisma-role.transformer';
import { RoleRepository } from '@/domain/account/application/repositories/role.repository';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private prisma: PrismaService) { }

  async findMany(
    { page, limit }: PaginationParams,
  ): Promise<{ roles: Role[]; total: number }> {
    const total = await this.prisma.role.count()

    const roles = await this.prisma.role.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
      include: {
        permissions: true,
      }
    })

    return {
      roles: roles.map(PrismaRoleTransformer.toDomain),
      total,
    }
  }

  async findById(id: number): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      }
    })

    if (!role) {
      return null
    }

    return PrismaRoleTransformer.toDomain(role)
  }

  async save(role: Partial<Role>): Promise<void> {
    const data = PrismaRoleTransformer.toPrismaUpdate(role)
    await this.prisma.role.update(data)
  }

  async create(role: Role): Promise<Role> {
    const data = PrismaRoleTransformer.toPrisma(role)

    const createdRole = await this.prisma.role.create({
      data,
    })

    return Role.create(createdRole, createdRole.id)
  }

  async delete(id: number): Promise<void> {

    await this.prisma.role.delete({
      where: { id }
    })
  }
}
