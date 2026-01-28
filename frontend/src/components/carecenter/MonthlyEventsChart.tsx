import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function MonthlyEventsChart() {
  const data = [20, 25, 18, 40, 35, 50, 45, 60, 70, 80, 65, 75]; // dummy events

  const options: ApexOptions = {
    colors: ["#4f46e5"],
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: "40%", borderRadius: 5 } },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (val) => `${val} events` } },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Monthly Events Completed</h3>
      <Chart options={options} series={[{ name: "Events", data }]} type="bar" height={250} />
    </div>
  );
}
