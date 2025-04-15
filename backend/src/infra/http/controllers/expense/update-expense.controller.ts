import { z } from 'zod'

import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { UpdateExpenseUseCase } from '@/domain/expense/application/use-cases/update-expense'
import { ExpensePresenter } from '../../presenters/expense.presenter'

const updateExpenseBodySchema = z.object({
  description: z.string().min(1).optional(),
  amount: z.number().nonnegative('Custo unitário não pode ser negativo').optional(),
  status: z.enum(['PAID', 'PENDING'], { message: 'Status inválido' }).optional(),
  categoryId: z.number().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(updateExpenseBodySchema)

type UpdateExpenseBodySchema = z.infer<typeof updateExpenseBodySchema>

@Controller('expenses/:id')
export class UpdateExpenseController {
  constructor(private updateExpense: UpdateExpenseUseCase) { }

  @Patch()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: UpdateExpenseBodySchema,
    @Param('id') expenseId: number,
  ) {
    if(Number.isNaN(expenseId))
          throw new BadRequestException('Invalid expense id')

    const result = await this.updateExpense.execute({ id: Number(expenseId), ...body })

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    const { expense: createdExpense } = result.value

    return ExpensePresenter.toHTTP(createdExpense)
  }
}
