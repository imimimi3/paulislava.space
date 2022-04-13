import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GitEventController } from './git-events/git-event.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  controllers: [AppController, GitEventController],
  providers: [AppService]
})
export class AppModule {}
