import { Controller, Headers, Post, Request } from '@nestjs/common'
import { exec } from 'child_process'
import { createHmac } from 'crypto'

@Controller('git-event')
export class GitEventController {
  @Post()
  async gitEventHandle(
    @Headers('X-GitHub-Event') event: string,
    @Headers('X-Hub-Signature') signature: string,
    @Request() req: Request
  ): Promise<void> {
    console.log(`Github event: ${event}`)
    const data = String(req.body)
    const secret = process.env.GITHUB_HOOK_SECRET
    const mySignature = createHmac('sha1', secret).update(data).digest('hex')

    console.log(`Signature: ${signature}`)
    console.log(`My signature: ${mySignature}`)

    if (event == 'push') {
      await exec('git pull')
    }
  }
}
