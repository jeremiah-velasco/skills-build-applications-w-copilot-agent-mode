import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId', '-password');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error });
  }
});

// Get activities for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error });
  }
});

// Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId', '-password');
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity', error });
  }
});

// Create activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, distance, calories, date } = req.body;
    const activity = new Activity({ userId, type, duration, distance, calories, date });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Error creating activity', error });
  }
});

// Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Error updating activity', error });
  }
});

// Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting activity', error });
  }
});

export default router;
