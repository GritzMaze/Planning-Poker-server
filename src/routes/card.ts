import { Router } from 'express';
import createHttpError from 'http-errors';
import { cardService } from '../services';

const router = Router();

router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const board = await cardService.findOrThrow(id);
    res.json(board);
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});

router.post('/', async (req, res, next) => {
  const card = req.body;
    
  try {
    const newCard = await cardService.create(card);
    res.header('Location', `/cards/${newCard.id}`);
    res.status(201).json(newCard);
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    await cardService.delete(id);
    res.status(204).send();
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});


export default router;