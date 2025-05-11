import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const TEST_PREFIX = 'TEST_';

export default async function globalTeardown() {
  console.log('Limpiando datos de prueba...');
  
  // Borrar solo datos con prefijo TEST_
  await prisma.appointment.deleteMany({
    where: {
      OR: [
        { patient: { email: { startsWith: TEST_PREFIX } } },
        { doctor: { name: { startsWith: TEST_PREFIX } } }
      ]
    }
  });

  await prisma.doctor.deleteMany({
    where: { name: { startsWith: TEST_PREFIX } }
  });

  await prisma.user.deleteMany({
    where: { email: { startsWith: TEST_PREFIX } }
  });

  console.log('Limpieza completada');
  await prisma.$disconnect();
}