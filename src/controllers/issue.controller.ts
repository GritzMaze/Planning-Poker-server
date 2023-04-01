import { Request, Response } from 'express';
import { IssueRepository } from '../repositories/issue.repository';

export class IssueController {
  private issueRepository: IssueRepository;

  constructor() {
    this.issueRepository = new IssueRepository();
  }

  async get(request: Request, response: Response) {
    return await this.issueRepository
      .get(Number(request.params.id))
      .then(issue => response.status(200).send(issue));
  }

  async getAll(request: Request, response: Response) {
    return await this.issueRepository
      .getAll()
      .then(issues => response.status(200).send(issues));
  }

  async create(request: Request, response: Response) {
    request.body.createdAt = new Date();
    return await this.issueRepository
      .create(request.body)
      .then(issue => response.status(200).send(issue));
  }

  async update(request: Request, response: Response) {
    request.body.updatedAt = new Date();
    return await this.issueRepository
      .update(request.body)
      .then(issue => response.status(200).send(issue));
  }

  async delete(request: Request, response: Response) {
    return await this.issueRepository
      .delete(Number(request.params.id))
      .then(issue => response.status(200).send(issue));
  }
}
