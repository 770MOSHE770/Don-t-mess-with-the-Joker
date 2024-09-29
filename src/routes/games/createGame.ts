import Router, { Request, Response } from 'express';
import { z } from 'zod';
import { createNewGame } from '../../state/rooms';

const router = Router();

const schema = z.object({
  username: z.string().min(1, { message: 'username is required' })
});

router.post('/',  (req: Request, res: Response) =>  {
  try {
    const { username } = schema.parse(req.body);

    if (req.ip) {
       res.status(200).json(createNewGame(username, req.ip));
    } else {
      res.status(400).json({ message: 'no ip detect' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
       res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
