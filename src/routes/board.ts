import { Router } from 'express';
import { boardService } from '../services/board.service';
import createHttpError from 'http-errors';

const router = Router();

router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  
  try {
    const board = await boardService.findOrThrow(id);
    res.json(board);
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});

router.get('/', async (req, res, next) => {
  const filter = req.query.filter as string;
  const offset = parseInt(req.query.offset as string, 10);

  try {
    const boards = await boardService.findManyByFilter(filter, offset);
    res.json(boards);
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});



export default router;