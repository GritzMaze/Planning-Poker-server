import { Board, PrismaClient } from '@prisma/client';
import { prisma as prismaService } from './prisma.service';
import { BaseDatabaseService } from './base-database.service';

interface BoardWithCount {
    total: number;
    boards: Board[];
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
        Card: true,
        Column: true
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

  async findManyByFilter(filter: string, offset: number): Promise<BoardWithCount> {
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
        take: 10,
        skip: offset
      })
    ]);
    return {
      total,
      boards
    };
  }
}


export const boardService = new BoardService();