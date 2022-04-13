import { Controller, Headers, Post, Req } from '@nestjs/common'
import { exec } from 'child_process'
import { createHmac } from 'crypto'
import * as rawbody from 'raw-body'

@Controller('git-event')
export class GitEventController {
  @Post()
  async gitEventHandle(
    @Headers('X-GitHub-Event') event: string,
    @Headers('X-Hub-Signature-256') signature: string,
    @Req() req
  ): Promise<void> {
    console.info(`Github event: ${event}`)

    const raw = await rawbody(req)
    const secret = process.env.GITHUB_HOOK_SECRET
    const data = raw.toString()

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
