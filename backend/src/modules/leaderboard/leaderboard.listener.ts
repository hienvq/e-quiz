import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardGateway } from './leaderboard.gateway';

@Injectable()
export class LeaderBoardEventListener {
  private readonly logger = new Logger(LeaderBoardEventListener.name);
  constructor(
    private readonly leaderboardService: LeaderboardService,
    private readonly leaderboardGateway: LeaderboardGateway,
  ) {}

  @OnEvent('leaderboard.update')
  async updateListener(quizCode: string) {
    this.logger.log('Trigger update leaderboard', { quizCode });
    const newBoard = await this.leaderboardService.getByQuizCode(quizCode);
    if (newBoard.length === 0) {
      return;
    }
    return this.leaderboardGateway.emitUpdateLeaderboardEvent(
      quizCode,
      newBoard,
    );
  }
}
