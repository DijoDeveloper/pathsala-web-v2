import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type DonutPieChartProps = {
    title?: string;
    labels?: string[];
    series?: number[];
};

export default function DonutPieChart({
    title = "",
    labels = ["Desktop", "Mobile", "Tablet"],
    series = [45, 35, 20],
}: DonutPieChartProps) {
    const options: ApexOptions = {
        chart: {
            type: "donut",
            fontFamily: "Outfit, sans-serif",
            toolbar: { show: false },
        },
        labels,
        legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "14px",
            itemMargin: { horizontal: 12, vertical: 4 },
        },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        colors: ["#3B5AFE", "#6E8BFF", "#DDE7FF"],
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                },
                expandOnClick: false,
            },
        },
        tooltip: {
            y: {
                formatter: (val) => `${val}`,
            },
        },
    };

    return (
        <div className="overflow-hidden h-full rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h3>
            <div className="mx-auto max-w-full p-2">
                <Chart options={options} series={series} type="donut" height={300} />
            </div>
        </div>
    );
}
