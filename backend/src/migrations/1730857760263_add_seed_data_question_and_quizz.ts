import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';

export class add_seed_data_question_and_quiz1730857760263
  implements MigrationInterface
{
  public async up(db: Db): Promise<void> {
    const questionsCollection = db.collection('questions');
    const quizzesCollection = db.collection('quizzes');

    const questions = [
      { content: 'Question 1', options: ['A', 'B', 'C', 'D'], answer: 'A' },
      { content: 'Question 2', options: ['A', 'B', 'C', 'D'], answer: 'B' },
      { content: 'Question 3', options: ['A', 'B', 'C', 'D'], answer: 'C' },
      { content: 'Question 4', options: ['A', 'B', 'C', 'D'], answer: 'D' },
      { content: 'Question 5', options: ['A', 'B', 'C', 'D'], answer: 'A' },
      { content: 'Question 6', options: ['A', 'B', 'C', 'D'], answer: 'B' },
      { content: 'Question 7', options: ['A', 'B', 'C', 'D'], answer: 'C' },
      { content: 'Question 8', options: ['A', 'B', 'C', 'D'], answer: 'D' },
      { content: 'Question 9', options: ['A', 'B', 'C', 'D'], answer: 'A' },
      { content: 'Question 10', options: ['A', 'B', 'C', 'D'], answer: 'B' },
      { content: 'Question 11', options: ['A', 'B', 'C', 'D'], answer: 'C' },
      { content: 'Question 12', options: ['A', 'B', 'C', 'D'], answer: 'D' },
      { content: 'Question 13', options: ['A', 'B', 'C', 'D'], answer: 'A' },
      { content: 'Question 14', options: ['A', 'B', 'C', 'D'], answer: 'B' },
      { content: 'Question 15', options: ['A', 'B', 'C', 'D'], answer: 'C' },
      { content: 'Question 16', options: ['A', 'B', 'C', 'D'], answer: 'D' },
      { content: 'Question 17', options: ['A', 'B', 'C', 'D'], answer: 'A' },
      { content: 'Question 18', options: ['A', 'B', 'C', 'D'], answer: 'B' },
      { content: 'Question 19', options: ['A', 'B', 'C', 'D'], answer: 'C' },
      { content: 'Question 20', options: ['A', 'B', 'C', 'D'], answer: 'D' },
    ];

    const insertedQuestions = await questionsCollection.insertMany(questions);
    const insertedQuestionsIds = Object.values(insertedQuestions.insertedIds);
    const quizs = [
      {
        code: 'quiz1',
        questions: insertedQuestionsIds.slice(0, 10),
      },
      {
        code: 'quiz2',
        questions: insertedQuestionsIds.slice(10, 20),
      },
    ];

    await quizzesCollection.insertMany(quizs);
  }

  public async down(db: Db): Promise<void> {
    const questionsCollection = db.collection('questions');
    const quizzesCollection = db.collection('quizzes');

    await quizzesCollection.deleteMany({});
    await questionsCollection.deleteMany({});
  }
}
