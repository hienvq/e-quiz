import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AnswerHistorySchema,
  AnswerHistorySchemaName,
} from 'src/schemas/answer-history-schema';
import { AnswerHistoryService } from './answer-history.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnswerHistorySchemaName, schema: AnswerHistorySchema },
    ]),
  ],
  providers: [AnswerHistoryService],
  exports: [AnswerHistoryService],
})
export class AnswerHistoryModule {}
