import { z } from 'zod'

import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateProductUseCase } from '@/domain/product/application/use-cases/create-product'
import { ProductPresenter } from '../../presenters/product.presenter'

const createProductBodySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  unitCost: z.number().nonnegative('Custo unitário não pode ser negativo'),
  salePrice: z.number().nonnegative('Preço de venda não pode ser negativo'),
  profitMargin: z.number().nonnegative('Margem de lucro não pode ser negativa').optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED'], { message: 'Status inválido' }).optional().default("ACTIVE"),
  categoryId: z.string().uuid('ID da categoria inválido'),
  stock: z.number().int('Estoque deve ser um número inteiro').nonnegative('Estoque não pode ser negativo'),
  minStockLevel: z.number().int('Estoque mínimo deve ser um número inteiro').nonnegative().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema)

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>

@Controller('products')
export class CreateProductController {
  constructor(private createProduct: CreateProductUseCase) { }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateProductBodySchema,
  ) {
    const result = await this.createProduct.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    const { product: createdProduct } = result.value

    return ProductPresenter.toHTTP(createdProduct)
  }
}
