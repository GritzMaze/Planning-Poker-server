import cors from 'cors';
import { Router } from 'express';
import {
  LogLevel,
  logRequest,
  requestLogLevel
} from '../middlewares/requestLogging';
import notFound from './notFound';
import auth from '../middlewares/auth';
import login from './login';
import register from './register';
import boards from './board';
import cards from './card';

const router = Router();

router.use(cors());

router.use(requestLogLevel(LogLevel.info), logRequest);

router.use('/login', login);
router.use('/register', register);

router.use(auth);

router.use('/boards', boards);
router.use('/cards', cards);

// TODO: Add routes

router.use(notFound);

export default router;
