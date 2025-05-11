import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

// Prefix para identificar datos de prueba
const TEST_PREFIX = 'TEST_';

export default async function globalSetup() {
  console.log('Configurando datos de prueba...');

  // Limpiar SOLO datos de pruebas anteriores (no todo)
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

  // Crear usuarios de prueba (con prefijo TEST_)
  const hashedPassword = await hash('password123', 12);
  
  const testUser = await prisma.user.create({
    data: {
      email: `${TEST_PREFIX}paciente@test.com`,
      name: `${TEST_PREFIX}Paciente de Prueba`,
      password: hashedPassword,
      phone: `${TEST_PREFIX}5551234567`
    }
  });

  // Crear doctores de prueba (con prefijo TEST_)
  const testDoctor = await prisma.doctor.create({
    data: {
      name: `${TEST_PREFIX}Dr. Prueba`,
      specialty: `${TEST_PREFIX}Cardiología`,
      available: true
    }
  });

  // Crear cita de prueba
  await prisma.appointment.create({
    data: {
      date: new Date(Date.now() + 86400000), // Mañana
      patientId: testUser.id,
      doctorId: testDoctor.id
    }
  });

  console.log('Datos de prueba configurados correctamente');
  await prisma.$disconnect();
}