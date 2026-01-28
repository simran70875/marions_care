import {
    Printer,
    Table,
    Edit,
    RefreshCw,
    Pill,
} from "lucide-react";
import React from "react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface HistoryEvent {
    id: number;
    timeDue: string;
    timeCompleted: string;
    clientName: string;
    medication: string;
    medForm: string;
    amountGiven: number;
    status: "Administered" | "Not Administered";
    subStatus: "Fully Administered" | "Family Administered" | "Not Done" | "Refused";
    comments: string;
    medicationType: "Regular" | "PRN";
    postIt: boolean;
    isBluePill?: boolean; // For Pregabalin style icon
}

interface MedicationHistoryData {
    clientName: string;
    events: HistoryEvent[];
}

const medicationHistoryData: MedicationHistoryData = {
    clientName: "Charles 'O CONNOR",
    events: [
        { id: 1, timeDue: "22 Oct Morning", timeCompleted: "07:22", clientName: "Charles 'O CONNOR", medication: "Venlafaxine modified-release capsules", medForm: "Capsule", amountGiven: 1, status: "Administered", subStatus: "Fully Administered", comments: "", medicationType: "Regular", postIt: true },
        { id: 2, timeDue: "22 Oct Morning", timeCompleted: "07:22", clientName: "Charles 'O CONNOR", medication: "Loperamide Hydrochloride", medForm: "Capsule", amountGiven: 2, status: "Administered", subStatus: "Fully Administered", comments: "", medicationType: "Regular", postIt: true },
        { id: 3, timeDue: "22 Oct Morning", timeCompleted: "07:22", clientName: "Charles 'O CONNOR", medication: "Pregabalin", medForm: "Capsule", amountGiven: 2, status: "Administered", subStatus: "Fully Administered", comments: "Taken", medicationType: "Regular", postIt: true, isBluePill: true },
        { id: 4, timeDue: "21 Oct Overnight", timeCompleted: "22:36", clientName: "Charles 'O CONNOR", medication: "Zopiclone", medForm: "Tablet", amountGiven: 1, status: "Administered", subStatus: "Fully Administered", comments: "Taken", medicationType: "Regular", postIt: true },
        { id: 5, timeDue: "21 Oct Morning", timeCompleted: "N/A", clientName: "Charles 'O CONNOR", medication: "Venlafaxine modified-release capsules", medForm: "Capsule", amountGiven: 1, status: "Not Administered", subStatus: "Not Done", comments: "", medicationType: "Regular", postIt: true },
        { id: 6, timeDue: "21 Oct Morning", timeCompleted: "N/A", clientName: "Charles 'O CONNOR", medication: "Pregabalin", medForm: "Capsule", amountGiven: 2, status: "Not Administered", subStatus: "Not Done", comments: "", medicationType: "Regular", postIt: true, isBluePill: true },
        { id: 7, timeDue: "20 Oct Overnight", timeCompleted: "22:35", clientName: "Charles 'O CONNOR", medication: "Loperamide Hydrochloride", medForm: "Capsule", amountGiven: 2, status: "Administered", subStatus: "Fully Administered", comments: "Taken", medicationType: "Regular", postIt: true },
        { id: 8, timeDue: "20 Oct Morning", timeCompleted: "08:09", clientName: "Charles 'O CONNOR", medication: "Zopiclone", medForm: "Tablet", amountGiven: 1, status: "Not Administered", subStatus: "Family Administered", comments: "He wasn't at home", medicationType: "Regular", postIt: true },
        { id: 9, timeDue: "19 Oct Overnight", timeCompleted: "22:29", clientName: "Charles 'O CONNOR", medication: "Venlafaxine modified-release capsules", medForm: "Capsule", amountGiven: 1, status: "Administered", subStatus: "Fully Administered", comments: "Not home", medicationType: "Regular", postIt: true },
        // ... (more data points would be here)
    ],
};

// =================================================================
// 2. HELPER COMPONENTS/FUNCTIONS
// =================================================================

