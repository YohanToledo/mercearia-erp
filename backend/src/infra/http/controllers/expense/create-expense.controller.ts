import { z } from 'zod'

import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateExpenseUseCase } from '@/domain/expense/application/use-cases/create-expense'
import { ExpensePresenter } from '../../presenters/expense.presenter'

const createExpenseBodySchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  amount: z.number().nonnegative('Valor da despesa não pode ser negativo'),
  status: z.enum(['PAID', 'PENDING'], { message: 'Status inválido' }).optional().default("PAID"),
  categoryId: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(createExpenseBodySchema)

type CreateExpenseBodySchema = z.infer<typeof createExpenseBodySchema>

@Controller('expenses')
export class CreateExpenseController {
  constructor(private createExpense: CreateExpenseUseCase) { }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateExpenseBodySchema,
  ) {
    const result = await this.createExpense.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    return ExpensePresenter.toHTTP(result.value)
  }
}
