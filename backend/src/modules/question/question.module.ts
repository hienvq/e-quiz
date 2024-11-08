import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuestionSchema,
  QuestionSchemaName,
} from 'src/schemas/question-schema';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuizModule } from '../quiz/quiz.module';
import { AnswerHistoryModule } from '../answer-history/answer-history.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionSchemaName, schema: QuestionSchema },
    ]),
    CacheModule.register(),
    QuizModule,
    AnswerHistoryModule,
    LeaderboardModule,
  ],
  providers: [QuestionService],
  exports: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
