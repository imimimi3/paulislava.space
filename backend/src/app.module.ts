import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitEventController } from './git-events/git-event.controller';

@Module({
  imports: [],
  controllers: [AppController, GitEventController],
  providers: [AppService],
})
export class AppModule {}
