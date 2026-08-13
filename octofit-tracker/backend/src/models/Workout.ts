import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  exercises: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    exercises: [{ type: String }],
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