const StatusPill: React.FC<{ status: HistoryEvent['status'] }> = ({ status }) => {
    const isAdministered = status === "Administered";
    const className = isAdministered 
        ? "bg-green-500 text-white" 
        : "bg-red-500 text-white";

    return (
        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full whitespace-nowrap ${className}`}>
            {status}
        </span>
    );
};

const SubStatusPill: React.FC<{ subStatus: HistoryEvent['subStatus'] }> = ({ subStatus }) => {
    let className;
    if (subStatus === "Fully Administered") {
        className = "bg-green-100 text-green-700";
    } else if (subStatus === "Not Done" || subStatus === "Refused") {
        className = "bg-red-100 text-red-700";
    } else {
        className = "bg-yellow-100 text-yellow-700";
    }

    return (
        <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full whitespace-nowrap ${className}`}>
            {subStatus}
        </span>
    );
};

// =================================================================
// 3. MAIN COMPONENT
// =================================================================

export default function MedicationHistory() {
    const tableHeaders = [
        "Time Due", "Time Completed", "Client Name", "Medication", "Medication Form", 
        "Amount Given", "Status", "Sub Status", "Comments", "Medication Type", "Post It", "Edit"
    ];
    
    // Reverse the data to match the screenshot (most recent at top)
    const sortedEvents = [...medicationHistoryData.events];

    return (
        <div>
            <div className="rounded-xl shadow-2xl overflow-hidden">
                
                {/* Header and Controls */}
                <div className="p-4 md:p-6 bg-white border-b-2 border-purple-200 flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                        Medication History - <span className="text-purple-600 ml-1"> {medicationHistoryData.clientName}</span>
                    </h1>
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center">
                        <RefreshCw size={16} className="mr-2" /> Run Report
                    </button>
                </div>

                {/* Date/Search Bar */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex space-x-3 items-center text-sm">
                        <label className="font-medium text-gray-700">Date Range:</label>
                        <input type="date" defaultValue="2025-10-15" className="p-2 border border-gray-300 rounded-lg" />
                        <span className="text-gray-500">-</span>
                        <input type="date" defaultValue="2025-10-22" className="p-2 border border-gray-300 rounded-lg" />
                        
                        <select className="p-2 border border-gray-300 rounded-lg bg-white">
                            <option>All</option>
                            <option>Administered</option>
                            <option>Not Administered</option>
                        </select>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold">
                            Search
                        </button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded-lg font-semibold">
                            Clear
                        </button>
                    </div>
                </div>

                {/* Print/Export Controls */}
                <div className="p-4 flex space-x-4 text-sm font-medium border-b pb-2">
                    <button className="text-gray-600 hover:text-blue-600 flex items-center"><Printer size={16} className="mr-1" /> Print</button>
                    <button className="text-gray-600 hover:text-blue-600">Rows</button>
                    <button className="text-gray-600 hover:text-blue-600">Excel</button>
                    <button className="text-gray-600 hover:text-blue-600">PDF</button>
                    <button className="text-gray-600 hover:text-blue-600 flex items-center"><Table size={16} className="mr-1" /> Column visibility</button>
                </div>
                
                {/* History Table */}
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
                            {sortedEvents.map(event => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 text-xs text-gray-800 whitespace-nowrap">{event.timeDue}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{event.timeCompleted}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{event.clientName}</td>
                                    <td className="px-3 py-2 text-xs text-gray-800 font-medium whitespace-nowrap">
                                        {event.medication}
                                        {event.isBluePill && <span className="text-xs text-blue-600 ml-1"> <Pill size={12} className="inline-block align-middle" /></span>}
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{event.medForm}</td>
                                    <td className="px-3 py-2 text-center text-xs text-gray-600">{event.amountGiven}</td>
                                    <td className="px-3 py-2 text-center text-xs">
                                        <StatusPill status={event.status} />
                                    </td>
                                    <td className="px-3 py-2 text-center text-xs">
                                        <SubStatusPill subStatus={event.subStatus} />
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{event.comments}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{event.medicationType}</td>
                                    <td className="px-3 py-2 text-center text-xs">
                                        {event.postIt && <span className="text-yellow-500 font-extrabold text-lg">•</span>}
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
                    <p>Showing 1 to 45 of 45 entries</p>
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">Previous</button>
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">1</span>
                        <button className="text-gray-400 border border-gray-300 p-1 rounded text-xs" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}