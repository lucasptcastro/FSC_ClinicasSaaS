import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// defaultRandom -> gera um id aleatório para a coluna (baseado no tipo de dado por ex.: uuid)

// tabela de usuários
export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const accountsTable = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationsTable = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// relacionamento entre as tabelas de usuários e clínicas
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  usersToClinics: many(usersToClinicsTable), // vários usuários associados à clínica (1:N)
}));

// tabela de clínicas
export const clinicsTable = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()), // atualiza a data de atualização sempre que o registro for atualizado
});

// tabela de relacionamento entre usuários e clínicas. onde ficará armazenado os usuários e as clínicas que eles possuem acesso
export const usersToClinicsTable = pgTable("users_to_clinics", {
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// relacionamento intermediário entre as tabelas de usuários e clínicas
export const usersToClinicsTableRelations = relations(
  usersToClinicsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToClinicsTable.userId],
      references: [usersTable.id],
    }),
    clinic: one(clinicsTable, {
      fields: [usersToClinicsTable.clinicId],
      references: [clinicsTable.id],
    }),
  }),
);

// relacionamento entre as tabelas de clínicas, médicos, pacientes e agendamentos
export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
  doctors: many(doctorsTable), // vários médicos associados à clínica (1:N)
  patients: many(patientsTable), // vários pacientes associados à clínica (1:N)
  appointments: many(appointmentsTable), // vários agendamentos associados à clínica (1:N)
  usersToClinics: many(usersToClinicsTable), // vários usuários associados à clínica (1:N)
}));

// tabela de médicos
export const doctorsTable = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),

  // chave estrangeira para a tabela de clínicas
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, { onDelete: "cascade" }), // se a clínica for deletada, todos os médicos associados a ela também serão deletados

  name: text("name").notNull(),
  avatarImageUrl: text("avatar_image_url"), // url da imagem do avatar do médico
  // 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 0 - Sunday
  availableFromWeekDay: integer("available_from_week_day").notNull(), // dia inicial que o médico estará disponível (ex.: de 1 - segunda)
  availableToWeekDay: integer("available_to_week_day").notNull(), // dia final que o médico estará disponível (ex.: até 5 - sexta)
  availableFromTime: time("available_from_time").notNull(), // hora inicial que o médico estará disponível (ex.: 08:00)
  availableToTime: time("available_to_time").notNull(), // hora final que o médico estará disponível (ex.: 18:00)
  specialty: text("specialty").notNull(), // especialidade do médico
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(), // preço da consulta em centavos (ex.: 10000 -> R$100,00)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// relacionamento entre as tabelas de médicos e clínicas
export const doctorsTableRelations = relations(
  doctorsTable,
  ({ many, one }) => ({
    clinic: one(clinicsTable, {
      // relacionamento entre a tabela de médicos e a tabela de clínicas. um médico está associado a apenas uma clínica (1:1)
      fields: [doctorsTable.clinicId],
      references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable), // vários agendamentos associados ao médico (1:N)
  }),
);

// enum de sexo do paciente
export const patientSexEnum = pgEnum("patient_sex", ["male", "female"]);

// tabela de pacientes
export const patientsTable = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),

  // chave estrangeira para a tabela de clínicas
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, { onDelete: "cascade" }), // se a clínica for deletada, todos os pacientes associados a ela também serão deletados
  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  sex: patientSexEnum("sex").notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// relacionamento entre as tabelas de pacientes e clínicas
export const patientsTableRelations = relations(
  patientsTable,
  ({ one, many }) => ({
    clinic: one(clinicsTable, {
      // relacionamento entre a tabela de pacientes e a tabela de clínicas. um paciente está associado a apenas uma clínica (1:1)
      fields: [patientsTable.clinicId],
      references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable), // vários agendamentos associados ao paciente (1:N)
  }),
);

// tabela de agendamentos
export const appointmentsTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: timestamp("date").notNull(),
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),

  // chave estrangeira para a tabela de clínicas
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, { onDelete: "cascade" }), // se a clínica for deletada, todos os agendamentos associados a ela também serão deletados

  // chave estrangeira para a tabela de pacientes
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patientsTable.id, { onDelete: "cascade" }), // se o paciente for deletado, todos os agendamentos associados a ele também serão deletados

  // chave estrangeira para a tabela de médicos
  doctorId: uuid("doctor_id")
    .notNull()
    .references(() => doctorsTable.id, { onDelete: "cascade" }), // se o médico for deletado, todos os agendamentos associados a ele também serão deletados
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// relacionamento entre as tabelas de agendamentos e clínicas
export const appointmentsTableRelations = relations(
  appointmentsTable,
  ({ one }) => ({
    clinic: one(clinicsTable, {
      // relacionamento entre a tabela de agendamentos e a tabela de clínicas. um agendamento está associado a apenas uma clínica (1:1)
      fields: [appointmentsTable.clinicId],
      references: [clinicsTable.id],
    }),
    patient: one(patientsTable, {
      fields: [appointmentsTable.patientId],
      references: [patientsTable.id],
    }),
    doctor: one(doctorsTable, {
      fields: [appointmentsTable.doctorId],
      references: [doctorsTable.id],
    }),
  }),
);
