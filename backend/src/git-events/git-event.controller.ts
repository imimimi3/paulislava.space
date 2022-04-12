import { Body, Controller, Headers, Post } from '@nestjs/common';
import { exec } from 'child_process';
import { createHash } from 'crypto';

@Controller('git-event')
export class GitEventController {
  @Post()
  async gitEventHeaders(@Headers() headers,  @Body() data: string) {
    console.log(headers);
    console.log(data);
  }
  
  async gitEventHandle(
    @Headers('X-GitHub-Event') event: string,
    @Headers('X-Hub-Signature-256') signature: string,
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
