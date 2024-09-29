import { Router } from 'express';
import createGame from './createGame';
import joinGame from './joinGame';
import startGame from './startGame';

const router = Router();

router.use('/create', createGame); 
router.use('/join', joinGame); 
router.use('/start', startGame); 

export default router;