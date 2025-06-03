import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql" (tipos de banco de dados suportados)
    usePlural: true, // pluraliza os nomes das tabelas
  }),
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
});
