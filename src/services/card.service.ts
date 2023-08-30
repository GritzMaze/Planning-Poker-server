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
      data: card
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
      data: card
    });
  }
}

export const cardService = new CardService();
