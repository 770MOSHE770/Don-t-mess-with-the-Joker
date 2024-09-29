import Router, { Request, Response } from 'express';
import { z } from 'zod';
import { startGame } from '../../state/rooms';

const router = Router();

const schema = z.object({
  gameId: z.string().length(6, { message: 'gameId of 6 chars is required' }),
  numOfRedPlayers: z.number().min(1, { message: 'numOfRedPlayers is min 1' }).optional(),
  numOfRedCards: z.number().min(1, { message: 'numOfRedCards is min 1' }).optional()
});

router.post('/', (req: Request, res: Response) => {
  try {
    const { gameId, numOfRedPlayers, numOfRedCards } = schema.parse(req.body);

    if (req.ip) {
      const roomIdResult = startGame(req.ip, gameId, numOfRedPlayers, numOfRedCards)
      res.status(200).json(roomIdResult);
    } else {
      res.status(400).json({ message: 'no ip detect' });
    }
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else if (error === 'No existing game') {
      res.status(404).json({ message: 'No existing game' });
    } else if (error === 'No howner') {
      res.status(403).json({ message: 'No howner' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export default router;
