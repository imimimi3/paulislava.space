import { Controller, Get, Post } from '@nestjs/common';
import { exec } from 'child_process';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('test');
    return this.appService.getHello();
  }

  @Post('git-event')
  gitEvent(): void {
    console.log('git-event');
    exec('git pull');
  }
}
