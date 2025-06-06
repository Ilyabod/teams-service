import { Router, Request, Response } from 'express';
import { getAggregatedTeams } from './teams.service';

const router = Router();

router.get('/teams', async (req: Request, res: Response) => {
  try {
    const teams = await getAggregatedTeams();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера', detail: (error as Error).message });
  }
});

export default router;
