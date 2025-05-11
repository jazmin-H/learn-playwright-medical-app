"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { hash, compare } from 'bcryptjs';

// [Caso de Uso 1] - Inicio de Sesión Exitoso
export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log("Ejecutando Caso de Uso 1: Inicio de Sesión Exitoso");
  
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || !(await compare(password, user.password))) {
    throw new Error("Credenciales inválidas");
  }

  // Simulamos la creación de una sesión
  (await cookies()).set(
    "session",
    JSON.stringify({
      userId: user.id,
      name: user.name,
      email: user.email,
    })
  );

  return { success: true, message: "Inicio de sesión exitoso" };
}

// [Caso de Uso 2] - Registro de Usuario
export async function registerUser(userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  console.log("Ejecutando Caso de Uso 2: Registro de Usuario");
  
  const hashedPassword = await hash(userData.password, 12);

  try {
    await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: hashedPassword
      }
    });
    return { success: true, message: "Usuario registrado correctamente" };
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      throw new Error("El email ya está registrado");
    }
    throw new Error("Error al registrar usuario");
  }
}

export async function logoutUser() {
  (await cookies()).delete("session");
  redirect("/login");
}

// [Caso de Uso 3] - Obtener Especialidades
export async function getSpecialties() {
  console.log("Obteniendo especialidades médicas");
  return await prisma.doctor.findMany({
    select: {
      specialty: true
    },
    distinct: ['specialty']
  });
}

// [Caso de Uso 4] - Obtener Doctores por Especialidad
export async function getDoctorsBySpecialty(specialty: string) {
  console.log(`Obteniendo doctores para especialidad: ${specialty}`);
  return await prisma.doctor.findMany({
    where: { 
      specialty,
      available: true 
    }
  });
}

// [Caso de Uso 5] - Reserva de Turno (Parte 1: Horarios Disponibles)
export async function getAvailableTimeSlots(doctorId: number, date: Date) {
  console.log(`Obteniendo horarios disponibles para doctor ${doctorId} en ${date}`);
  
  // Horarios base
  const allSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  // Obtener citas existentes para este doctor y fecha
  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId,
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999))
      }
    }
  });

  // Filtrar horarios ocupados
  const bookedSlots = appointments.map((a: { date: Date }) => 
    a.date.toTimeString().substring(0, 5)
  );

  return allSlots.filter(slot => !bookedSlots.includes(slot));
}

// [Caso de Uso 6] - Reserva de Turno (Parte 2: Creación)
export async function createAppointment(data: {
  specialty: string;
  doctorId: number;
  date: Date;
  timeSlot: string;
}) {
  console.log("Ejecutando Caso de Uso 6: Reserva de Turno");
  
  const session = JSON.parse((await cookies()).get("session")?.value || "{}");
  if (!session.userId) {
    throw new Error("No autenticado");
  }

  // [Caso de Uso 3] - Verificar duplicados
  const existingAppointment = await prisma.appointment.findFirst({
    where: {
      patientId: parseInt(session.userId),
      date: {
        gte: new Date(data.date.setHours(0, 0, 0, 0)),
        lt: new Date(data.date.setHours(23, 59, 59, 999))
      }
    }
  });

  if (existingAppointment) {
    throw new Error(
      "Ya tienes un turno reservado en este horario. Cancela el turno existente para reservar uno nuevo."
    );
  }

  // Crear fecha completa con hora
  const [hours, minutes] = data.timeSlot.split(':').map(Number);
  const appointmentDate = new Date(data.date);
  appointmentDate.setHours(hours, minutes, 0, 0);

  // Crear la cita
  try {
    await prisma.appointment.create({
      data: {
        date: appointmentDate,
        specialty: data.specialty,
        patientId: parseInt(session.userId),
        doctorId: data.doctorId
      }
    });
    
    revalidatePath("/dashboard");
    return { 
      success: true, 
      message: "Turno reservado correctamente. Recibirás un email de confirmación." 
    };
  } catch (error) {
    throw new Error("Error al reservar turno");
  }
}

// [Caso de Uso 7] - Obtener Citas del Usuario
export async function getUserAppointments() {
  console.log("Ejecutando Caso de Uso 7: Obtener Citas del Usuario");
  
  const session = JSON.parse((await cookies()).get("session")?.value || "{}");
  if (!session.userId) {
    return [];
  }

  return await prisma.appointment.findMany({
    where: { 
      patientId: parseInt(session.userId),
      date: { gte: new Date() } // Solo citas futuras
    },
    include: {
      doctor: true
    },
    orderBy: { date: 'asc' }
  });
}

// [Caso de Uso 8] - Cancelación de Turno
export async function cancelAppointment(appointmentId: number) {
  console.log("Ejecutando Caso de Uso 8: Cancelación de Turno");
  
  const session = JSON.parse((await cookies()).get("session")?.value || "{}");
  if (!session.userId) {
    throw new Error("No autenticado");
  }

  // Verificar que la cita pertenece al usuario
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId }
  });

  if (!appointment || appointment.patientId !== parseInt(session.userId)) {
    throw new Error("Turno no encontrado");
  }

  // [Caso de Uso 4] - Verificar 24 horas de anticipación
  const now = new Date();
  const diffInHours = (appointment.date.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    throw new Error(
      "No se puede cancelar un turno con menos de 24 horas de anticipación"
    );
  }

  // Eliminar la cita
  await prisma.appointment.delete({
    where: { id: appointmentId }
  });

  revalidatePath("/dashboard");
  return { 
    success: true, 
    message: "Turno cancelado correctamente. Recibirás un email de confirmación." 
  };
}