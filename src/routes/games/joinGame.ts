import Router, { Request, Response } from 'express';
import { z } from 'zod';
import { joinToRoom } from '../../state/rooms';

const router = Router();

const createSchema = z.object({
  username: z.string().min(1, { message: 'username is required' }),
  roomId: z.string().length(6, { message: 'roomId of 6 chars is required' })
});

router.post('/',  (req: Request, res: Response) =>  {
  try {
    const { username, roomId} = createSchema.parse(req.body);

    if (req.ip) {
      const roomIdResult = joinToRoom(username, req.ip, roomId)
      res.status(200).json(roomIdResult);
    } else {
      res.status(400).json({ message: 'no ip detect' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
       res.status(400).json({ errors: error.errors });
    } else if (error === 'No existing room') {
        res.status(404).json({ message: 'No existing room' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export default router;
