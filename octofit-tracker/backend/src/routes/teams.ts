import { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router = Router();

// Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members').populate('createdBy', '-password');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
});

// Get team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('members')
      .populate('createdBy', '-password');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
});

// Create team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, createdBy } = req.body;
    const team = new Team({ name, description, createdBy, members: [createdBy] });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Error creating team', error });
  }
});

// Update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: 'Error updating team', error });
  }
});

// Delete team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
});

// Add member to team
router.post('/:id/members', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $push: { members: userId } },
      { new: true }
    );
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: 'Error adding member', error });
  }
});

export default router;
