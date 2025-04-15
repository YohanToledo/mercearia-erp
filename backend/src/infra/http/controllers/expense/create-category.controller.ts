import { z } from 'zod'

import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateExpenseCategoryUseCase } from '@/domain/expense/application/use-cases/create-category'
import { ExpenseCategoryPresenter } from '../../presenters/expense-category.presenter'

const createExpenseCategoryBodySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
})

const bodyValidationPipe = new ZodValidationPipe(createExpenseCategoryBodySchema)

type CreateExpenseCategoryBodySchema = z.infer<typeof createExpenseCategoryBodySchema>

@Controller('expenses/categories')
export class CreateExpenseCategoryController {
  constructor(private createExpense: CreateExpenseCategoryUseCase) { }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateExpenseCategoryBodySchema,
  ) {
    const result = await this.createExpense.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    return ExpenseCategoryPresenter.toHTTP(result.value)
  }
}
