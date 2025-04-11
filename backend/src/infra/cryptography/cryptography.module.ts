import { Module } from '@nestjs/common'

import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    {
      provide: JwtEncrypter,
      useClass: JwtEncrypter,
    },
  ],
  exports: [JwtEncrypter],
})
export class CryptographyModule {}
