import { Router, Request, Response } from 'express';
import { getAggregatedTeams, createTeam,
  updateTeam,
  patchTeam,
  deleteTeam } from './teams.service';

const router = Router();

router.get('/teams', async (req: Request, res: Response) => {
  try {
    const teams = await getAggregatedTeams();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера', detail: (error as Error).message });
  }
});
/**
 * POST /teams
 * Создает новую команду
 */
router.post('/teams', async (req: Request, res: Response) => {
  try {
    const team = await createTeam(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании', detail: (error as Error).message });
  }
});

/**
 * PUT /teams/:id
 * Полное обновление команды по ID
 */
router.put('/teams/:id', async (req: Request, res: Response) => {
  try {
    const team = await updateTeam(Number(req.params.id), req.body);
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении', detail: (error as Error).message });
  }
});

/**
 * PATCH /teams/:id
 * Частичное обновление команды по ID
 */
router.patch('/teams/:id', async (req: Request, res: Response) => {
  try {
    const team = await patchTeam(Number(req.params.id), req.body);
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при частичном обновлении', detail: (error as Error).message });
  }
});

/**
 * DELETE /teams?id=
 * Удаляет команду по ID, переданному как query-параметр
 */
router.delete('/teams', async (req: Request, res: Response) => {
  try {
    const id = Number(req.query.id);
    if (!id) return res.status(400).json({ error: 'ID обязателен' });

    await deleteTeam(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении', detail: (error as Error).message });
  }
});
export default router;
