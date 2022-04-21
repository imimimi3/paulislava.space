import { Module } from '@nestjs/common'

import { ConfigController } from '~/app/config/config.controller'
import { ConfigService } from '~/app/config/config.service'

@Module({
  exports: [ConfigService],
  providers: [ConfigService],
  controllers: [ConfigController]
})
export class ConfigModule {}
