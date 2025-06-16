"use client";

import dayjs from "dayjs";
import { DollarSign } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrencyInCents } from "@/helpers/currency";

export const description = "An area chart with gradient fill";

interface DailyAppointment {
  date: string;
  appointments: number;
  revenue: number | null;
}

interface AppointmentsChartProps {
  dailyAppointmentsData: DailyAppointment[];
}

export function AppointmentsChart({
  dailyAppointmentsData,
}: AppointmentsChartProps) {
  // Gera 21 dias (data atual + 10 dias atrás + 10 dias a frente)
  const chartDays = Array.from({ length: 21 }).map((_item, index) =>
    dayjs()
      .subtract(10 - index, "days")
      .format("YYYY-MM-DD"),
  );

  // Coleta os dados para cada um dos 21 dias
  const chartData = chartDays.map((date) => {
    const dataForDay = dailyAppointmentsData.find((item) => item.date === date);
    return {
      date: dayjs(date).format("DD/MM"),
      fullDate: date,
      appointments: dataForDay?.appointments || 0, // se dataForDay for undefined/null retorna 0
      revenue: Number(dataForDay?.revenue) || 0, // se dataForDay for undefined/null retorna 0
    };
  });

  const chartConfig = {
    appointments: {
      label: "Agendamentos",
      color: "#0B68F7",
    },
    revenue: {
      label: "Faturamento",
      color: "#10B981",
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-[#F4F4F5] shadow-none">
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
          <DollarSign className="text-primary h-4 w-4" />
        </div>
        <CardTitle>Agendamentos e Faturamento</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* Coluna horizontal com as datas */}
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            {/* Coluna vertical com alguns valores */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            {/* Coluna vertical com alguns valores formatados */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatCurrencyInCents(value)}
            />
            {/* Tooltip personalizado para exibir o faturamento e os agendamentos */}
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "revenue") {
                      return (
                        <>
                          <div className="h-3 w-3 rounded bg-[#10B981]" />
                          <span className="text-muted-foreground">
                            Faturamento:
                          </span>
                          <span className="font-semibold">
                            {formatCurrencyInCents(Number(value))}
                          </span>
                        </>
                      );
                    }
                    return (
                      <>
                        <div className="h-3 w-3 rounded bg-[#0B68F7]" />
                        <span className="text-muted-foreground">
                          Agendamentos:
                        </span>
                        <span className="font-semibold">{value}</span>
                      </>
                    );
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return dayjs(payload[0].payload?.fulldate).format(
                        "DD/MM/YYYY (dddd)",
                      );
                    }
                    return label;
                  }}
                />
              }
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="appointments"
              stroke="var(--color-appointments)"
              fill="var(--color-appointments)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)" // cor da linha do chart
              fill="var(--color-revenue)" // cor do preenchimento  do chart
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
