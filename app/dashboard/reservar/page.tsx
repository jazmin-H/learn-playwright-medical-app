"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  createAppointment,
  getAvailableTimeSlots,
  getDoctorsBySpecialty,
  getSpecialties,
} from "@/lib/actions";

const appointmentSchema = z.object({
  specialty: z.string({ required_error: "Seleccione una especialidad" }),
  doctorId: z.number({ required_error: "Seleccione un médico" }),
  date: z.date({ required_error: "Seleccione una fecha" }),
  timeSlot: z.string({ required_error: "Seleccione un horario" }),
});

type Doctor = {
  id: number;
  name: string;
};

type Specialty = {
  id: string;
  name: string;
};

export default function ReservarTurnoPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      doctorId: undefined,
      specialty: "",
      timeSlot: "",
    },
  });

  // Fetch specialties on component mount
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialties();
        setSpecialties(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las especialidades",
          variant: "destructive",
        });
      }
    };

    fetchSpecialties();
  }, []);

// Fetch doctors when specialty changes
const onSpecialtyChange = async (value: string) => {
  try {
    const data = await getDoctorsBySpecialty(value);
    setDoctors(data.map((d: { id: number | string; name: string }) => ({
      id: Number(d.id), // Conversión explícita a number
      name: d.name
    })));
    form.resetField("doctorId");
    form.resetField("date");
    form.resetField("timeSlot");
    setTimeSlots([]);
  } catch (error) {
    toast({
      title: "Error",
      description: "No se pudieron cargar los médicos",
      variant: "destructive",
    });
  }
};

  // Fetch available time slots when date changes
  const onDateChange = async (date: Date) => {
    const doctorId = form.getValues("doctorId");
    if (!doctorId) return;

    try {
      const data = await getAvailableTimeSlots(doctorId, date);
      setTimeSlots(data);
      form.resetField("timeSlot");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los horarios disponibles",
        variant: "destructive",
      });
    }
  };

  async function onSubmit(rawValues: z.infer<typeof appointmentSchema>) {
    setIsLoading(true);
    try {
      const values = {
        ...rawValues,
        doctorId: Number(rawValues.doctorId)
      };
      await createAppointment(values);

      toast({
        title: "Turno reservado",
        description: "Tu turno ha sido reservado exitosamente",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error al reservar turno",
        description: error.message || "Ocurrió un error al reservar el turno",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reservar Turno</h1>

      <Card>
        <CardHeader>
          <CardTitle>Datos del turno</CardTitle>
          <CardDescription>
            Selecciona la especialidad, médico, fecha y horario para tu consulta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidad</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        onSpecialtyChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una especialidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.id} value={specialty.id}>
                            {specialty.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Médico</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      value={field.value?.toString()}
                      disabled={!form.getValues("specialty")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un médico" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id.toString()}>
                            Dr. {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled={!form.getValues("doctorId")}
                          >
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            if (date) onDateChange(date);
                          }}
                          disabled={(date) => {
                            // Disable past dates and weekends
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const day = date.getDay();
                            return date < today || day === 0 || day === 6;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horario</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!form.getValues("date")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un horario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.length > 0 ? (
                          timeSlots.map((timeSlot) => (
                            <SelectItem key={timeSlot} value={timeSlot}>
                              {timeSlot}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-slots" disabled>
                            No hay horarios disponibles
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Reservando..." : "Reservar turno"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}