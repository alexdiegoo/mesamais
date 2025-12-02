"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart" 


const GREEN_PALETTE = {
  GreenPrimary: "hsl(142.1 70.6% 45.3%)", // Verde principal (Green-600)
  GreenLight: "hsl(142.1 50.6% 65.3%)",   // Verde mais claro
  GreenDark: "hsl(142.1 80.6% 30.3%)",    // Verde mais escuro
  GreenAccent: "hsl(75 80% 60%)",        // Verde amarelado/limão
};

const chartConfig = {
  quantidade: {
    label: "Quantidade (kg)",
    color: GREEN_PALETTE.GreenPrimary,
  },
  tipo: {
    label: "Tipo de Alimento",
  }
} satisfies ChartConfig

interface DistribuicaoChartProps {
    data: {
        tipo: string;
        quantidade: number;
    }[];
}

export function DistribuicaoChart({ data }: DistribuicaoChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-[250px] items-center justify-center text-gray-500 text-sm">
                Nenhuma distribuição de alimentos encontrada neste período.
            </div>
        )
    }

  return (
    <ChartContainer config={chartConfig} className="mx-auto min-h-[250px] max-w-xl">
      <BarChart 
        accessibilityLayer 
        data={data}
        margin={{
            top: 20,
            right: 10,
            left: -10,
            bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis 
          dataKey="tipo" 
          tickLine={false} 
          tickMargin={10} 
          axisLine={false}
        />
        <YAxis 
          tickLine={false} 
          tickMargin={10} 
          axisLine={false}
        />
        <ChartTooltip 
          content={<ChartTooltipContent />} 
          cursor={{ fill: "hsl(var(--muted))" }} 
        />
        <Bar 
          dataKey="quantidade" 
          fill="var(--color-quantidade)" 
          radius={4} 
        />
      </BarChart>
    </ChartContainer>
  )
}