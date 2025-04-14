import { z } from 'zod'

import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { UpdateCustomerUseCase } from '@/domain/customer/application/use-cases/update-customer'
import { CustomerPresenter } from '../../presenters/customer.presenter'

const updateCustomerBodySchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  email: z.string().email().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED'], { message: 'Status inválido' }).optional(),
})

const bodyValidationPipe = new ZodValidationPipe(updateCustomerBodySchema)

type UpdateCustomerBodySchema = z.infer<typeof updateCustomerBodySchema>

@Controller('customers/:id')
export class UpdateCustomerController {
  constructor(private updateCustomer: UpdateCustomerUseCase) { }

  @Patch()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: UpdateCustomerBodySchema,
    @Param('id') customerId: number,
  ) {
    if(Number.isNaN(customerId))
          throw new BadRequestException('Invalid customer id')

    const result = await this.updateCustomer.execute({ id: Number(customerId), ...body })

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    return CustomerPresenter.toHTTP(result.value)
  }
}
