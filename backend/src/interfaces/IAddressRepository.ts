import { Address } from '../entities';

export interface IAddressRepository {
  create(address: Address): Promise<Address>;
  findByUser(userId: string): Promise<Address[]>;
  findById(id: string): Promise<Address | null>;
  delete(id: string): Promise<void>;
  setDefault(id: string, userId: string): Promise<void>;
}
