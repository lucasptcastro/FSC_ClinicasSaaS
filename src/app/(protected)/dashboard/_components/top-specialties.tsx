import { Hospital } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getSpecialtyIcon } from "@/helpers/specialtyIcon";

interface TopSpecialtiesProps {
  specialties: {
    specialty: string;
    appointments: number;
  }[];
}

export function TopSpecialties({ specialties }: TopSpecialtiesProps) {
  // coleta a especialidade que mais possue agendamentos
  const maxAppointments = Math.max(
    ...specialties.map((item) => item.appointments),
  );

  return (
    <Card className="mx-auto w-full border-[#F4F4F5] shadow-none">
      <CardContent>
        {/* Header */}
        <div className="mb-8 flex flex-col justify-center gap-6">
          <div className="flex items-center gap-3">
            <Hospital className="text-muted-foreground" />
            <CardTitle className="text-base">Especialidades</CardTitle>
          </div>

          <hr className="h-[1px] w-full bg-[#F4F4F5] opacity-30" />
        </div>

        {/* Doctors List */}
        <div className="space-y-6">
          {specialties.map((specialty) => {
            const Icon = getSpecialtyIcon(specialty.specialty);
            const progressValue =
              (specialty.appointments / maxAppointments) * 100;

            return (
              <div
                key={specialty.specialty}
                className="flex items-center gap-2"
              >
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <Icon className="text-primary h-5 w-5" />
                </div>

                <div className="flex w-full flex-col justify-center">
                  <div className="flex w-full justify-between">
                    <h3 className="text-sm">{specialty.specialty}</h3>
                    <div className="text-right">
                      <span className="text-muted-foreground text-sm font-medium">
                        {specialty.appointments} agend.
                      </span>
                    </div>
                  </div>
                  <Progress value={progressValue} className="w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
