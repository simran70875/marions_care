import {
    Search,
    ChevronRight,
} from "lucide-react";
import React, { useState } from "react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface DocumentItem {
    id: number;
    client: string;
    area: string;
    uploadedDate: string;
    uploadedTime: string;
    tags: string;
    name: string;
    fileSizeMB: number;
}

const documentListData: DocumentItem[] = [
    // Data closely mirroring the screenshot's visible rows
    { id: 1, client: "Charles 'O CONNOR", area: "Wythenshawe", uploadedDate: "15 Oct 2025", uploadedTime: "16:56", tags: "Support", name: "Support Plan (View)", fileSizeMB: 0.17 },
    { id: 2, client: "Daniel Castle", area: "Wythenshawe", uploadedDate: "17 Oct 2025", uploadedTime: "15:07", tags: "Medication", name: "Dose increase (View)", fileSizeMB: 0.49 },
    { id: 3, client: "Parveen Khan", area: "Chorlton", uploadedDate: "17 Oct 2025", uploadedTime: "12:38", tags: "Communication", name: "Decreased referral (View)", fileSizeMB: 9.20 },
    { id: 4, client: "Bana Bagum Hussain", area: "Longsight", uploadedDate: "16 Oct 2025", uploadedTime: "08:56", tags: "Referral", name: "Referral email (View)", fileSizeMB: 2.22 },
    { id: 5, client: "Vicky Hayes", area: "Wythenshawe", uploadedDate: "14 Oct 2025", uploadedTime: "12:44", tags: "Medication", name: "Medication page 3 of 7 (View)", fileSizeMB: 0.22 },
    { id: 6, client: "Ian McHugh", area: "Chorlton", uploadedDate: "13 Oct 2025", uploadedTime: "13:02", tags: "Carer", name: "Carer advice facts (View)", fileSizeMB: 0.98 },
    { id: 7, client: "Farooq Abidun", area: "Chorlton", uploadedDate: "06 Oct 2025", uploadedTime: "14:04", tags: "SALT", name: "SALT Letter confirmation (View)", fileSizeMB: 1.37 },
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

export default function DocumentListReportWithTabs() {
    const [activeTab, setActiveTab] = useState<'client' | 'carer'>('client');

    const tableHeaders = [
        "Client", "Area", "Uploaded Date", "Uploaded Time", "Tags", "Name", "File Size(MB)"
    ];
    
    // Simulate data based on the active tab (currently only using client data)
    const currentData = activeTab === 'client' ? documentListData : []; 
    const totalEntries = 298; // Based on screenshot footer

    const TabButton: React.FC<{ tab: 'client' | 'carer', label: string }> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg ${
                activeTab === tab 
                    ? 'bg-purple-600 text-white shadow-inner' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div>
            
         

            <div className="mt-4 overflow-hidden">
                
                {/* Report Title & Tabs */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                            Document List
                        </h1>
                        <div className="flex space-x-2">
                            <TabButton tab="client" label="Client Documents" />
                            <TabButton tab="carer" label="Carer Documents" />
                        </div>
                    </div>
                </div>

                {/* Print/Export Controls and Search */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex space-x-1 text-sm font-medium">
                        {/* Matching all the buttons from the screenshot */}
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold">Rows</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold">Copy</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold">Excel</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold">PDF</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold">Print</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold">Area Search</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold">Tag Search</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold">Column visibility</button>
                    </div>
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-8 p-1 border border-gray-300 rounded-lg text-sm"
                        />
                        <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
                
                {/* Document List Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            {/* Search Filters Row */}
                            <tr>
                                {["Search Client", "Search Area", "Search Uploaded Date", "Search Uploaded Time", "Search Tags", "Search Name", "File Size(MB)"].map((placeholder) => (
                                    <th key={placeholder} className="px-3 py-1 bg-white border-b border-gray-200">
                                        <input
                                            type="text"
                                            placeholder={placeholder}
                                            className="w-full p-1 border border-gray-300 rounded-md text-xs text-gray-700"
                                        />
                                    </th>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-300">
                                {/* Main Headers */}
                                {tableHeaders.map((header) => (
                                    <th key={`header-${header}`} 
                                        className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap cursor-pointer hover:bg-gray-100"
                                        style={{ minWidth: header.includes('Uploaded') || header.includes('Client') || header.includes('Name') ? '150px' : 'auto' }}
                                    >
                                        <div className="flex items-center">
                                            {header}
                                            <ChevronRight size={12} className="ml-1 rotate-90 text-gray-400" />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentData.length > 0 ? (
                                currentData.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{item.client}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.area}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.uploadedDate}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.uploadedTime}</td>
                                        <td className="px-3 py-3 text-sm text-blue-600 whitespace-nowrap">{item.tags}</td>
                                        <td className="px-3 py-3 text-sm text-purple-600 hover:underline cursor-pointer whitespace-nowrap">{item.name}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 text-right whitespace-nowrap">{item.fileSizeMB.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-3 py-8 text-center text-sm text-gray-500">
                                        No data available for this tab.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination/Summary */}
                 <div className="p-4 border-t flex justify-between items-center text-sm text-gray-600">
                    <p>Showing 1 to {currentData.length} of {totalEntries} entries</p>
                    <div className="flex items-center space-x-1">
                        <button className="text-gray-400 border border-gray-300 p-1 rounded text-xs" disabled>Previous</button>
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">1</span>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">2</button>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">3</button>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">4</button>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">5</button>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">6</button>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}