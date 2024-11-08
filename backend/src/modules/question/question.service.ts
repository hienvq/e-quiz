import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionSchemaName, IQuestion } from 'src/schemas/question-schema';
import { QuizService } from '../quiz/quiz.service';
import { AnswerHistoryService } from '../answer-history/answer-history.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);
  constructor(
    private eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(QuestionSchemaName)
    private questionModel: Model<IQuestion>,
    private readonly quizService: QuizService,
    private readonly answerHistoryService: AnswerHistoryService,
  ) {}

  async findByQuizCode(quizCode: string) {
    const cachedQuestions = await this.cacheManager.get(
      `questions:${quizCode}`,
    );
    if (cachedQuestions) {
      return cachedQuestions;
    }
    const quiz = await this.quizService.getQuizByCode(quizCode);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    const questions = await this.questionModel
      .find({ _id: { $in: quiz.questions } })
      .select({
        _id: 1,
        content: 1,
        options: 1,
      })
      .exec();
    await this.cacheManager.set(`questions:${quizCode}`, questions, 0);
    return questions;
  }

  async submitAnswer(answerData) {
    const { userCode, quizCode, questionId, answer } = answerData;
    this.logger.log('New answer submitted', { answerData });
    const question = await this.questionModel.findById(questionId).exec();
    if (!question) {
      throw new Error('Question not found');
    }
    const isCorrectAnswer = question.answer === answer;
    await this.answerHistoryService.saveHistory({
      userCode,
      quizCode,
      questionId,
      answer,
      result: isCorrectAnswer,
    });
    if (isCorrectAnswer) {
      this.eventEmitter.emit('leaderboard.update', quizCode);
    }
    return {
      isCorrectAnswer,
    };
  }
}
