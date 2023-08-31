import { Router } from 'express';
import { columnService } from '../services/column.service';
import createHttpError from 'http-errors';

const router = Router();

router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const column = await columnService.findOrThrow(id);
    res.json(column);
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});


router.put('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const column = req.body;
    
  try {
    const updatedColumn = await columnService.update(id, column);
    res.json(updatedColumn);
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});

export default router;