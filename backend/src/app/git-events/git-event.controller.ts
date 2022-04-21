import { Body, Controller, Headers, Post } from '@nestjs/common'
import { exec } from 'child_process'
import { createHmac } from 'crypto'
import { RawBody } from '~/common/decorators/rawbody.decorator'
import { ConfigService } from '../config/config.service'
import { EventPayload } from './git-event.dto'
import { GitEventService } from './git-event.service'

@Controller('git-event')
export class GitEventController {
    constructor(
        private readonly configService: ConfigService,
        private readonly gitEventService: GitEventService
    ) {}

    @Post()
    async gitEventHandle(
        @Headers('X-GitHub-Event') event: string,
        @Headers('X-Hub-Signature-256') signature: string,
        @RawBody() rawData: string,
        @Body() data: EventPayload
    ): Promise<void> {
        console.info(`Git event: ${event}`)
        const secret = this.configService.github.hookSecret

        const mySignature = 'sha256=' + createHmac('sha256', secret).update(rawData).digest('hex')

        if (mySignature != signature) {
            throw new Error('Wrong git event signature!')
        }

        if (event == 'push') {
            this.gitEventService.handlePushEvent(data)
            await exec('cd /var/www/ && git pull origin master', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error.message}`)
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`)
                }
                console.info(`${stdout}`)
            })
        }

        console.info('Github event successfully handled')
    }
}
