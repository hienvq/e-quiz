import { Controller, Get, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Body, Post } from '@nestjs/common';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestions(@Query('quizCode') quizCode: string) {
    return this.questionService.findByQuizCode(quizCode);
  }
  @Post('answer')
  async saveAnswer(
    @Body()
    answerData: {
      questionId: string;
      userCode: string;
      quizCode: string;
      answer: string;
    },
  ) {
    return this.questionService.submitAnswer(answerData);
  }
}
