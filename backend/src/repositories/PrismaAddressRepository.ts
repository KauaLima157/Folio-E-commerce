import { IAddressRepository } from '../interfaces';
import { Address } from '../entities';
import prisma from '../infrastructure/database';

export class PrismaAddressRepository implements IAddressRepository {
  async create(address: Address): Promise<Address> {
    const created = await prisma.address.create({
      data: {
        user_id: address.user_id,
        street: address.street,
        number: address.number,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
        is_default: address.isDefaultAddress(),
        complement: address.complement,
      }
    });

    return new Address(
      created.user_id,
      created.street,
      created.number,
      created.neighborhood,
      created.city,
      created.state,
      created.zip_code,
      created.is_default,
      created.complement,
      created.id
    );
  }

  async findByUser(userId: string): Promise<Address[]> {
    const addresses = await prisma.address.findMany({
      where: { user_id: userId }
    });

    return addresses.map(a => new Address(
      a.user_id, a.street, a.number, a.neighborhood, a.city, a.state, a.zip_code, a.is_default, a.complement, a.id
    ));
  }

  async findById(id: string): Promise<Address | null> {
    const a = await prisma.address.findUnique({ where: { id } });
    if (!a) return null;

    return new Address(
      a.user_id, a.street, a.number, a.neighborhood, a.city, a.state, a.zip_code, a.is_default, a.complement, a.id
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.address.delete({ where: { id } });
  }

  async setDefault(id: string, userId: string): Promise<void> {
    await prisma.$transaction([
      prisma.address.updateMany({
        where: { user_id: userId },
        data: { is_default: false }
      }),
      prisma.address.update({
        where: { id },
        data: { is_default: true }
      })
    ]);
  }
}
