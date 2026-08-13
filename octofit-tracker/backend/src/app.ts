import express from 'express';
import db from './config/database';
import userRoutes from './routes/users';
import teamRoutes from './routes/teams';
import activityRoutes from './routes/activities';
import leaderboardRoutes from './routes/leaderboard';
import workoutRoutes from './routes/workouts';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Octofit Tracker API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
