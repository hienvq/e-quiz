import { Inject, Injectable } from '@nestjs/common';
import { AnswerHistoryService } from '../answer-history/answer-history.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class LeaderboardService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly answerHistoryService: AnswerHistoryService,
  ) {}
  getByQuizCode(
    quizCode: string,
  ): Promise<Array<{ userCode: string; point: number }>> {
    return this.answerHistoryService.getResultByQuizCode(quizCode);
  }
}
