import { Router } from 'express';
import { userService } from '../services';
import createHttpError from 'http-errors';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.findAll();
    res.json(users);
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});

router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const user = await userService.findOrThrow(id);
    res.json(user);
    return;
  } catch (err) {
    next(createHttpError(500, err));
    return;
  }
});

export default router;