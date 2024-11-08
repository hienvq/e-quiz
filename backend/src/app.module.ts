import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionModule } from './modules/question/question.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { AnswerHistoryModule } from './modules/answer-history/answer-history.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    QuizModule,
    QuestionModule,
    RegistrationModule,
    AnswerHistoryModule,
    LeaderboardModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
