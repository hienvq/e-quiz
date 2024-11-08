import { Schema } from 'mongoose';
import { QuestionSchemaName } from './question-schema';

const QuizSchemaName = 'Quiz';
const QuizSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  code: { type: String, required: true },
  questions: [
    { type: Schema.Types.ObjectId, ref: QuestionSchemaName, required: true },
  ],
});
interface IQuiz {
  _id: Schema.Types.ObjectId;
  code: string;
  questions: Schema.Types.ObjectId[];
}
export { QuizSchema, QuizSchemaName, IQuiz };
