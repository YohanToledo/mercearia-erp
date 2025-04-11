import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './infra/env/env';
import { HttpModule } from './infra/http/http.module';
import { AuthModule } from './infra/auth/auth.module';
import { EnvModule } from './infra/env/env.module';
import { MailModule } from './infra/mail/mail.module';
import { EventsModule } from './infra/events/events.module';
import { SchedulerModule } from './infra/scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    AuthModule,
    EnvModule,
    MailModule,
    EventsModule,
    SchedulerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
