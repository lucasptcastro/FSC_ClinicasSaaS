import { z } from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(1, "Nome é obrigatório"),
    specialty: z.string().min(1, "Especialidade é obrigatória"),
    appointmentPriceInCents: z
      .number()
      .min(1, "Preço da consulta é obrigatório"),
    availableFromWeekDay: z.number().min(0).max(6),
    availableToWeekDay: z.number().min(0).max(6),
    availableFromTime: z
      .string()
      .min(1, "Horário inicial de disponibilidade é obrigatório"),
    availableToTime: z
      .string()
      .min(1, "Horário final de disponibilidade é obrigatório"),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message:
        "O horário inicial de disponibilidade deve ser anterior ao horário final de disponibilidade",
      path: ["availableFromTime"],
    },
  );

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;
