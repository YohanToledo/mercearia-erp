import { z } from 'zod'

import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateSupplierUseCase } from '@/domain/supplier/application/use-cases/create-supplier'
import { SupplierPresenter } from '../../presenters/supplier.presenter'

const createSupplierBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  phone: z.string().min(1).optional(),
  email: z.string().email().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED'], { message: 'Status inválido' }).default("ACTIVE"),
})

const bodyValidationPipe = new ZodValidationPipe(createSupplierBodySchema)

type CreateSupplierBodySchema = z.infer<typeof createSupplierBodySchema>

@Controller('suppliers')
export class CreateSupplierController {
  constructor(private createSupplier: CreateSupplierUseCase) { }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateSupplierBodySchema,
  ) {
    const result = await this.createSupplier.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    const { supplier: createdSupplier } = result.value

    return SupplierPresenter.toHTTP(createdSupplier)
  }
}
