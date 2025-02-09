"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import * as React from "react"
import { cn } from "@/lib/utils"

interface ReportsChartProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  subject: string;
  data: {
    [key: string]: number;
  }
}

export function AreaChartGraph({ title, description, subject, data, ...props }: ReportsChartProps) {
  
  const totalValue = Object.values(data).reduce((acc, curr) => acc + curr, 0);

  const chartData = Object.entries(data).map(([key, value]) => ({
    key,
    value,
    fill: `var(--color-${key})`,
  }));

  const chartConfig = chartData.reduce((acc, curr, index) => {
    acc[curr.key] = {
      label: curr.key,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return acc;
  }, {} as ChartConfig);
  return (
     <Card {...props} className={cn("flex flex-col", props.className)}>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="value"
              type="linear"
              fill="var(--color-january)"
              fillOpacity={1}
              stroke="var(--color-january)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
