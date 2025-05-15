import { PrismaClient } from "@prisma/client";
import { hash } from 'bcryptjs'; // ← Añade esto
import { crearCitas, crearDoctores, crearEspecialidades, crearUsuarios, eliminarTodo } from "./global-setup";


const prisma = new PrismaClient();

(async function globalSetup() {
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
})()