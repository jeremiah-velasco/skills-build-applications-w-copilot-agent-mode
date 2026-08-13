import express from 'express';
import db from './config/database';
import userRoutes from './routes/users';
import teamRoutes from './routes/teams';
import activityRoutes from './routes/activities';
import leaderboardRoutes from './routes/leaderboard';
import workoutRoutes from './routes/workouts';

const app = express();
const PORT = process.env.PORT || 8000;

// Build API base URL based on environment
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutRoutes);

// API configuration endpoint for frontend
app.get('/api/config', (req, res) => {
  res.json({
    apiBaseUrl: API_BASE_URL,
  });
});

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Octofit Tracker API is running',
    apiBaseUrl: API_BASE_URL,
    environment: CODESPACE_NAME ? 'Codespaces' : 'localhost',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Base URL: ${API_BASE_URL}`);
  console.log(`Environment: ${CODESPACE_NAME ? 'Codespaces' : 'localhost'}`);
});

export default app;
