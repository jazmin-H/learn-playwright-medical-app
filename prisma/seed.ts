import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDatabase() {
  // Crear especialidades si no existen
  const existingSpecialties = await prisma.specialty.findMany();
  if (existingSpecialties.length === 0) {
    await prisma.specialty.createMany({
      data: [
        { id: "neurologia", name: "Neurología" },
        { id: "ortopedia", name: "Ortopedia" },
        { id: "ginecologia", name: "Ginecología" },
        { id: "oftalmologia", name: "Oftalmología" },
      ],
    });
    console.log("Especialidades creadas");
  } else {
    console.log("Especialidades ya existen, omitiendo");
  }

  // Crear doctores si no existen
  const existingDoctors = await prisma.doctor.findMany();
  if (existingDoctors.length === 0) {
    await prisma.doctor.createMany({
      data: [
        // Neurología
        {
          id: "dr-ricardo-mendoza",
          name: "Dr. Ricardo Mendoza",
          specialtyId: "neurologia",
        },
        {
          id: "dra-elena-castro",
          name: "Dra. Elena Castro",
          specialtyId: "neurologia",
        },
        // Ortopedia
        {
          id: "dr-oscar-perez",
          name: "Dr. Óscar Pérez",
          specialtyId: "ortopedia",
        },
        {
          id: "dra-claudia-ruiz",
          name: "Dra. Claudia Ruíz",
          specialtyId: "ortopedia",
        },
        // Ginecología
        {
          id: "dra-maria-gonzalez",
          name: "Dra. María González",
          specialtyId: "ginecologia",
        },
        {
          id: "dr-luis-herrera",
          name: "Dr. Luis Herrera",
          specialtyId: "ginecologia",
        },
        // Oftalmología 
        {
          id: "dra-patricia-vargas",
          name: "Dra. Patricia Vargas",
          specialtyId: "oftalmologia",
        },
        {
          id: "dr-javier-morales",
          name: "Dr. Javier Morales",
          specialtyId: "oftalmologia",
        },
      ],
    });
    console.log("Doctores creados");
  } else {
    console.log("Doctores ya existen, omitiendo");
  }
}

seedDatabase()
  .then(() => {
    console.log("✅ Base de datos inicializada con datos por defecto");
  })
  .catch((err) => {
    console.error("❌ Error al inicializar la base de datos", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });