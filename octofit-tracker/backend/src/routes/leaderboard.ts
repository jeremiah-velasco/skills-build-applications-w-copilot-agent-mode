import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

// Get global leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ score: -1 })
      .populate('userId', '-password')
      .populate('teamId');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});

// Get team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ teamId: req.params.teamId })
      .sort({ score: -1 })
      .populate('userId', '-password');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team leaderboard', error });
  }
});

// Get leaderboard entry by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findOne({ userId: req.params.userId })
      .populate('userId', '-password');
    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard entry', error });
  }
});

// Create or update leaderboard entry
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, teamId, score } = req.body;
    const entry = await Leaderboard.findOneAndUpdate(
      { userId, teamId },
      { userId, teamId, score },
      { new: true, upsert: true }
    );
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Error creating leaderboard entry', error });
  }
});

// Update leaderboard entry
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Error updating leaderboard entry', error });
  }
});

export default router;
