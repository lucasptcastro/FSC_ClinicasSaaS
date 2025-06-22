"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { protectedActionClient } from "@/lib/next-safe-action";

export const deleteDoctor = protectedActionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    // verifica se o médico existe
    const doctor = await db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, parsedInput.id),
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // verifica se a clínica do médico é a mesma do usuário
    if (doctor.clinicId !== ctx.user.clinic?.id) {
      throw new Error("Doctor clinic does not match user clinic");
    }

    // deleta o médico
    await db.delete(doctorsTable).where(eq(doctorsTable.id, parsedInput.id));
    revalidatePath("/doctors");
  });
