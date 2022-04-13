import { Body, Controller, Headers, Post, Req, Request } from '@nestjs/common'
import { exec } from 'child_process'
import { createHmac } from 'crypto'
import * as rawbody from 'raw-body'

@Controller('git-event')
export class GitEventController {
  @Post()
  async gitEventHandle(
    @Headers('X-GitHub-Event') event: string,
    @Headers('X-Hub-Signature') signature: string,
    @Req() req
  ): Promise<void> {
    console.log(`Github event: ${event}`)

    const raw = await rawbody(req)
    const secret = process.env.GITHUB_HOOK_SECRET
    const data = raw.toString()
    console.log('Data:', data)
    console.log('Secret: ', secret)

    const mySignature = createHmac('sha1', secret).update(data).digest('hex')

    console.log(`Signature: ${signature}`)
    console.log(`My signature: ${mySignature}`)

    if (event == 'push') {
      await exec('git pull')
    }
  }
}
