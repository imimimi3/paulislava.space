import { Controller, Get } from '@nestjs/common'

import { Version } from '~/app/config/config.schema'
import { ConfigService } from '~/app/config/config.service'

@Controller()
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Get('/config/version')
  version(): Version {
    return this.configService.version
  }
}
