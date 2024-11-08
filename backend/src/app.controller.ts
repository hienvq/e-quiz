import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('health-check')
  healthCheck(): string {
    return "I'm alive!";
  }
}