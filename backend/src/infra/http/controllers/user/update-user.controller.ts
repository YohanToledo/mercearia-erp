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
  status: z.enum(['ACTIVED', 'DISABLED']).optional(),
})

const bodyValidationPipe = new ZodValidationPipe(updateUserBodySchema)

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

@Controller('/users/:id')
export class UpdateUserController {
  constructor(private updateUser: UpdateUserUseCase) {}

  @Patch()
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @Param('id') userId: string,
  ) {
    const { name, email, status } = body

    const result = await this.updateUser.execute({
      id: userId,
      name,
      email,
      status,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
