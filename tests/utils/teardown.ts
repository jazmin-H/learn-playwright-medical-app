import { PrismaClient } from "@prisma/client";
import { eliminarTodo } from "./global-setup";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

(async function globalTeardown() {
  try {
    console.log("🧹 Ejecutando globalTeardown...");
    await eliminarTodo(prisma)

    console.log("✅ globalTeardown completado");
  } catch (error) {
    console.error("❌ Error en globalTeardown:", error);
  } finally {
    await prisma.$disconnect();
  }
})()

