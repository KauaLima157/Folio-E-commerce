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
    // LITERATURA
    { title: 'Dom Casmurro', description: 'Um clássico do realismo brasileiro que explora o ciúme e a dúvida sobre Capitu.', authors: ['Machado de Assis'], genres: ['Literatura'], price: 39.90, stock: 50 },
    { title: 'A Metamorfose', description: 'A célebre história de Gregor Samsa, que acorda metamorfoseado em um inseto monstruoso.', authors: ['Franz Kafka'], genres: ['Literatura'], price: 34.90, stock: 40 },
    { title: 'A Cartomante', description: 'Um dos contos mais famosos de Machado de Assis que explora triângulos amorosos e o destino.', authors: ['Machado de Assis'], genres: ['Literatura'], price: 24.90, stock: 45 },
    { title: 'Anna Karenina', description: 'Um dos maiores romances da literatura mundial, retratando o trágico amor de Anna.', authors: ['Liev Tolstói'], genres: ['Literatura'], price: 54.90, stock: 30 },
    { title: 'A Morte de Ivan Ilitch', description: 'Uma reflexão profunda sobre a vida, a morte e o sentido da existência humana.', authors: ['Liev Tolstói'], genres: ['Literatura'], price: 29.90, stock: 35 },
    { title: 'Memórias Póstumas de Brás Cubas', description: 'A inovadora narrativa de um defunto autor que analisa sua própria vida com ironia.', authors: ['Machado de Assis'], genres: ['Literatura'], price: 35.90, stock: 40 },
    { title: 'O Processo', description: 'O pesadelo burocrático de Josef K., preso sem saber de qual crime é acusado.', authors: ['Franz Kafka'], genres: ['Literatura'], price: 38.00, stock: 25 },
    { title: 'O Pequeno Príncipe', description: 'Uma história atemporal sobre a infância, o amor e a amizade.', authors: ['Antoine de Saint-Exupéry'], genres: ['Literatura'], price: 25.00, stock: 70 },

    // ROMANCE
    { title: 'Orgulho e Preconceito', description: 'O romance clássico de Elizabeth Bennet.', authors: ['Jane Austen'], genres: ['Romance'], price: 35.90, stock: 40 },
    { title: 'O Morro dos Ventos Uivantes', description: 'Um conto de amor e vingança.', authors: ['Emily Brontë'], genres: ['Romance'], price: 39.90, stock: 30 },
    { title: 'Jane Eyre', description: 'A jornada de uma mulher independente.', authors: ['Charlotte Brontë'], genres: ['Romance'], price: 42.00, stock: 25 },
    { title: 'A Culpa é das Estrelas', description: 'Romance jovem e emocionante.', authors: ['John Green'], genres: ['Romance'], price: 29.90, stock: 55 },
    { title: 'Como Eu Era Antes de Você', description: 'Um romance sobre escolhas e amor.', authors: ['Jojo Moyes'], genres: ['Romance'], price: 34.90, stock: 40 },
    { title: 'É Assim Que Acaba', description: 'Um romance forte e marcante.', authors: ['Colleen Hoover'], genres: ['Romance'], price: 45.00, stock: 50 },

    // POESIA
    { title: 'A Rosa do Povo', description: 'Poemas fundamentais da literatura.', authors: ['Carlos Drummond de Andrade'], genres: ['Poesia'], price: 34.90, stock: 20 },
    { title: 'Livro do Desassossego', description: 'Reflexões poéticas de Fernando Pessoa.', authors: ['Fernando Pessoa'], genres: ['Poesia'], price: 49.90, stock: 15 },
    { title: 'Antologia Poética', description: 'Coletânea de grandes poemas.', authors: ['Vinicius de Moraes'], genres: ['Poesia'], price: 29.90, stock: 30 },
    { title: 'O Corvo', description: 'O clássico poema sombrio.', authors: ['Edgar Allan Poe'], genres: ['Poesia'], price: 24.90, stock: 40 },
    { title: 'Cânticos', description: 'Poesia contemplativa.', authors: ['Cecília Meireles'], genres: ['Poesia'], price: 32.00, stock: 25 },
    { title: 'Toda Poesia', description: 'A obra poética completa.', authors: ['Paulo Leminski'], genres: ['Poesia'], price: 59.90, stock: 20 },

    // FANTASIA
    { title: 'O Senhor dos Anéis', description: 'O início da maior jornada épica.', authors: ['J.R.R. Tolkien'], genres: ['Fantasia'], price: 59.90, stock: 15 },
    { title: 'O Hobbit', description: 'A aventura de Bilbo Bolseiro.', authors: ['J.R.R. Tolkien'], genres: ['Fantasia'], price: 45.00, stock: 10 },
    { title: 'Harry Potter e a Pedra Filosofal', description: 'O garoto que sobreviveu.', authors: ['J.K. Rowling'], genres: ['Fantasia'], price: 49.90, stock: 60 },
    { title: 'A Guerra dos Tronos', description: 'Inverno está chegando.', authors: ['George R.R. Martin'], genres: ['Fantasia'], price: 69.90, stock: 20 },
    { title: 'O Nome do Vento', description: 'A história do arcanista Kvothe.', authors: ['Patrick Rothfuss'], genres: ['Fantasia'], price: 79.90, stock: 15 },
    { title: 'As Crônicas de Nárnia', description: 'Um mundo mágico escondido.', authors: ['C.S. Lewis'], genres: ['Fantasia'], price: 89.90, stock: 25 },

    // FILOSOFIA
    { title: 'Meditações', description: 'Pensamentos do imperador romano.', authors: ['Marco Aurélio'], genres: ['Filosofia'], price: 39.90, stock: 20 },
    { title: 'Assim Falou Zaratustra', description: 'Um livro para todos e para ninguém.', authors: ['Friedrich Nietzsche'], genres: ['Filosofia'], price: 45.00, stock: 15 },
    { title: 'O Mito da Caverna', description: 'Alegoria fundamental da filosofia.', authors: ['Platão'], genres: ['Filosofia'], price: 29.90, stock: 30 },
    { title: 'O Príncipe', description: 'Tratado político clássico.', authors: ['Nicolau Maquiavel'], genres: ['Filosofia'], price: 24.90, stock: 40 },
    { title: 'A Arte da Guerra', description: 'Estratégia militar e filosófica.', authors: ['Sun Tzu'], genres: ['Filosofia'], price: 19.90, stock: 50 },
    { title: 'Sapiens', description: 'Uma breve história da humanidade.', authors: ['Yuval Noah Harari'], genres: ['Filosofia'], price: 59.90, stock: 25 },

    // FICÇÃO CIENTÍFICA
    { title: 'Duna', description: 'Política e ecologia no planeta deserto.', authors: ['Frank Herbert'], genres: ['Ficção Científica'], price: 65.00, stock: 12 },
    { title: 'Fundação', description: 'O declínio e queda do império galáctico.', authors: ['Isaac Asimov'], genres: ['Ficção Científica'], price: 55.00, stock: 20 },
    { title: 'Neuromancer', description: 'O precursor do cyberpunk.', authors: ['William Gibson'], genres: ['Ficção Científica'], price: 49.90, stock: 18 },
    { title: 'O Guia do Mochileiro das Galáxias', description: 'Não entre em pânico.', authors: ['Douglas Adams'], genres: ['Ficção Científica'], price: 39.90, stock: 35 },
    { title: 'Eu, Robô', description: 'As leis da robótica.', authors: ['Isaac Asimov'], genres: ['Ficção Científica'], price: 45.00, stock: 25 },
    { title: 'Blade Runner', description: 'Androides sonham com ovelhas elétricas?', authors: ['Philip K. Dick'], genres: ['Ficção Científica'], price: 42.90, stock: 20 },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Banco de dados populado com 36 livros únicos!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
