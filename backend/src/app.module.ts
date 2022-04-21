import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './app/config/config.module'
import { GitEventModule } from './app/git-events/git-event.module'
import { DatabaseModule } from './app/database/database.module'

@Module({
    imports: [
        ConfigModule,
        EventEmitterModule.forRoot({ global: true }),
        DatabaseModule,
        GitEventModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
