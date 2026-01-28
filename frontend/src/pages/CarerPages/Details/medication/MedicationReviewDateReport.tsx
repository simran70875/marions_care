import {
    Printer,
    Search,
    Table,
    ChevronRight,
} from "lucide-react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface ReviewDateItem {
    id: number;
    reviewDate: string;
    client: string;
    medication: string;
    dose: string;
    totalDose: number;
    route: string;
    form: string;
    number: number;
    schedule: string;
    times: string;
    startDate: string;
    finishDate: string;
}

interface MedicationReviewData {
    items: ReviewDateItem[];
}

const medicationReviewData: MedicationReviewData = {
    items: [
        { id: 1, reviewDate: "20-11-2025", client: "Charles 'O CONNOR", medication: "Venlafaxine modified-release capsules", dose: "75 mg", totalDose: 1, route: "Orally", form: "Capsule", number: 1, schedule: "Morning", times: "08:00", startDate: "25-09-2025", finishDate: "01-12-2026" },
        { id: 2, reviewDate: "25-11-2025", client: "Alan Cope", medication: "Loperamide Hydrochloride", dose: "2 mg", totalDose: 2, route: "Orally", form: "Capsule", number: 2, schedule: "Morning, Overnight", times: "08:00, 22:00", startDate: "01-10-2025", finishDate: "" },
        { id: 3, reviewDate: "05-12-2025", client: "Nazim Akhtar", medication: "Pregabalin", dose: "150 mg", totalDose: 2, route: "Orally", form: "Capsule", number: 2, schedule: "Morning, Evening", times: "09:00, 18:00", startDate: "15-09-2025", finishDate: "N/A" },
        { id: 4, reviewDate: "10-12-2025", client: "Farooq Baidar", medication: "Paracetamol tablet", dose: "500 mg", totalDose: 2, route: "Orally", form: "Tablet", number: 4, schedule: "PRN", times: "Any", startDate: "01-11-2025", finishDate: "01-05-2026" },
        // ... (more data points)
    ],
};

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

export default function MedicationReviewDateReport() {
    const tableHeaders = [
        "Review Date", "Client", "Medication", "Dose", "Total Dose",
        "Route", "Form", "Number", "Schedule", "Times", "Start Date", "Finish Date"
    ];

    return (
        <div>
            <div className="rounded-xl overflow-hidden">

                {/* Header */}
                <div className="p-4 md:p-6 bg-white border-b-2 border-blue-200 flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                        Review Medication Report
                    </h1>
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded-lg text-sm font-semibold">
                        Company Medication History
                    </button>
                </div>

                {/* Date Filters and Search Bar */}
                <div className="p-4 border-b border-gray-200 flex justify-start items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <input type="date" defaultValue="2025-10-22" className="p-2 border border-gray-300 rounded-lg text-sm" />
                        <span className="text-gray-500">to</span>
                        <input type="date" defaultValue="2025-10-29" className="p-2 border border-gray-300 rounded-lg text-sm" />
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold text-sm">
                        Search
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded-lg font-semibold text-sm">
                        Clear
                    </button>
                </div>

                {/* Print/Export Controls and Secondary Filters */}
                <div className="p-4 flex justify-between items-center">
                    <div className="flex space-x-3 text-sm font-medium">
                        <button className="border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-100">Rows</button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center"><Printer size={16} className="mr-1" /> Print</button>
                        <button className="border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-100">Excel</button>
                        <button className="border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-100">Area Search</button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center"><Table size={16} className="mr-1" /> Column visibility</button>
                        <button className="border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-100">Clear Search</button>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-8 p-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Medication Review Report Table */}
                <div className="overflow-x-auto border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {/* Headers with Sorting Icons */}
                                {tableHeaders.map(header => (
                                    <th key={header} className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center">
                                            {header}
                                            <ChevronRight size={12} className="ml-1 rotate-90 text-gray-400" />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {medicationReviewData.items.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-3 text-sm font-semibold text-gray-800 whitespace-nowrap">{item.reviewDate}</td>
                                    <td className="px-3 py-3 text-sm text-gray-800 font-medium whitespace-nowrap">{item.client}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.medication}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.dose}</td>
                                    <td className="px-3 py-3 text-center text-sm text-gray-600">{item.totalDose}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.route}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.form}</td>
                                    <td className="px-3 py-3 text-center text-sm text-gray-600">{item.number}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.schedule}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.times}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.startDate}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.finishDate || 'N/A'}</td>
                                </tr>
                            ))}
                            {/* Empty state row matching the screenshot if items were empty */}
                            {medicationReviewData.items.length === 0 && (
                                <tr>
                                    <td colSpan={12} className="px-3 py-8 text-center text-sm text-gray-500">
                                        No data available in table
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination/Summary */}
                <div className="p-4 border-t flex justify-between items-center text-sm text-gray-600">
                    <p>Showing 1 to {medicationReviewData.items.length} of {medicationReviewData.items.length} entries</p>
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-400 border border-gray-300 p-1 rounded text-xs" disabled>Previous</button>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">1</span>
                        <button className="text-gray-400 border border-gray-300 p-1 rounded text-xs" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}