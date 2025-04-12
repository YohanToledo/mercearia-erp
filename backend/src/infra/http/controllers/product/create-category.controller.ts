import { z } from 'zod'

import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateProductCategoryUseCase } from '@/domain/product/application/use-cases/create-category'
import { ProductCategoryPresenter } from '../../presenters/product-category.presenter'

const createProductCategoryBodySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED'], { message: 'Status inválido' }).optional().default("ACTIVE"),
})

const bodyValidationPipe = new ZodValidationPipe(createProductCategoryBodySchema)

type CreateProductCategoryBodySchema = z.infer<typeof createProductCategoryBodySchema>

@Controller('products/categories')
export class CreateProductCategoryController {
  constructor(private createProduct: CreateProductCategoryUseCase) { }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateProductCategoryBodySchema,
  ) {
    const result = await this.createProduct.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    return ProductCategoryPresenter.toHTTP(result.value)
  }
}
