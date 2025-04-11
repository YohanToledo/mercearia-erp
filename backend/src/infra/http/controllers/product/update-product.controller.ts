import { z } from 'zod'

import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { UpdateProductUseCase } from '@/domain/product/application/use-cases/update-product'
import { ProductPresenter } from '../../presenters/product.presenter'

const updateProductBodySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  unitCost: z.number().nonnegative('Custo unitário não pode ser negativo').optional(),
  salePrice: z.number().nonnegative('Preço de venda não pode ser negativo').optional(),
  profitMargin: z.number().nonnegative('Margem de lucro não pode ser negativa').optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED'], { message: 'Status inválido' }).optional(),
  categoryId: z.number().optional(),
  stock: z.number().int('Estoque deve ser um número inteiro').nonnegative('Estoque não pode ser negativo').optional(),
  minStockLevel: z.number().int('Estoque mínimo deve ser um número inteiro').nonnegative().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(updateProductBodySchema)

type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>

@Controller('products/:id')
export class UpdateProductController {
  constructor(private updateProduct: UpdateProductUseCase) { }

  @Patch()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: UpdateProductBodySchema,
    @Param('id') productId: number,
  ) {
    if(Number.isNaN(productId))
          throw new BadRequestException('Invalid product id')

    const result = await this.updateProduct.execute({ id: Number(productId), ...body })

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    const { product: createdProduct } = result.value

    return ProductPresenter.toHTTP(createdProduct)
  }
}
