import Chart from "@/components/chart";

export default function Home() {
  return (
    <div className="inline">
      <Chart categoryType="income" />
      <Chart categoryType="expense" />
    </div>
  );
}
