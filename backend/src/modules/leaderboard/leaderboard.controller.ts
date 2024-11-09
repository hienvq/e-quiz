import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}
  @Get()
  getLeaderboard(@Query('quizCode') quizCode: string) {
    return this.leaderboardService.getByQuizCode(quizCode);
  }
}
