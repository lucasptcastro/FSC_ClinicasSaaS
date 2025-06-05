import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id), // filtra as clínicas do usuário
  });

  // se o usuário não tem clínicas, redireciona para a página de criação de clínica
  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return <div>{session.user.email}</div>;
}
