import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizSchemaName, IQuiz } from 'src/schemas/quiz-schema';

@Injectable()
export class QuizService {
  constructor(@InjectModel(QuizSchemaName) private quizModel: Model<IQuiz>) {}

  getQuizByCode(code: string) {
    return this.quizModel.findOne({ code }).exec();
  }
  findAll() {
    return this.quizModel.find().exec();
  }
}
