import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CacheModule } from '@nestjs/cache-manager';
import { QuizModule } from '../quiz/quiz.module';
import { RegistrationController } from './registration.controller';
import { AnswerHistoryModule } from '../answer-history/answer-history.module';

@Module({
  imports: [CacheModule.register(), QuizModule, AnswerHistoryModule],
  providers: [RegistrationService],
  exports: [RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
