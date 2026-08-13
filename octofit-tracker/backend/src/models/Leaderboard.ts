import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
