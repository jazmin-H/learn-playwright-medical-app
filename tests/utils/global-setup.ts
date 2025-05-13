import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function globalSetup() {
    console.log("🚀 Ejecutando globalSetup: Inicializando entorno de pruebas...");

    // Limpiar base de datos primero
    await prisma.appointment.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.user.deleteMany();
    await prisma.specialty.deleteMany();

    // Crear especialidades
    await prisma.specialty.createMany({
        data: [
            { id: "neurologia", name: "Neurología" },
            { id: "ortopedia", name: "Ortopedia" },
            { id: "ginecologia", name: "Ginecología" },
            { id: "oftalmologia", name: "Oftalmología" },
        ],
    });

    // Crear doctores
    await prisma.doctor.createMany({
        data: [
            // Neurología
            { id: "dr-ricardo-mendoza", name: "Dr. Ricardo Mendoza", specialtyId: "neurologia" },
            { id: "dra-elena-castro", name: "Dra. Elena Castro", specialtyId: "neurologia" },
            // Ortopedia
            { id: "dr-oscar-perez", name: "Dr. Óscar Pérez", specialtyId: "ortopedia" },
            { id: "dra-claudia-ruiz", name: "Dra. Claudia Ruíz", specialtyId: "ortopedia" },
            // Ginecología
            { id: "dra-maria-gonzalez", name: "Dra. María González", specialtyId: "ginecologia" },
            { id: "dr-luis-herrera", name: "Dr. Luis Herrera", specialtyId: "ginecologia" },
            // Oftalmología
            { id: "dra-patricia-vargas", name: "Dra. Patricia Vargas", specialtyId: "oftalmologia" },
            { id: "dr-javier-morales", name: "Dr. Javier Morales", specialtyId: "oftalmologia" },
        ],
    });

    // Crear usuarios de prueba actualizados
    await prisma.user.createMany({
        data: [
            {
                id: "usr-admin-01",
                name: "Admin Principal",
                email: "admin@clinica.com",
                phone: "5491122334455",
                password: "AdminSecure123!",
                
            },
            {
                id: "usr-pac-01",
                name: "Juan Pérez",
                email: "juan.perez@mail.com",
                phone: "5491155544433",
                password: "PacienteSeguro456!",
                
            },
            {
                id: "usr-pac-02",
                name: "María García",
                email: "maria.garcia@mail.com",
                phone: "5491166677788",
                password: "MariaPassword789!",
                
            },
            {
                id: "usr-pac-03",
                name: "Carlos López",
                email: "carlos.lopez@mail.com",
                phone: "5491199988877",
                password: "CarlosTest123!",
                
            },
            {
                id: "usr-staff-01",
                name: "Ana Rodríguez",
                email: "recepcion@clinica.com",
                phone: "5491100011122",
                password: "Recepcion2024!",
                
            }
        ],
    });

    // Crear citas de prueba
    await prisma.appointment.createMany({
        data: [
            {
                userId: "usr-pac-01",
                doctorId: "dr-ricardo-mendoza",
                specialtyId: "neurologia",
                date: new Date("2025-05-28"),
                time: "10:00",
                
            },
            {
                userId: "usr-pac-02",
                doctorId: "dra-patricia-vargas",
                specialtyId: "oftalmologia",
                date: new Date("2025-05-29"),
                time: "11:30",
                
            }
        ],
    });

    console.log("✅ Datos de prueba insertados correctamente.");
    await prisma.$disconnect();
}

export default globalSetup;