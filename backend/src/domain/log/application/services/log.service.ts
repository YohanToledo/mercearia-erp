import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { LogRepository } from '../repositories/log.repository'

@Injectable()
export class LogService {
    constructor(private logRepository: LogRepository) { }

    async create(data: {
        action: 'INSERT' | 'UPDATE' | 'DELETE'
        entity: string
        entityId?: number
        userId?: number
        oldValue?: any
        newValue?: any
    }) {
        await this.logRepository.create(data)
    }
}
