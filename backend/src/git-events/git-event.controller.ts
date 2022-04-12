import { Body, Controller, Headers, Post } from '@nestjs/common';
import { exec } from 'child_process';
import { createHmac } from 'crypto';

@Controller('git-event')
export class GitEventController {
  @Post()
  async gitEventHandle(
    @Headers('X-GitHub-Event') event: string,
    @Headers('X-Hub-Signature-256') signature: string,
    @Body() data: any,
  ): Promise<void> {
    console.log(`Github event: ${event}`);

    const secret = 'MyGitHubTokenForPaul1sLava_SPACE';
    console.log(data.toString())
    const mySignature = createHmac('sha256', secret)
      .update(data.toString())
      .digest('hex');

    console.log(`Signature: ${signature}`);
    console.log(`My signature: ${mySignature}`);

    if (event == 'push') {
      await exec('git pull');
    }
  }
}
