import { Schema } from 'mongoose';

const AnswerHistorySchemaName = 'AnswerHistory';
const AnswerHistorySchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  quizCode: { type: String, required: true },
  userCode: { type: String, required: true },
  questionId: { type: Schema.Types.ObjectId, required: true },
  answer: { type: String, required: true },
  result: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now, required: true },
});
interface IAnswerHistory {
  _id: Schema.Types.ObjectId;
  quizCode: string;
  userCode: string;
  questionId: Schema.Types.ObjectId;
  answer: string;
  result: boolean;
  submittedAt: Date;
}
export { AnswerHistorySchema, AnswerHistorySchemaName, IAnswerHistory };
