"use client";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { CalendarIcon, ClockIcon, DollarSign } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";
import { getSpecialtyIcon } from "@/helpers/specialtyIcon";

import { getAvailability } from "./_helpers/availability";
import { UpsertDoctorForm } from "./upsert-doctor-form";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect; // pega o tipo de doctor que vem do banco de dados
}

dayjs.extend(utc);
dayjs.extend(timezone);

export function DoctorCard({ doctor }: DoctorCardProps) {
  const [isUpsertDoctorDialogOpen, setIsUpsertDoctorDialogOpen] =
    useState(false);

  //   TODO: ajustar para pegar apenas as iniciais do nome e sobrenome (atualmente tá pegando as iniciais do nome completo)
  const doctorInitials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join(""); // coleta as iniciais do nome do médico (ex: "John Doe" -> "JD")

  const availability = getAvailability(doctor);

  const Icon = getSpecialtyIcon(doctor.specialty);

  const doctorAvailableFrom = dayjs()
    .utc()
    .set("hour", Number(doctor.availableFromTime.split(":")[0]))
    .set("minute", Number(doctor.availableFromTime.split(":")[1]))
    .set("second", 0)
    .local();

  const doctorAvailableTo = dayjs()
    .utc()
    .set("hour", Number(doctor.availableToTime.split(":")[0]))
    .set("minute", Number(doctor.availableToTime.split(":")[1]))
    .set("second", 0)
    .local();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-[72px] w-[72px]">
            <AvatarFallback>{doctorInitials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{doctor.name}</h3>

            <div className="flex items-center gap-2">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                <Icon className="text-primary h-5 w-5" />
              </div>

              <p className="text-muted-foreground text-sm font-medium">
                {doctor.specialty}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          {availability.from.format("dddd")} - {availability.to.format("dddd")}
        </Badge>
        <Badge variant="outline">
          <ClockIcon className="mr-1" />
          Das {doctorAvailableFrom.format("HH:mm")} às{" "}
          {doctorAvailableTo.format("HH:mm")}
        </Badge>
        <Badge variant="outline">
          <DollarSign className="mr-1" />
          {formatCurrencyInCents(doctor.appointmentPriceInCents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog
          open={isUpsertDoctorDialogOpen}
          onOpenChange={setIsUpsertDoctorDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertDoctorForm
            doctor={{
              ...doctor,
              availableFromTime: availability.from.format("HH:mm:ss"), // converte para o fuso horário local
              availableToTime: availability.to.format("HH:mm:ss"), // converte para o fuso horário local
            }}
            onSuccess={() => {
              setIsUpsertDoctorDialogOpen(false);
            }}
            isOpen={isUpsertDoctorDialogOpen}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
