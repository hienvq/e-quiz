import { Schema } from 'mongoose';
const QuestionSchemaName = 'Question';
const QuestionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  content: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});
interface IQuestion {
  _id: Schema.Types.ObjectId;
  content: string;
  options: string[];
  answer: string;
}
export { QuestionSchema, QuestionSchemaName, IQuestion };
