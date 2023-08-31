import { Column } from '@prisma/client';
import { BaseDatabaseService } from './base-database.service';

class ColumnService extends BaseDatabaseService<Column> {
  constructor() {
    super();
  }

  async find(id: number): Promise<Column | null> {
    return await this.prisma.column.findUnique({
      where: {
        id
      }
    });
  }

  async findOrThrow(id: number): Promise<Column> {
    const column = await this.find(id);
    if (!column) {
      throw new Error(`Column with id ${id} not found`);
    }
    return column;
  }

  async update(id: number, column: Column): Promise<Column> {
    return await this.prisma.column.update({
      where: {
        id
      },
      data: column
    });
  }
}

export const columnService = new ColumnService();