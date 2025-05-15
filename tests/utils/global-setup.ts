import { PrismaClient } from "@prisma/client";
import { hash } from 'bcryptjs'; // ← Añade esto


const prisma = new PrismaClient();

async function globalSetup() {
    try {

        console.log("🚀 Ejecutando globalSetup: Inicializando entorno de pruebas...");
        await eliminarTodo(prisma);
        await crearEspecialidades(prisma);
        await crearDoctores(prisma);
        await crearUsuarios(prisma);
        await crearCitas(prisma);
    } catch (error) {
        console.error("error: ", error)
    } finally {

        await prisma.$disconnect();
    }

    console.log("✅ Datos de prueba insertados correctamente.");
}

export async function eliminarTodo(prisma: PrismaClient) {
    // Limpiar base de datos primero
    await prisma.appointment.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.user.deleteMany();
    await prisma.specialty.deleteMany();
}

export async function crearEspecialidades(prisma: PrismaClient) {
    await prisma.specialty.createMany({
        data: [
            { id: "neurologia", name: "Neurología" },
            { id: "ortopedia", name: "Ortopedia" },
            { id: "ginecologia", name: "Ginecología" },
            { id: "oftalmologia", name: "Oftalmología" },
        ],
    });
}

export async function crearDoctores(prisma: PrismaClient) {
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
}

export async function crearUsuarios(prisma: PrismaClient) {
    // Hashea las contraseñas ANTES de crear usuarios
    const hashedAdminPass = await hash("AdminSecure123!", 10);
    const hashedPac1Pass = await hash("PacienteSeguro456!", 10);
    const hashedPac2Pass = await hash("MariaPassword789!", 10);
    const hashedPac3Pass = await hash("CarlosTest123!", 10);
    const hashedStaffPass = await hash("Recepcion2024!", 10);

    // Crear usuarios de prueba actualizados
    await prisma.user.createMany({
        data: [
            {
                id: "usr-admin-01",
                name: "Admin Principal",
                email: "admin@clinica.com",
                phone: "5491122334455",
                password: hashedAdminPass, // ← Usa la versión hasheada

            },
            {
                id: "usr-pac-01",
                name: "Juan Pérez",
                email: "juan.perez@mail.com",
                phone: "5491155544433",
                password: hashedPac1Pass, // ← Usa la versión hasheada

            },
            {
                id: "usr-pac-02",
                name: "María García",
                email: "maria.garcia@mail.com",
                phone: "5491166677788",
                password: hashedPac2Pass, // ← Usa la versión hasheada

            },
            {
                id: "usr-pac-03",
                name: "Carlos López",
                email: "carlos.lopez@mail.com",
                phone: "5491199988877",
                password: hashedPac3Pass, // ← Usa la versión hasheada

            },
            {
                id: "usr-staff-01",
                name: "Ana Rodríguez",
                email: "recepcion@clinica.com",
                phone: "5491100011122",
                password: hashedStaffPass, // ← Usa la versión hasheada

            }
        ],
    });
}

export async function crearCitas(prisma: PrismaClient) {
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

}
export default globalSetup;