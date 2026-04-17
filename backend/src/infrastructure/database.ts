import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import prismaConfig from '../../prisma.config';

const pool = new Pool({ connectionString: (prismaConfig as any).datasource.url });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
