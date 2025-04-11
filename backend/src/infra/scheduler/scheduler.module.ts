import { Module } from "@nestjs/common";
import { EnvModule } from "../env/env.module";
import { DatabaseModule } from "../database/database.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [
        EnvModule,
        DatabaseModule,
        ScheduleModule.forRoot(),
    ],
    providers: [],
})
export class SchedulerModule {}
