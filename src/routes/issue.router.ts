import { Request, Response, Router } from 'express';
import { IssueController } from '../controllers/issue.controller';

const router = Router();
const controller: IssueController = new IssueController();

router.get(
  '/',
  async (request: Request, response: Response) => {
    await controller.getAll(request, response);
  }
);

router.get(
  '/:id',
  async (request: Request, response: Response) => {
    await controller.get(request, response);
  }
);

router.post(
  '/',
  async (request: Request, response: Response) => {
    await controller.create(request, response);
  }
);

router.put(
  '/',
  async (request: Request, response: Response) => {
    await controller.update(request, response);
  }
);

router.delete(
  '/:id',
  async (request: Request, response: Response) => {
    await controller.delete(request, response);
  }
);

export const issueRouter = router;
