import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import * as schema from "@/db/schema";

import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql" (tipos de banco de dados suportados)
    usePlural: true, // pluraliza os nomes das tabelas
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      const clinics = await db.query.usersToClinicsTable.findMany({
        where: eq(schema.usersToClinicsTable.userId, user.id),
        with: {
          clinic: true,
        },
      });

      // TODO: ao adaptar para o usuário ter múltiplcas clínicas, deve-se mudar este código
      const clinic = clinics?.[0];

      return {
        user: {
          ...user,
          clinic: clinic?.clinicId
            ? {
                id: clinic.clinicId,
                name: clinic.clinic.name,
              }
            : undefined,
        },
        session,
      };
    }),
  ],
  user: {
    modelName: "usersTable", // nome da tabela de usuários
  },
  session: {
    modelName: "sessionsTable", // nome da tabela de sessões
  },
  account: {
    modelName: "accountsTable", // nome da tabela de contas
  },
  verification: {
    modelName: "verificationsTable", // nome da tabela de verificações
  },
  emailAndPassword: {
    enabled: true, // habilita o login com email e senha
  },
});
