import { Either, left, right } from '@/core/either'
import { UserPayload } from '@/infra/auth/authentication/jwt.strategy'
import { EnvService } from '@/infra/env/env.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface ValidateTokenUseCaseRequest {
  token: string
}

type ValidateTokenUseCaseResponse = Either<WrongCredentialsError, null>

@Injectable()
export class ValidateTokenUseCase {
  constructor(
    private envService: EnvService,
    private jwtService: JwtService,
  ) {}

  async execute(
    request: ValidateTokenUseCaseRequest,
  ): Promise<ValidateTokenUseCaseResponse> {
    const { token } = request

    const userPayload = this.jwtService.verify<UserPayload>(token, {
      secret: Buffer.from(this.envService.get('JWT_PUBLIC_KEY'), 'base64'),
      algorithms: ['RS256'],
    })

    if (!userPayload) {
      return left(new WrongCredentialsError())
    }

    return right(null)
  }
}
