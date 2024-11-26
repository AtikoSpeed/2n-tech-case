import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useRootContext from "@/contexts/RootContext/hooks";
const colors = [
  "#00E1FF",
  "#FF00E1",
  "#FF0000",
  "#00FF00",
  "#B0F000",
  "#0000FF",
  "#FFA500",
  "#FFD700",
  "#FF4500",
  "#FF6347",
];
// const chartConfig = {
// Yemek: {
// label: "Yemek",
// color: colors[Math.floor(Math.random() * colors.length)],
// },
// İçki: {
// label: "İçki",
// color: colors[Math.floor(Math.random() * colors.length)],
// },
// } satisfies ChartConfig;

export default function Chart() {
  const root = useRootContext();
  const chartConfig = root.expenseCategories.reduce(
    (acc, category, index) => ({
      ...acc,
      [category.name]: {
        label: category.name,
        color: colors[index],
      },
    }),
    {}
  ) as ChartConfig;
  console.log(chartConfig);
  const expensesByCategory = root.expenses.filter((category) => category);
  console.log(expensesByCategory);

  const chartData = expensesByCategory.map((category) => ({
    category: category.category,
    amount: category.amount,
    fill:
      (category.category && chartConfig[category.category]?.color) || colors[0],
  }));

  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Amount
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total amount for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
