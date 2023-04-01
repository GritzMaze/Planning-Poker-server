import cors from 'cors';
import { Router } from 'express';
import {
  LogLevel,
  logRequest,
  requestLogLevel
} from '../middlewares/requestLogging';
import notFound from './notFound';
import { issueRouter } from './issue.router';

const router = Router();

router.use(cors());

router.use(requestLogLevel(LogLevel.info), logRequest);

// TODO: Implement
// router.use(authenticate);

// TODO: Add routes

router.use('/issue', issueRouter);

router.use(notFound);

export default router;
