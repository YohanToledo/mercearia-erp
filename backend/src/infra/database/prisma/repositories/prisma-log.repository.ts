import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PrismaUserTransformer } from '../transformers/prisma-user.transformer'
import { LogRepository } from '@/domain/log/application/repositories/log.repository'

@Injectable()
export class PrismaLogRepository implements LogRepository {
  constructor(private prisma: PrismaService) { }

  async create({ action, entity, entityId, userId, oldValue, newValue }: {
    action: string
    entity: string
    entityId?: number
    userId?: number
    oldValue?: any
    newValue?: any
  }): Promise<void> {
    await this.prisma.auditLog.create({
      data: { action, entity, entityId, userId, oldValue, newValue },
    })
  }
}
