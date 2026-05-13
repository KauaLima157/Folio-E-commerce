import { IUserRepository } from '../interfaces';
import { User } from '../entities';
import prisma from '../infrastructure/database';

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const created = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password_hash: user.getPasswordHash(),
        phone: user.phone,
        created_at: user.created_at || new Date(),
      }
    });

    return new User(
      created.name,
      created.email,
      created.password_hash,
      created.phone,
      created.created_at,
      [], 
      [], 
      [], 
      [], 
      created.id
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: { email },
      include: {
        addresses: true,
        orders: true,
        cart_items: true,
        chat_messages: true,
      }
    });

    if (!userData) return null;

    return new User(
      userData.name,
      userData.email,
      userData.password_hash,
      userData.phone,
      userData.created_at,
      [], 
      [], 
      [],
      [],
      userData.id
    );
  }

  async findById(id: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({ where: { id } });
    if (!userData) return null;

    return new User(
      userData.name,
      userData.email,
      userData.password_hash,
      userData.phone,
      userData.created_at,
      [],
      [],
      [],
      [],
      userData.id
    );
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      }
    });

    return new User(
      updated.name,
      updated.email,
      updated.password_hash,
      updated.phone,
      updated.created_at,
      [],
      [],
      [],
      [],
      updated.id
    );
  }
}
