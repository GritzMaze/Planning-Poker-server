import { Card } from '@prisma/client';
import { BaseDatabaseService } from './base-database.service';

class CardService extends BaseDatabaseService<Card> {
  constructor() {
    super();
  }

  async find(id: number): Promise<Card | null> {
    return await this.prisma.card.findUnique({
      where: {
        id
      },
      include: {
        assignedTo: true,
      }
    });
  }

  async findOrThrow(id: number): Promise<Card> {
    const card = await this.find(id);
    if (!card) {
      throw new Error(`Card with id ${id} not found`);
    }
    return card;
  }

  async create(card: Card): Promise<Card> {
    return await this.prisma.card.create({
      data: {
        name: card.name,
        description: card.description,
        assignedToId: card.assignedToId,
        columnId: card.columnId,
        boardId: card.boardId,
        priority: card.priority
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.card.delete({
      where: {
        id
      }
    });
  }

  async update(id: number, card: Card): Promise<Card> {
    return await this.prisma.card.update({
      where: {
        id
      },
      data: {
        name: card.name,
        description: card.description,
        assignedToId: card.assignedToId,
        columnId: card.columnId,
        boardId: card.boardId,
        priority: card.priority,
        updatedAt: new Date()
      }
    });
  }
}

export const cardService = new CardService();
