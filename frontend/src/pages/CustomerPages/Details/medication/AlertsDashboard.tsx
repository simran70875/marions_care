import React from "react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface ChartSegment {
    label: string;
    value: number;
    color: string;
}

interface ChartData {
    title: string;
    segments: ChartSegment[];
}

const medicationStatusData: ChartData = {
    title: "Overall Medication Statuses",
    segments: [
        { label: "Administered", value: 35, color: "bg-green-600" },
        { label: "Not Administered", value: 10, color: "bg-red-600" },
        { label: "Partially Administered", value: 2, color: "bg-orange-400" },
        { label: "Cancelled", value: 5, color: "bg-gray-400" },
        { label: "Fully Missed", value: 1, color: "bg-red-800" },
        { label: "Expired", value: 3, color: "bg-blue-600" },
        { label: "Due", value: 40, color: "bg-teal-600" },
        { label: "Missed", value: 4, color: "bg-yellow-600" },
    ],
};

const taskStatusData: ChartData = {
    title: "Overall Task Statuses",
    segments: [
        { label: "Completed", value: 40, color: "bg-green-600" },
        { label: "Partially Completed", value: 15, color: "bg-yellow-500" },
        { label: "Not Completed", value: 5, color: "bg-red-600" },
        { label: "Cancelled", value: 10, color: "bg-gray-400" },
        { label: "Missed", value: 10, color: "bg-orange-600" },
        { label: "Due", value: 20, color: "bg-blue-600" },
    ],
};

// =================================================================
// 2. HELPER COMPONENTS
// =================================================================

/**
 * Renders a simulated Donut Chart using Tailwind CSS based on segment values.
 * NOTE: For a real app, this should be replaced with a proper charting library (e.g., Chart.js, Recharts).
 */
const DonutChart: React.FC<{ data: ChartData }> = ({ data }) => {
    const total = data.segments.reduce((sum, segment) => sum + segment.value, 0);

    // Calculate percentage and create a gradient string for the conical gradient trick
    let currentPercentage = 0;
    const gradientStops = data.segments.map(segment => {
        const start = currentPercentage;
        currentPercentage += (segment.value / total) * 100;
        const end = currentPercentage;

        // Tailwind utility classes for colors need to be explicitly used in the component code
        const colorMap: { [key: string]: string } = {
            "bg-green-600": "#059669",
            "bg-red-600": "#dc2626",
            "bg-orange-400": "#fb923c",
            "bg-gray-400": "#9ca3af",
            "bg-red-800": "#991b1b",
            "bg-blue-600": "#2563eb",
            "bg-teal-600": "#0d9488",
            "bg-yellow-600": "#d97706",
            "bg-yellow-500": "#eab308",
            "bg-orange-600": "#ea580c",
        };
        const color = colorMap[segment.color] || 'transparent';

        return `${color} ${start}% ${end}%`;
    }).join(', ');

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{data.title}</h2>
            <div className="flex-1 flex justify-center items-center p-4">
                <div
                    className="relative w-48 h-48 rounded-full"
                    style={{
                        background: `conic-gradient(${gradientStops})`,
                    }}
                >
                    <div className="absolute inset-0 m-auto w-32 h-32 bg-white rounded-full shadow-inner"></div>
                </div>
            </div>
            <div className="mt-4 p-2 grid grid-cols-2 gap-2 text-sm">
                {data.segments.map((segment, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${segment.color}`}></span>
                        <span className="text-gray-700 whitespace-nowrap">{segment.label} ({segment.value})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// =================================================================
// 3. MAIN COMPONENT
// =================================================================

export default function AlertsDashboard() {

    return (
        <div>
            <div className="rounded-xl overflow-hidden">

                {/* Header */}
                <div className="p-4 md:p-6 bg-blue-800 flex justify-between items-center text-white">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Medication & Task Overview
                    </h1>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-semibold">
                        Summary Reports
                    </button>
                </div>

                {/* Filters and Search Bar */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex space-x-4 items-center w-1/3">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search Client"
                                className="pl-4 pr-10 p-2 border border-gray-300 rounded-lg text-sm w-full"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2 items-center text-sm w-1/3 justify-end">
                        <label className="font-medium text-gray-700 whitespace-nowrap">Time Period:</label>
                        <input type="date" defaultValue="2025-10-22" className="p-2 border border-gray-300 rounded-lg" />
                        <span className="text-gray-500">to</span>
                        <input type="date" defaultValue="2025-10-22" className="p-2 border border-gray-300 rounded-lg" />

                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold">
                            Search
                        </button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded-lg font-semibold whitespace-nowrap">
                            All Clients
                        </button>
                    </div>
                </div>

                {/* Dashboard Content (Charts) */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Medication Status Chart */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <DonutChart data={medicationStatusData} />
                    </div>

                    {/* Task Status Chart */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <DonutChart data={taskStatusData} />
                    </div>

                </div>

            </div>
        </div>
    );
}