import { z } from "zod";

import { patientSexEnum } from "@/db/schema";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phoneNumber: z.string().min(1, "Número de telefone é obrigatório"),
  sex: z.enum([patientSexEnum.enumValues[0], patientSexEnum.enumValues[1]], {
    errorMap: () => ({ message: "Sexo é obrigatório" }),
  }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
