import {
    Printer,
    Search,
    Table,
    Edit,
} from "lucide-react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface MandatoryMedItem {
    id: number;
    timeDue: string;
    clientName: string;
    area: string;
    medication: string;
    dose: string;
    timeEvent: string; // Time the event was recorded/missed
    skippedBy: string;
    skipReason: string;
    skipComment: string;
    postIt: boolean;
    rowColor: "white" | "yellow" | "pink" | "red" | "orange" | "green";
}

interface MandatoryMedData {
    items: MandatoryMedItem[];
}

const mandatoryMedData: MandatoryMedData = {
    items: [
        { id: 1, timeDue: "22 Oct", clientName: "Eva Karkeo", area: "Longsight", medication: "Zopiclone", dose: "7.5 mg", timeEvent: "22 Oct 2025 11:10:05", skippedBy: "Tobilope Okesan Oloibidan Anuara", skipReason: "Task already completed", skipComment: "Done", postIt: false, rowColor: "white" },
        { id: 2, timeDue: "22 Oct", clientName: "Silvia Reid", area: "Chorlton", medication: "Loperamide Hydrochloride", dose: "2 mg", timeEvent: "22 Oct 2025 11:15:36", skippedBy: "Eva Karkeo", skipReason: "Task already completed", skipComment: "Done", postIt: false, rowColor: "white" },
        { id: 3, timeDue: "21 Oct", clientName: "Sabine Eghrida", area: "Chorlton", medication: "Loperamide Hydrochloride", dose: "2 mg", timeEvent: "21 Oct 2025 18:28:09", skippedBy: "Nadesha Khanam", skipReason: "Task already completed", skipComment: "Done", postIt: true, rowColor: "yellow" },
        { id: 4, timeDue: "21 Oct", clientName: "Brian Kevin Cantalan", area: "Wythenshawe", medication: "Zopiclone", dose: "7.5 mg", timeEvent: "21 Oct 2025 18:32:09", skippedBy: "Tobilope Okesan Oloibidan Anuara", skipReason: "Task already completed", skipComment: "Done", postIt: false, rowColor: "yellow" },
        { id: 5, timeDue: "21 Oct", clientName: "Clifford Manners", area: "Chorlton", medication: "Loperamide Hydrochloride", dose: "2 mg", timeEvent: "21 Oct 2025 18:35:53", skippedBy: "Ahmed Fraz", skipReason: "Left for Next Carer", skipComment: "", postIt: true, rowColor: "red" },
        { id: 6, timeDue: "21 Oct", clientName: "May Cannon", area: "Wythenshawe", medication: "Loperamide Hydrochloride", dose: "2 mg", timeEvent: "21 Oct 2025 17:15:08", skippedBy: "Tobilope Okesan Oloibidan Anuara", skipReason: "Other", skipComment: "Letter on", postIt: false, rowColor: "pink" },
        { id: 7, timeDue: "20 Oct", clientName: "Eva Karkeo", area: "Longsight", medication: "Zopiclone", dose: "7.5 mg", timeEvent: "20 Oct 2025 11:13:28", skippedBy: "Bhushan Mehra", skipReason: "Task already completed", skipComment: "Done", postIt: false, rowColor: "white" },
        { id: 8, timeDue: "19 Oct", clientName: "Hilta Wilkinson", area: "Chorlton", medication: "Loperamide Hydrochloride", dose: "2 mg", timeEvent: "19 Oct 2025 17:19:00", skippedBy: "Nadesha Khanam", skipReason: "Task already completed", skipComment: "Done", postIt: true, rowColor: "orange" },
    ],
};

// Helper to determine row color class
const getRowColorClass = (color: MandatoryMedItem['rowColor']) => {
    switch (color) {
        case "yellow": return "bg-yellow-100 hover:bg-yellow-200";
        case "pink": return "bg-pink-100 hover:bg-pink-200";
        case "red": return "bg-red-100 hover:bg-red-200";
        case "orange": return "bg-orange-100 hover:bg-orange-200";
        case "green": return "bg-green-100 hover:bg-green-200";
        case "white":
        default: return "bg-white hover:bg-gray-50";
    }
};

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

export default function MandatoryMedicationReport() {
    const tableHeaders = [
        "Time Due", "Client Name", "Area", "Medication", "Dose (Event)", 
        "Time Skipped", "Skipped By", "Skip Reason", "Skip Comment", "Post It", "Edit"
    ];

    return (
        <div>
            <div className="bg-white rounded-xl overflow-hidden">
                
                {/* Header */}
                <div className="p-4 md:p-6 bg-white border-b-2 border-purple-200">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                        Mandatory Medication Report
                    </h1>
                </div>

                {/* Filters and Search Bar */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex space-x-3 items-center text-sm">
                        <select className="p-2 border border-gray-300 rounded-lg bg-white">
                            <option>All Area</option>
                            <option>Longsight</option>
                            <option>Chorlton</option>
                        </select>
                        <label className="font-medium text-gray-700">Date:</label>
                        <input type="date" defaultValue="2025-10-15" className="p-2 border border-gray-300 rounded-lg" />
                        <span className="text-gray-500">-</span>
                        <input type="date" defaultValue="2025-10-22" className="p-2 border border-gray-300 rounded-lg" />
                        
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold">
                            Search
                        </button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded-lg font-semibold">
                            Clear
                        </button>
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

                {/* Print/Export Controls */}
                <div className="p-4 flex space-x-4 text-sm font-medium border-b pb-2">
                    <button className="text-gray-600 hover:text-blue-600">Rows</button>
                    <button className="text-gray-600 hover:text-blue-600 flex items-center"><Printer size={16} className="mr-1" /> Print</button>
                    <button className="text-gray-600 hover:text-blue-600">Excel</button>
                    <button className="text-gray-600 hover:text-blue-600 flex items-center"><Table size={16} className="mr-1" /> Column visibility</button>
                </div>
                
                {/* Mandatory Medication Report Table */}
                <div className="overflow-x-auto border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {tableHeaders.map(header => (
                                    <th key={header} className="px-3 py-3 text-left text-[10px] font-semibold text-gray-600 uppercase whitespace-nowrap">
                                        {header.replace(/ /g, "\u00A0")}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mandatoryMedData.items.map(item => (
                                <tr key={item.id} className={getRowColorClass(item.rowColor)}>
                                    <td className="px-3 py-2 text-xs text-gray-800 whitespace-nowrap">{item.timeDue}</td>
                                    <td className="px-3 py-2 text-xs text-gray-800 font-medium whitespace-nowrap">{item.clientName}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{item.area}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{item.medication}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{item.dose}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{item.timeEvent}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{item.skippedBy}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{item.skipReason}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{item.skipComment}</td>
                                    <td className="px-3 py-2 text-center text-xs">
                                        {item.postIt && <span className="text-yellow-500 font-extrabold text-lg">•</span>}
                                    </td>
                                    <td className="px-3 py-2 text-center text-xs">
                                        <button className="text-pink-600 hover:text-pink-800" title="Edit Event">
                                            <Edit size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination/Summary */}
                 <div className="p-4 border-t flex justify-between items-center text-sm text-gray-600">
                    <p>Showing 1 to 8 of 329 entries</p>
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">Previous</button>
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">1</span>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">2</button>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">3</button>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">4</button>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}