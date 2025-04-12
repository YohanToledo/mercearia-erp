import { z } from 'zod'

import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { UpdateProductCategoryUseCase } from '@/domain/product/application/use-cases/update-category'
import { ProductCategoryPresenter } from '../../presenters/product-category.presenter'

const createProductCategoryBodySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED'], { message: 'Status inválido' }).optional().default("ACTIVE"),
})

const bodyValidationPipe = new ZodValidationPipe(createProductCategoryBodySchema)

type UpdateProductCategoryBodySchema = z.infer<typeof createProductCategoryBodySchema>

@Controller('products/categories/:id')
export class UpdateProductCategoryController {
  constructor(private updateCategory: UpdateProductCategoryUseCase) { }

  @Patch()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: UpdateProductCategoryBodySchema,
    @Param('id') categoryId: number,
  ) {
    if (Number.isNaN(categoryId))
      throw new BadRequestException('Invalid product id')

    const result = await this.updateCategory.execute({ id: Number(categoryId), ...body })

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    return ProductCategoryPresenter.toHTTP(result.value)
  }
}
