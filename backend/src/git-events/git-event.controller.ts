import { Controller, Headers, Post } from '@nestjs/common'
import { exec } from 'child_process'
import { createHmac } from 'crypto'
import { RawBody } from 'src/decorators/rawbody.decorator'

@Controller('git-event')
export class GitEventController {
  @Post()
  async gitEventHandle(
    @Headers('X-GitHub-Event') event: string,
    @Headers('X-Hub-Signature-256') signature: string,
    @RawBody() data: string
  ): Promise<void> {
    console.info(`Git event: ${event}`)
    const secret = process.env.GITHUB_HOOK_SECRET
    const mySignature = 'sha256=' + createHmac('sha256', secret).update(data).digest('hex')

    if (mySignature != signature) {
      throw new Error('Wrong git event signature!')
    }

    if (event == 'push') {
      await exec('git pull')
    }

    console.info('Github event successfully handled')
  }
}
