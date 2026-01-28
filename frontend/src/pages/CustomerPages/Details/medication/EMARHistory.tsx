import {
    Printer,
    Search,
    Table,
    ChevronRight,
} from "lucide-react";
import React from "react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface EMARHistoryItem {
    id: number;
    signedOff: string; // Date and Time
    signedOffBy: string;
    month: string;
    namePrinted: string;
    signatureStatus: "Admin" | "Carer";
    comment: string;
}

interface EMARHistoryData {
    clientName: string;
    items: EMARHistoryItem[];
}

const emarHistoryData: EMARHistoryData = {
    clientName: "Charles 'O CONNOR",
    items: [
        { id: 1, signedOff: "09-10-2025 09:42:38", signedOffBy: "Bhushan Mehra", month: "September 2025", namePrinted: "Bhushan Mehra", signatureStatus: "Admin", comment: "" },
    ],
};

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

export default function EMARHistory() {
    const tableHeaders = [
        "Signed-Off", "Signed-Off By", "Month", "Name Printed", "Signature", "Comment", "PDF"
    ];

    const SignaturePill: React.FC<{ status: EMARHistoryItem['signatureStatus'] }> = ({ status }) => {
        const className = status === "Admin" 
            ? "bg-green-500 text-white" 
            : "bg-blue-500 text-white";

        return (
            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full whitespace-nowrap ${className}`}>
                {status}
            </span>
        );
    };

    return (
        <div>
            <div className="rounded-xl overflow-hidden">
                
                {/* Header */}
                <div className="p-4 md:p-6 bg-white border-b-2 border-purple-200 flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                        EMAR History - <span className="text-purple-600 ml-1"> {emarHistoryData.clientName}</span>
                    </h1>
                </div>

                {/* Controls and Search */}
                <div className="p-4 flex justify-between items-center">
                    <div className="flex space-x-3 text-sm">
                        <button className="border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-100">Rows</button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium">
                            <Printer size={16} className="mr-1" /> Print
                        </button>
                        <button className="border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-100">Excel</button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium">
                            <Table size={16} className="mr-1" /> Column visibility
                        </button>
                    </div>
                    <div className="relative flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-8 p-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold">
                            Search
                        </button>
                    </div>
                </div>
                
                {/* EMAR History Table */}
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
                            {emarHistoryData.items.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">{item.signedOff}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.signedOffBy}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.month}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.namePrinted}</td>
                                    <td className="px-3 py-3 text-center text-sm">
                                        <SignaturePill status={item.signatureStatus} />
                                    </td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.comment}</td>
                                    <td className="px-3 py-3 text-center text-sm">
                                        <button className="text-red-600 hover:text-red-800" title="Download PDF">
                                            PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination/Summary */}
                 <div className="p-4 border-t flex justify-between items-center text-sm text-gray-600">
                    <p>Showing 1 to 1 of 1 entries</p>
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-400 border border-gray-300 p-1 rounded text-xs" disabled>Previous</button>
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">1</span>
                        <button className="text-gray-400 border border-gray-300 p-1 rounded text-xs" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}