import mongoose, { type Document, Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for searching and sorting
todoSchema.index({ title: "text", description: "text" });
todoSchema.index({ dueDate: 1 });
todoSchema.index({ completed: 1 });
todoSchema.index({ user: 1 });

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
