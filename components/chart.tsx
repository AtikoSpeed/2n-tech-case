import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

export default function Chart({
  categoryType,
}: {
  categoryType: "income" | "expense";
}) {
  const root = useRootContext();
  const chartConfig = (
    categoryType === "expense" ? root.expenseCategories : root.incomeCategories
  ).reduce(
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
  const moneyByCategory = (
    categoryType === "expense" ? root.expenses : root.incomes
  )
    .filter((item) => item.category !== undefined)
    .reduce((acc, item) => {
      const category = acc.find((cat) => cat.category === item.category);
      if (category) {
        category.amount += item.amount;
      } else {
        acc.push({
          category: item.category ?? "Kategori Yok",
          amount: item.amount,
        });
      }
      return acc;
    }, [] as { category: string; amount: number }[]);

  const chartData = moneyByCategory.map((category) => ({
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
        <CardTitle>
          {categoryType === "expense" ? "Giderler" : "Gelirler"}
        </CardTitle>
        <CardDescription>Description</CardDescription>
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
                          Toplam{" "}
                          {categoryType === "expense" ? "Gider" : "Gelir"}
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
    </Card>
  );
}
