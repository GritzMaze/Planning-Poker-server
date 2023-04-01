import { connect } from '../config/db.config';
import { Issue } from '../models/issue.model';

export class IssueRepository {
  private db: any = {};
  private issueRepository: any;

  constructor() {
    this.db = connect();

    this.db.sequelize.sync({ force: true });
    this.issueRepository = this.db.sequelize.getRepository(Issue);
  }

  async get(id: number) {
    return await this.issueRepository.find(id);
  }

  async getAll() {
    return await this.issueRepository.findAll();
  }

  async create(issue: Issue) {
    return await this.issueRepository.create(issue);
  }

  async update(issue: Issue) {
    return await this.issueRepository.update({...issue}, {
      where: {
        id: issue.id
      }
    });
  }

  async delete(issueId: number) {
    return await this.issueRepository.destroy({
      where: {
        id: issueId
      }
    });
  }
}