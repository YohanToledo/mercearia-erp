import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { Encrypter } from './encrypter'

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwt: JwtService) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwt.signAsync(payload)
  }
}
