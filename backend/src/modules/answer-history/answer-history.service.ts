import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AnswerHistorySchemaName,
  IAnswerHistory,
} from 'src/schemas/answer-history-schema';

@Injectable()
export class AnswerHistoryService {
  constructor(
    @InjectModel(AnswerHistorySchemaName)
    private answerHistoryModel: Model<IAnswerHistory>,
  ) {}

  async saveHistory(
    createAnswerHistoryDto: Partial<IAnswerHistory>,
  ): Promise<IAnswerHistory> {
    const createdAnswerHistory = new this.answerHistoryModel(
      createAnswerHistoryDto,
    );
    return createdAnswerHistory.save();
  }
  getResultByQuizCode(quizCode: string) {
    return this.answerHistoryModel.aggregate([
      { $match: { quizCode } },
      {
        $group: {
          _id: '$userCode',
          userCode: { $first: '$userCode' },
          point: {
            $sum: {
              $cond: [{ $eq: ['$result', true] }, 1, 0],
            },
          },
        },
      },
      { $match: { point: { $gt: 0 } } },
      { $sort: { point: -1, userCode: 1 } },
    ]);
  }
  async findOneHistoryWithResultTrue(
    quizCode: string,
    userCode: string,
  ): Promise<IAnswerHistory | null> {
    return this.answerHistoryModel
      .findOne({
        quizCode,
        userCode,
        result: true,
      })
      .exec();
  }
}
