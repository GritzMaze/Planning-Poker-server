import { Router } from 'express';
import { boardService } from '../services/board.service';
import createHttpError from 'http-errors';

const router = Router();

router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  
  try {
    const board = await boardService.findOrThrow(id);
    res.json(board);
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});

router.get('/', async (req, res, next) => {
  const filter = req.query.filter as string;
  const offset = parseInt(req.query.offset as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  try {
    const boards = await boardService.findManyByFilter(filter, offset, limit);
    res.json(boards);
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});

router.post('/', async (req, res, next) => {
  const board = req.body;

  try {
    const user = res.locals.currentUser;
    board.ownerId = user.id;
    const newBoard = await boardService.create(board);
    res.header('Location', `/boards/${newBoard.id}`);
    res.status(201).json(newBoard);
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    await boardService.delete(id);
    res.status(204).send();
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});


export default router;