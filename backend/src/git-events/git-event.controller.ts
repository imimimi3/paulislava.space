import { Body, Controller, Headers, Post } from '@nestjs/common';
import { exec } from 'child_process';
import { createHash } from 'crypto';

@Controller('git-event')
export class GitEventController {
  @Post()
  async gitEventHandle(
    @Headers('x-github-event') event: string,
    @Headers('x-hub-signature-256') signature: string,
    @Body() data: string,
  ): Promise<void> {
    console.log(`Github event: ${event}`);

    const secret = 'MyGitHubTokenForPaul1sLava_SPACE';
    const mySignature = createHash('sha256')
      .update(secret + data)
      .digest('hex');
    console.log(`Signature: ${signature}`);
    console.log(`My signature: ${mySignature}`);

    if (event == 'push') {
      await exec('git pull');
    }
  }
}
