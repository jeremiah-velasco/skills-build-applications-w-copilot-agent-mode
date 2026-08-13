import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId', '-password');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error });
  }
});

// Get workouts for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error });
  }
});

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('userId', '-password');
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workout', error });
  }
});

// Create workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, description, exercises, difficulty } = req.body;
    const workout = new Workout({ userId, name, description, exercises, difficulty });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Error creating workout', error });
  }
});

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Error updating workout', error });
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout', error });
  }
});

export default router;
