import { Module } from '@nestjs/common';
import { LeaderboardGateway } from './leaderboard.gateway';
import { CacheModule } from '@nestjs/cache-manager';
import { LeaderboardService } from './leaderboard.service';
import { AnswerHistoryModule } from '../answer-history/answer-history.module';
import { LeaderBoardEventListener } from './leaderboard.listener';
import { LeaderboardController } from './leaderboard.controller';

@Module({
  imports: [CacheModule.register(), AnswerHistoryModule],
  controllers: [LeaderboardController],
  providers: [LeaderboardGateway, LeaderboardService, LeaderBoardEventListener],
  exports: [LeaderboardGateway, LeaderboardService],
})
export class LeaderboardModule {}
