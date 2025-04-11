import { Injectable } from '@nestjs/common'

import { EnvService } from '../env/env.service'

interface MailOptions {
  to: string
  subject: string
  template?: string
  context?: unknown
  text?: string
  html?: string
}

@Injectable()
export class MailService {
  constructor(private readonly envService: EnvService) { }

  async sendMail(options: MailOptions) { }
}
