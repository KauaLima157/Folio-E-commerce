import "dotenv/config";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Começando a semeadura (Seeding)...');

  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.chatMessage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      id: 'usuario-teste-1',
      name: 'Usuário de Teste',
      email: 'teste@folio.com',
      password_hash: 'senha_hash_fake',
    }
  });

  const products = [
    {
      title: 'O Senhor dos Anéis: A Sociedade do Anel',
      description: 'O início da maior jornada épica da literatura de fantasia.',
      authors: ['J.R.R. Tolkien'],
      genres: ['Fantasia', 'Épico'],
      price: 59.90,
      stock: 15,
    },
    {
      title: '1984',
      description: 'Um clássico distópico sobre vigilância e controle governamental.',
      authors: ['George Orwell'],
      genres: ['Distopia', 'Clássico'],
      price: 35.00,
      stock: 20,
    },
    {
      title: 'O Hobbit',
      description: 'A aventura de Bilbo Bolseiro antes de O Senhor dos Anéis.',
      authors: ['J.R.R. Tolkien'],
      genres: ['Fantasia', 'Aventura'],
      price: 45.00,
      stock: 10,
    },
    {
      title: 'Duna',
      description: 'A obra-prima da ficção científica sobre política e ecologia em um planeta deserto.',
      authors: ['Frank Herbert'],
      genres: ['Ficção Científica', 'Épico'],
      price: 65.00,
      stock: 8,
    },
    {
      title: 'Dom Casmurro',
      description: 'O maior enigma da literatura brasileira: traiu ou não traiu?',
      authors: ['Machado de Assis'],
      genres: ['Literatura Brasileira', 'Clássico'],
      price: 29.90,
      stock: 50,
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
