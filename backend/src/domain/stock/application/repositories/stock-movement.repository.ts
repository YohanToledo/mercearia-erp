import { PaginationParams } from '@/core/repositories/pagination-params'
import { StockMovement, StockMovementType } from '../../enterprise/entities/stock-movement';

export abstract class StockMovementRepository {
  abstract findMany(
    params: PaginationParams,
    filters?: { search?: string, type?: StockMovementType },
  ): Promise<{ stockMovements: StockMovement[]; total: number }>

  abstract findById(id: number): Promise<StockMovement | null>
  abstract create(stockMovement: StockMovement): Promise<StockMovement>
  abstract softDelete(stockMovement: StockMovement): Promise<void>
}
