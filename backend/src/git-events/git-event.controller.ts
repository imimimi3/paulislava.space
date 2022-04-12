import { Body, Controller, Headers, Post, Request } from '@nestjs/common';
import { exec } from 'child_process';
import { createHmac } from 'crypto';
import { Request } from 'express';

@Controller('git-event')
export class GitEventController {
  @Post()
  async gitEventHandle(
    @Headers('X-GitHub-Event') event: string,
    @Headers('X-Hub-Signature-256') signature: string,
    @Request() req: Request
  ): Promise<void> {
    console.log(`Github event: ${event}`);
    const data = String(await req.body.getReader().read());
    const secret = 'MyGitHubTokenForPaul1sLava_SPACE';
    console.log(data)
    const mySignature = createHmac('sha256', secret)
      .update(data)
      .digest('hex');

    console.log(`Signature: ${signature}`);
    console.log(`My signature: ${mySignature}`);

    if (event == 'push') {
      await exec('git pull');
    }
  }
}
