import { Module } from '@nestjs/common'

import { EnvService } from '../env/env.service'
import { MailService } from './mail.service'

@Module({
  providers: [EnvService, MailService],
  exports: [MailService],
})
export class MailModule {}
