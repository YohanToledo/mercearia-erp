import { z } from 'zod'

import { UpdateUserUseCase } from '@/domain/account/application/use-cases/update-user'
import {
  BadRequestException,
  Controller,
  Patch,
  Param,
  Body,
} from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const updateUserBodySchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  active: z.boolean().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(updateUserBodySchema)

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

@Controller('/users/:id')
export class UpdateUserController {
  constructor(private updateUser: UpdateUserUseCase) {}

  @Patch()
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @Param('id') userId: number,
  ) {
    if(Number.isNaN(userId))
      throw new BadRequestException('Invalid user id')

    const { name, email, active } = body

    const result = await this.updateUser.execute({
      id: Number(userId),
      name,
      email,
      active,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
