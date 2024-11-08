import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RegistDto } from './dtos/regist.dto';
import { QuizService } from '../quiz/quiz.service';
import { AnswerHistoryService } from '../answer-history/answer-history.service';

@Injectable()
export class RegistrationService {
  private readonly logger = new Logger(RegistrationService.name);
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly quizService: QuizService,
    private readonly answerHistoryService: AnswerHistoryService,
  ) {}

  async regist(registDto: RegistDto) {
    const { userCode, quizCode } = registDto;
    this.logger.log(`User ${userCode} is trying to join quiz ${quizCode}`);
    const quiz = await this.quizService.getQuizByCode(quizCode);
    if (!quiz) {
      throw new NotFoundException('quiz_not_found');
    }
    const isOldChampion =
      await this.answerHistoryService.findOneHistoryWithResultTrue(
        userCode,
        quizCode,
      );
    if (isOldChampion) {
      throw new ConflictException('user_already_joined');
    }
    const roomExists: Array<string> = await this.cacheManager.get(quizCode);
    if (!roomExists) {
      return this.cacheManager.set(quizCode, [userCode], 0);
    }
    if (roomExists.includes(userCode)) {
      throw new ConflictException('user_already_joined');
    }
    await this.cacheManager.set(quizCode, [...roomExists, userCode], 0);
  }

  async leave(registDto: RegistDto) {
    const { userCode, quizCode } = registDto;
    const roomExists: Array<string> = await this.cacheManager.get(quizCode);
    if (!roomExists) {
      return;
    }
    const newRoom = roomExists.filter((code) => code !== userCode);
    await this.cacheManager.set(quizCode, newRoom, 0);
  }

  async getCurrentPlayers(quizCode: string): Promise<Array<string>> {
    const currentPlayers: Array<string> = await this.cacheManager.get(quizCode);
    return currentPlayers ?? [];
  }
}
