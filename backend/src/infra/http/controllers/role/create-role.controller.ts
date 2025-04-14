import { z } from 'zod'

import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/authentication/public'
import { CreateRoleUseCase } from '@/domain/account/application/use-cases/create-role'
import { RolePresenter } from '../../presenters/role.presenter'

const createRoleBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
  permissions: z.array(z.number())
})

const bodyValidationPipe = new ZodValidationPipe(createRoleBodySchema)

type CreateRoleBodySchema = z.infer<typeof createRoleBodySchema>

@Controller('roles')
export class CreateRoleController {
  constructor(private createRole: CreateRoleUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateRoleBodySchema,
  ) {
    const { name, description, active = true, permissions } = body

    const result = await this.createRole.execute({
      name,
      description,
      active,
      permissions
    })

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }


    return RolePresenter.toHTTP(result.value)
  }
}
