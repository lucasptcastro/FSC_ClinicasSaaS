import {
  Activity,
  Baby,
  Bone,
  Brain,
  Eye,
  Hand,
  Heart,
  Hospital,
  Stethoscope,
} from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TopSpecialtiesProps {
  specialties: {
    specialty: string;
    appointments: number;
  }[];
}

// código para gerar ícones baseados no tipo de especialidade. O ideal seria cadastrar esses ícones no banco ou criar um ENUM
const getSpecialtyIcon = (specialty: string) => {
  const specialtyLower = specialty.toLowerCase();

  if (specialtyLower.includes("cardiolog")) return Heart;
  if (
    specialtyLower.includes("ginecolog") ||
    specialtyLower.includes("obstetri")
  )
    return Baby;
  if (specialtyLower.includes("pediatr")) return Activity;
  if (specialtyLower.includes("dermatolog")) return Hand;
  if (
    specialtyLower.includes("ortoped") ||
    specialtyLower.includes("traumatolog")
  )
    return Bone;
  if (specialtyLower.includes("oftalmolog")) return Eye;
  if (specialtyLower.includes("neurolog")) return Brain;

  return Stethoscope; // ícone padrão
};

export function TopSpecialties({ specialties }: TopSpecialtiesProps) {
  // coleta a especialidade que mais possue agendamentos
  const maxAppointments = Math.max(
    ...specialties.map((item) => item.appointments),
  );

  return (
    <Card className="mx-auto w-full border-[#F4F4F5] shadow-none">
      <CardContent>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hospital className="text-muted-foreground" />
            <CardTitle className="text-base">Especialidades</CardTitle>
          </div>
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
