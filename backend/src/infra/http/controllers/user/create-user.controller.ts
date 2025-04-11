import { z } from 'zod'

import { CreateUserUseCase } from '@/domain/account/application/use-cases/create-user'
import { CurrentUser } from '@/infra/auth/authentication/current-user-decorator'
import { UserPayload } from '@/infra/auth/authentication/jwt.strategy'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { UserPresenter } from '../../presenters/user.presenter'
import { Public } from '@/infra/auth/authentication/public'

const createAccountBodySchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string().min(5),
  email: z.string().email().optional(),
  active: z.boolean().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('users')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateAccountBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, username, password, email, active } = body

    const result = await this.createUser.execute({
      name,
      username,
      password,
      email,
      active,
    })

    if (result.isLeft()) {
      const error = result.value
      throw error.toHttpException()
    }

    const { user: createdUser } = result.value

    return UserPresenter.toHTTP(createdUser)
  }
}
