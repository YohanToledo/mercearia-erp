import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { ExpenseCategoryPresenter } from '../../presenters/expense-category.presenter'
import { FetchExpenseCategoryUseCase } from '@/domain/expense/application/use-cases/fetch-category'

@Controller('expenses/categories/:id')
export class FetchExpenseCategoryController {
  constructor(private fetchCategory: FetchExpenseCategoryUseCase) { }

  @Get()
  async handle(
    @Param('id') caetgoryId: number,
  ) {
    if (Number.isNaN(caetgoryId))
      throw new BadRequestException('Invalid category id')

    const result = await this.fetchCategory.execute({ id: Number(caetgoryId) })

    if (result.isLeft()) {
      return result.value.toHttpException()
    }

    return ExpenseCategoryPresenter.toHTTP(result.value)
  }
}
