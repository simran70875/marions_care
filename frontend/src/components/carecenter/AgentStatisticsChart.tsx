import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function AgentStatisticsChart() {
  const carers = ["Allan", "Adrian", "Favour", "William"];
  const series = carers.map((c) => ({
    name: c,
    data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50)),
  }));

  const options: ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    stroke: { curve: "smooth" },
    legend: { position: "top" },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Carer Statistics</h3>
      <p className="text-sm text-gray-500">Monthly performance by carer</p>
      <Chart options={options} series={series} type="line" height={280} />
    </div>
  );
}
