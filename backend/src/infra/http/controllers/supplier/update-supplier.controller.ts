import { z } from 'zod'

import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { UpdateSupplierUseCase } from '@/domain/supplier/application/use-cases/update-supplier'
import { SupplierPresenter } from '../../presenters/supplier.presenter'

const updateSupplierBodySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  email: z.string().email().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED'], { message: 'Status inválido' }).optional(),
})

const bodyValidationPipe = new ZodValidationPipe(updateSupplierBodySchema)

type UpdateSupplierBodySchema = z.infer<typeof updateSupplierBodySchema>

@Controller('suppliers/:id')
export class UpdateSupplierController {
  constructor(private updateSupplier: UpdateSupplierUseCase) { }

  @Patch()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: UpdateSupplierBodySchema,
    @Param('id') supplierId: number,
  ) {
    if(Number.isNaN(supplierId))
          throw new BadRequestException('Invalid supplier id')

    const result = await this.updateSupplier.execute({ id: Number(supplierId), ...body })

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    return SupplierPresenter.toHTTP(result.value)
  }
}
