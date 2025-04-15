export abstract class LogRepository {
    abstract create(data: {
        action: string
        entity: string
        entityId?: number
        userId?: number
        oldValue?: any
        newValue?: any
    }): Promise<void>
}