import { z } from 'zod'

import { WrongCredentialsError } from '@/domain/account/application/use-cases/errors/wrong-credentials-error'
import { ValidateTokenUseCase } from '@/domain/account/application/use-cases/validate-token'
import { Public } from '@/infra/auth/authentication/public'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const validateTokenBodySchema = z.object({
  token: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(validateTokenBodySchema)

type ValidateTokenBodySchema = z.infer<typeof validateTokenBodySchema>

@Controller('/sessions/validate')
@Public()
export class ValidateTokenController {
  constructor(private validateToken: ValidateTokenUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(@Body(bodyValidationPipe) body: ValidateTokenBodySchema) {
    const { token } = body

    const result = await this.validateToken.execute({ token })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
