import { Router } from 'express';
import createGame from './createGame';
import joinGame from './joinGame';

const router = Router();

router.use('/create', createGame); 
router.use('/join', joinGame); 

export default router;