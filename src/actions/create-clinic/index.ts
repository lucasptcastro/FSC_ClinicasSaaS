"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const createClinic = async (name: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // verifica se a clínica já existe
  const clinicAlreadyExist = await db.query.clinicsTable.findFirst({
    where: eq(clinicsTable.name, name),
  });

  // TODO: Retornar o erro para o frontend
  if (clinicAlreadyExist) {
    throw new Error("Clínica já existe");
  }

  // insere a clínica no banco de dados
  const [clinic] = await db
    .insert(clinicsTable)
    .values({
      name,
    })
    .returning();

  // insere o usuário na clínica
  await db.insert(usersToClinicsTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });

  redirect("/dashboard");
};
