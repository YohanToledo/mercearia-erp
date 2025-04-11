import { PaginationParams } from '@/core/repositories/pagination-params'
import { UserRepository } from '@/domain/account/application/repositories/user.repository'
import { User } from '@/domain/account/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { PrismaUserTransformer } from '../transformers/prisma-user.transformer'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(
    { page, limit }: PaginationParams,
    filters?: { search?: string },
  ): Promise<{ users: User[]; total: number }> {
    const { search } = filters || {}

    const whereConditions: Prisma.UserWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
    }

    const total = await this.prisma.user.count({
      where: whereConditions,
    })

    const users = await this.prisma.user.findMany({
      where: whereConditions,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      users: users.map(PrismaUserTransformer.toDomain),
      total,
    }
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return null
    }

    return PrismaUserTransformer.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserTransformer.toDomain(user)
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserTransformer.toDomain(user)
  }

  async save(user: Partial<User>): Promise<void> {
    const data = PrismaUserTransformer.toPrismaUpdate(user)
    await this.prisma.user.update(data)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserTransformer.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }

  async delete(user: User): Promise<void> {
    const data = PrismaUserTransformer.toPrisma(user)

    await this.prisma.user.delete({
      where: { id: data.id },
    })
  }
}
