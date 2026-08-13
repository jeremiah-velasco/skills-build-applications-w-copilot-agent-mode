import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    // Create test users
    const users = await User.insertMany([
      { username: 'alice', email: 'alice@octofit.com', password: 'password123' },
      { username: 'bob', email: 'bob@octofit.com', password: 'password123' },
      { username: 'charlie', email: 'charlie@octofit.com', password: 'password123' },
      { username: 'diana', email: 'diana@octofit.com', password: 'password123' },
      { username: 'eve', email: 'eve@octofit.com', password: 'password123' },
    ]);

    console.log(`Created ${users.length} users`);

    // Create test teams
    const teams = await Team.insertMany([
      { name: 'Fitness Warriors', description: 'Elite fitness team', createdBy: users[0]._id, members: [users[0]._id, users[1]._id, users[2]._id] },
      { name: 'Morning Runners', description: 'Early birds who love running', createdBy: users[3]._id, members: [users[3]._id, users[4]._id] },
    ]);

    console.log(`Created ${teams.length} teams`);

    // Create test activities
    const activities = await Activity.insertMany([
      { userId: users[0]._id, type: 'running', duration: 30, distance: 5, calories: 300, date: new Date() },
      { userId: users[1]._id, type: 'cycling', duration: 45, distance: 15, calories: 400, date: new Date() },
      { userId: users[2]._id, type: 'swimming', duration: 60, calories: 500, date: new Date() },
      { userId: users[3]._id, type: 'running', duration: 20, distance: 3, calories: 200, date: new Date() },
      { userId: users[4]._id, type: 'yoga', duration: 50, calories: 150, date: new Date() },
      { userId: users[0]._id, type: 'gym', duration: 75, calories: 600, date: new Date(Date.now() - 86400000) },
    ]);

    console.log(`Created ${activities.length} activities`);

    // Create test leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      { userId: users[0]._id, teamId: teams[0]._id, score: 900 },
      { userId: users[1]._id, teamId: teams[0]._id, score: 750 },
      { userId: users[2]._id, teamId: teams[0]._id, score: 600 },
      { userId: users[3]._id, teamId: teams[1]._id, score: 500 },
      { userId: users[4]._id, teamId: teams[1]._id, score: 400 },
    ]);

    console.log(`Created ${leaderboardEntries.length} leaderboard entries`);

    // Create test workouts
    const workouts = await Workout.insertMany([
      { userId: users[0]._id, name: 'Morning Run', description: '5km run', exercises: ['running'], difficulty: 'medium' },
      { userId: users[1]._id, name: 'Upper Body', description: 'Chest and shoulders', exercises: ['bench press', 'shoulder press', 'push-ups'], difficulty: 'hard' },
      { userId: users[2]._id, name: 'Beginner Yoga', description: 'Relaxing yoga session', exercises: ['downward dog', 'warrior pose', 'child pose'], difficulty: 'easy' },
      { userId: users[3]._id, name: 'HIIT Circuit', description: 'High intensity interval training', exercises: ['burpees', 'jump squats', 'mountain climbers'], difficulty: 'hard' },
      { userId: users[4]._id, name: 'Core Strength', description: 'Build a stronger core', exercises: ['planks', 'crunches', 'leg raises'], difficulty: 'medium' },
    ]);

    console.log(`Created ${workouts.length} workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
