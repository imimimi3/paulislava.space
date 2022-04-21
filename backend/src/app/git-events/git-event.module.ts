import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { GitCommit } from '../entities/GitCommit'
import { GitEventController } from './git-event.controller'
import { GitEventService } from './git-event.service'

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([GitCommit])],
    providers: [GitEventService, ConfigService],
    controllers: [GitEventController],
    exports: [GitEventService]
})
export class GitEventModule {}
