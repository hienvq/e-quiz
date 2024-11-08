import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema, QuizSchemaName } from 'src/schemas/quiz-schema';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QuizSchemaName, schema: QuizSchema }]),
  ],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
