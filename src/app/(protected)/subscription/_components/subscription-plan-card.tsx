import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Divider } from "../../_components/divider";

interface SubscriptionPlanCardProps {
  active?: boolean;
}

export default function SubscriptionPlanCard({
  active = false,
}: SubscriptionPlanCardProps) {
  const features = [
    "Cadastro de até 3 médicos",
    "Agendamentos ilimitados",
    "Métricas básicas",
    "Cadastro de pacientes",
    "Confirmação manual",
    "Suporte via e-mail",
    "Exportação em CSV",
  ];

  return (
    <Card className="w-full max-w-xs rounded-lg border-[#F4F4F5] bg-white shadow-none">
      <CardHeader className="pb-4">
        <div className="mb-2 flex items-center justify-between">
          <CardTitle className="text-xl text-[#0E0A2F]">Essential</CardTitle>
          {active && (
            <Badge className="rounded-2xl bg-[#EBFAF7] px-[10px] py-1 text-xs font-bold text-[#00A180]">
              Atual
            </Badge>
          )}
        </div>
        <CardDescription className="mb-4">
          Para profissionais autônomos ou pequenas clínicas
        </CardDescription>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-[#0E0A2F]">R$59</span>
          <span className="ml-1 text-gray-500">/ mês</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                <Check className="h-3 w-3 text-teal-600" />
              </div>
              <span className="text-sm text-[#0E0A2F]">{feature}</span>
            </div>
          ))}
        </div>

        <Divider />

        <Button variant="outline" className="mt-6 w-full">
          {active ? "Gerenciar Assinatura" : "Fazer Assinatura"}
        </Button>
      </CardContent>
    </Card>
  );
}
