import { z } from 'zod'

import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { UpdateExpenseCategoryUseCase } from '@/domain/expense/application/use-cases/update-category'
import { ExpenseCategoryPresenter } from '../../presenters/expense-category.presenter'

const createExpenseCategoryBodySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
})

const bodyValidationPipe = new ZodValidationPipe(createExpenseCategoryBodySchema)

type UpdateExpenseCategoryBodySchema = z.infer<typeof createExpenseCategoryBodySchema>

@Controller('expenses/categories/:id')
export class UpdateExpenseCategoryController {
  constructor(private updateCategory: UpdateExpenseCategoryUseCase) { }

  @Patch()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: UpdateExpenseCategoryBodySchema,
    @Param('id') categoryId: number,
  ) {
    if (Number.isNaN(categoryId))
      throw new BadRequestException('Invalid expense id')

    const result = await this.updateCategory.execute({ id: Number(categoryId), ...body })

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    return ExpenseCategoryPresenter.toHTTP(result.value)
  }
}
