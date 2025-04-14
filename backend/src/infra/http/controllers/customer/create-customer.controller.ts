import { z } from 'zod'

import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateCustomerUseCase } from '@/domain/customer/application/use-cases/create-customer'
import { CustomerPresenter } from '../../presenters/customer.presenter'

const createCustomerBodySchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1).optional(),
  email: z.string().email().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED'], { message: 'Status inválido' }).default("ACTIVE"),
})

const bodyValidationPipe = new ZodValidationPipe(createCustomerBodySchema)

type CreateCustomerBodySchema = z.infer<typeof createCustomerBodySchema>

@Controller('customers')
export class CreateCustomerController {
  constructor(private createCustomer: CreateCustomerUseCase) { }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateCustomerBodySchema,
  ) {
    const result = await this.createCustomer.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    const { customer: createdCustomer } = result.value

    return CustomerPresenter.toHTTP(createdCustomer)
  }
}
