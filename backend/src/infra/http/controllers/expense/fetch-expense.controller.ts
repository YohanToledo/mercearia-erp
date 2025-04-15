import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common'

import { ExpensePresenter } from '../../presenters/expense.presenter'
import { FetchExpenseUseCase } from '@/domain/expense/application/use-cases/fetch-expense'

@Controller('expenses/:id')
export class FetchExpenseController {
  constructor(private fetchExpense: FetchExpenseUseCase) { }

  @Get()
  async handle(
    @Param('id') expenseId: number,
  ) {
    if(Number.isNaN(expenseId))
      throw new BadRequestException('Invalid expense id')

    const result = await this.fetchExpense.execute({ id: Number(expenseId) })

    if(result.isLeft()){
      return result.value.toHttpException()
    }

    return ExpensePresenter.toHTTP(result.value)
  }
}
