import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import { User } from '../entities';

import { IUserRepository } from '../interfaces';

interface IRegisterDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface ILoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async register({name, email, password, phone}: IRegisterDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('Usuário já existe');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = new User(
      name,
      email,
      password_hash,
      phone ?? null,
    );

    const createdUser = await this.userRepository.create(user);

    return {
      user: createdUser
    };
  }

  async login({email, password}: ILoginDTO) {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email ou senha inválidos');
    }

    const passwordMatched = await bcrypt.compare(password, user.getPasswordHash());

    if (!passwordMatched) {
      throw new Error('Email ou senha inválidos');
    }

    const payload = {
      userId: user.id,
      email: user.email
    }

    const token = jwt.sign(payload, process.env.SECRET_JWT as string, {subject: user.id, expiresIn: '7d'});

    return {
      user,
      token,
    };
  }

  async profile(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }
}
