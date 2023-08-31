import { Board, Column, PrismaClient } from '@prisma/client';
import { prisma as prismaService } from './prisma.service';
import { BaseDatabaseService } from './base-database.service';

interface BoardWithCount {
    total: number;
    boards: Board[];
}

interface BoardWithColumns {
    name: string;
    ownerId: number;
    columns: Column[];
}

export class BoardService extends BaseDatabaseService<Board> {
  constructor(protected readonly prisma: PrismaClient = prismaService) {
    super(prisma);
  }

  async find(id: number): Promise<Board | null> {
    return await this.prisma.board.findUnique({
      where: {
        id
      },
      include: {
        columns: {
          include: {
            cards: {
              include: {
                assignedTo: true,
              }
            }
          }
        }
      }
    });
  }

  async findOrThrow(id: number): Promise<Board> {
    const board = await this.find(id);
    if (!board) {
      throw new Error(`Board with id ${id} not found`);
    }
    return board;
  }

  async findManyByFilter(filter: string, offset: number, limit: number): Promise<BoardWithCount> {
    const [total, boards] = await this.prisma.$transaction([
      this.prisma.board.count({
        where: {
          name: {
            contains: filter
          }
        }
      }),
      this.prisma.board.findMany({
        where: {
          name: {
            contains: filter
          }
        },
        take: limit,
        skip: offset,
        include: {
          owner: true,
        }
      })
    ]);
    return {
      total,
      boards
    };
  }

  async create(board: BoardWithColumns): Promise<Board> {
    return this.prisma.board.create({
      data: {
        name: board.name,
        ownerId: board.ownerId,
        columns: {
          create: board.columns.map((column) => ({
            name: column.name,
            color: column.color
          }))
        }
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.board.delete({
      where: {
        id
      }
    });
  }

  async update(id: number, board: BoardWithColumns): Promise<Board> {
    return this.prisma.board.update({
      where: {
        id
      },
      data: {
        name: board.name,
        columns: {
          deleteMany: { boardId: id },
          createMany: {
            data: board.columns.map((column) => ({
              name: column.name,
              color: column.color
            }))
          }
        }
      }
    });
  }
}


export const boardService = new BoardService();