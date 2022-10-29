import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World printed';
  }

  @Get('/send')
  async getSend() {
    return 'Hello  sended';
  }
}
