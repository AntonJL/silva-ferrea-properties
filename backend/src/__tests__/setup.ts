import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

beforeAll(async () => {
  // Clean up database before tests
  await prisma.$connect();
  
  // Clean all tables
  await prisma.rentPayment.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.maintenanceEvent.deleteMany();
  await prisma.document.deleteMany();
  await prisma.loan.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

afterEach(async () => {
  // Clean up after each test
  await prisma.rentPayment.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.maintenanceEvent.deleteMany();
  await prisma.document.deleteMany();
  await prisma.loan.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();
}); 