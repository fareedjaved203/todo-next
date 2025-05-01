// models/Todo.ts
import mongoose, { Schema } from 'mongoose';

const TodoSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
