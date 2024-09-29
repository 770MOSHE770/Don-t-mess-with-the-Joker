import { Router } from 'express';
import createGame from './createGame';

const router = Router();

router.use('/create', createGame); 

export default router;