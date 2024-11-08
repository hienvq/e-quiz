import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RegistDto } from './dtos/regist.dto';
import { RegistrationService } from './registration.service';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}
  @Post('join')
  async join(@Body() registDto: RegistDto) {
    await this.registrationService.regist(registDto);
    return 'User joined successfully';
  }
  @Get('players')
  async getPlayers(@Query('quizCode') quizCode: string) {
    const players = await this.registrationService.getCurrentPlayers(quizCode);
    return players;
  }
}
