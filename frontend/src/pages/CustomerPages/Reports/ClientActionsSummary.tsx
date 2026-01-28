import {
    Search,
    ChevronRight,
    Copy,
    FileText,
    Printer,
    Table,
    CheckSquare,
} from "lucide-react";
// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface ClientActionItem {
    id: number;
    name: string;
    tags: string;
    statusChange: string;
    actionComment: string;
    medicationSubmitted: boolean;
}

interface ClientActionsData {
    items: ClientActionItem[];
}

const clientActionsData: ClientActionsData = {
    items: [
        { id: 101, name: "Alice Smith", tags: "Priority, Review", statusChange: "Care Plan Update", actionComment: "Updated nutritional notes required.", medicationSubmitted: true },
        { id: 102, name: "Bob Johnson", tags: "High Risk", statusChange: "Medication Review Due", actionComment: "GP contacted, awaiting new script.", medicationSubmitted: false },
        { id: 103, name: "Charlie Brown", tags: "None", statusChange: "Initial Assessment", actionComment: "Pending first home visit by manager.", medicationSubmitted: true },
        { id: 104, name: "Dana White", tags: "Urgent", statusChange: "Safeguarding Alert", actionComment: "Incident reported, actions logged.", medicationSubmitted: false },
    ],
};

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

export default function ClientActionsSummary() {
    const tableHeaders = [
        "No.", "Name", "Tags", "Status Change", "Action Comment", "Has the client submitted all medical documentation"
    ];

    return (
        <div>
            
    

            <div className="mt-4 overflow-hidden">
                
                {/* Report Title & Filters */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                            Clients Actions V1
                        </h1>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                            Clients Actions V2
                        </button>
                    </div>

                    <div className="flex space-x-4 items-center">
                        <label className="text-sm font-medium text-gray-700">Select State</label>
                        <select defaultValue="Active" className="p-2 border border-gray-300 rounded-lg text-sm bg-white w-32">
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Review</option>
                        </select>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold text-sm">
                            Search
                        </button>
                    </div>
                </div>

                {/* Print/Export Controls */}
                <div className="p-4 flex justify-between items-center">
                    <div className="flex space-x-3 text-sm font-medium">
                        <button className="text-gray-600 hover:text-blue-600 flex items-center"><Copy size={16} className="mr-1" /> Copy</button>
                        <button className="text-gray-600 hover:text-blue-600">Export Excel</button>
                        <button className="text-gray-600 hover:text-blue-600">Export CSV</button>
                        <button className="text-gray-600 hover:text-blue-600">Export PDF</button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center"><Printer size={16} className="mr-1" /> Print</button>
                        <button className="text-gray-600 hover:text-blue-600">Status Q</button>
                        <button className="text-gray-600 hover:text-blue-600">Area Search</button>
                        <button className="text-gray-600 hover:text-blue-600">Tag Search</button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center"><Table size={16} className="mr-1" /> Column visibility</button>
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
                
                {/* Client Actions Table */}
                <div className="overflow-x-auto border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="border-b border-gray-300">
                                {/* Main Headers */}
                                {tableHeaders.map((header, index) => (
                                    <th key={`main-header-${index}`} 
                                        className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap cursor-pointer hover:bg-gray-100"
                                        style={{ minWidth: index < 3 ? '120px' : '200px' }} // Set minimum width for better layout
                                    >
                                        <div className="flex items-center">
                                            {header}
                                            {header !== "Has the client submitted all medical documentation" && <ChevronRight size={12} className="ml-1 rotate-90 text-gray-400" />}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            {/* Search Filters Row */}
                            <tr>
                                {["Search No.", "Search Name", "Search Tags", "Search Status Change", "Search Action Comment", "Has the client submitted all medical documentation"].map((placeholder, index) => (
                                    <th key={`search-filter-${index}`} className="px-3 py-1 bg-white border-b border-gray-200">
                                        <input
                                            type="text"
                                            placeholder={placeholder}
                                            className="w-full p-1 border border-gray-300 rounded-md text-xs text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clientActionsData.items.length > 0 ? (
                                clientActionsData.items.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{item.id}</td>
                                        <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">{item.name}</td>
                                        <td className="px-3 py-3 text-sm text-blue-600 whitespace-nowrap">{item.tags}</td>
                                        <td className="px-3 py-3 text-sm font-medium text-red-600 whitespace-nowrap">{item.statusChange}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600">{item.actionComment}</td>
                                        <td className="px-3 py-3 text-center text-sm">
                                            {item.medicationSubmitted ? (
                                                <CheckSquare size={18} className="text-green-600 mx-auto"/>
                                            ) : (
                                                <FileText size={18} className="text-red-600 mx-auto"/>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-3 py-8 text-center text-sm text-gray-500">
                                        No data available in table
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination/Summary */}
                 <div className="p-4 border-t flex justify-between items-center text-sm text-gray-600">
                    <p>Showing 1 to {clientActionsData.items.length} of {clientActionsData.items.length} entries</p>
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