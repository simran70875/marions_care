import {
    Printer,
    Search,
    Table,
    ChevronRight,
    Pill,
} from "lucide-react";
import React from "react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface ReviewItem {
    id: number;
    daysSinceLastReview: number;
    lastReviewDate: string;
    signedOff: string;
    signedOffBy: string;
    client: string;
    area: string;
    month: string;
    namePrinted: string;
    signatureStatus: "Admin" | "Carer";
    pdfLink: boolean;
}

interface EMARReviewData {
    items: ReviewItem[];
}

const emarReviewData: EMARReviewData = {
    items: [
        { id: 1, daysSinceLastReview: 71, lastReviewDate: "08-09-2025 14:52", signedOff: "08-09-2025 14:52", signedOffBy: "Bhushan Mehra", client: "Nazim Akhtar", area: "Longsight", month: "August 2025", namePrinted: "Bhushan Mehra", signatureStatus: "Admin", pdfLink: true },
        { id: 2, daysSinceLastReview: 49, lastReviewDate: "02-09-2025 11:14:21", signedOff: "02-09-2025 11:14:21", signedOffBy: "Bhushan Mehra", client: "Alan Cope", area: "Longsight", month: "August 2025", namePrinted: "Bhushan Mehra", signatureStatus: "Admin", pdfLink: true },
        { id: 3, daysSinceLastReview: 45, lastReviewDate: "09-09-2025 09:42:38", signedOff: "09-09-2025 09:42:38", signedOffBy: "Bhushan Mehra", client: "CHARLES 'O CONNOR", area: "Wythenshawe", month: "September 2025", namePrinted: "Bhushan Mehra", signatureStatus: "Admin", pdfLink: true },
        { id: 4, daysSinceLastReview: 43, lastReviewDate: "10-09-2025 15:44:28", signedOff: "10-09-2025 15:44:28", signedOffBy: "Bhushan Mehra", client: "Paul Buckley", area: "Chorlton", month: "September 2025", namePrinted: "Bhushan Mehra", signatureStatus: "Admin", pdfLink: true },
        { id: 5, daysSinceLastReview: 42, lastReviewDate: "10-09-2025 15:44:28", signedOff: "10-09-2025 15:44:28", signedOffBy: "Bhushan Mehra", client: "Farooq Baidar", area: "Didsbury", month: "September 2025", namePrinted: "Bhushan Mehra", signatureStatus: "Admin", pdfLink: true },
        { id: 6, daysSinceLastReview: 36, lastReviewDate: "16-09-2025 16:03:46", signedOff: "16-09-2025 16:03:46", signedOffBy: "Office Chorlton", client: "Sylvia Reid", area: "Chorlton", month: "September 2025", namePrinted: "Bhushan Mehra", signatureStatus: "Admin", pdfLink: true },
        { id: 7, daysSinceLastReview: 1, lastReviewDate: "21-10-2025 11:20:44", signedOff: "21-10-2025 11:20:44", signedOffBy: "Bhushan Mehra", client: "Vera Lawrence", area: "Chorlton", month: "October 2025", namePrinted: "Bhushan Mehra", signatureStatus: "Admin", pdfLink: true },
        { id: 8, daysSinceLastReview: 0, lastReviewDate: "22-10-2025 12:59:27", signedOff: "22-10-2025 12:59:27", signedOffBy: "Bhushan Mehra", client: "Tracy Ellen", area: "Didsbury", month: "October 2025", namePrinted: "Bhushan Mehra", signatureStatus: "Admin", pdfLink: true },
    ],
};

// Helper for the signature column icon
const SignaturePill: React.FC<{ status: ReviewItem['signatureStatus'] }> = ({ status }) => {
    const className = status === "Admin" 
        ? "bg-green-500 text-white" 
        : "bg-blue-500 text-white";

    return (
        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full whitespace-nowrap ${className}`}>
            {status}
        </span>
    );
};

// =================================================================
// 3. MAIN COMPONENT
// =================================================================

export default function EMARReviewReport() {
    const tableHeaders = [
        "Days Since Last Review", "Last Review Date", "Signed Off", "Signed Off By", 
        "Client", "Area", "Month", "Name Printed", "Signature", "PDF"
    ];

    return (
        <div>
            <div className="rounded-xl overflow-hidden">
                
                {/* Header */}
                <div className="p-4 md:p-6 bg-white border-b-2 border-purple-200 flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                        EMAR Review Report
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
                    </div>
                </div>
                
                {/* EMAR Review Report Table */}
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
                            {emarReviewData.items.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className={`px-3 py-3 text-sm font-bold whitespace-nowrap ${item.daysSinceLastReview > 30 ? 'text-red-600' : 'text-gray-800'}`}>{item.daysSinceLastReview}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.lastReviewDate}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.signedOff}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.signedOffBy}</td>
                                    <td className="px-3 py-3 text-sm text-gray-800 font-semibold flex items-center whitespace-nowrap">
                                        {item.client}
                                        {/* Example icon next to client name */}
                                        <Pill size={14} className="ml-1 text-purple-600" />
                                    </td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.area}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.month}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.namePrinted}</td>
                                    <td className="px-3 py-3 text-center text-sm">
                                        <SignaturePill status={item.signatureStatus} />
                                    </td>
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
                    <p>Showing 1 to 8 of 8 entries</p>
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