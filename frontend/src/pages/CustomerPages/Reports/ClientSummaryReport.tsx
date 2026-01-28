import {
    Search,
    ChevronRight,
    Copy,
    Table,
} from "lucide-react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface ClientSummaryItem {
    clientNo: number;
    title: string;
    fullName: string;
    address: string;
    town: string;
    county: string;
    jobType: string;
    phone: string;
    dob: string;
    age: number;
    gender: "M" | "F";
}

interface ClientSummaryData {
    items: ClientSummaryItem[];
}

const clientSummaryData: ClientSummaryData = {
    items: [
        { clientNo: 230691, title: "Mr", fullName: "Charles 'O CONNOR", address: "Longmire Centre, 181 Langley Lane", town: "Wythenshaw", county: "Manchester", jobType: "MCC CIG", phone: "07714711416", dob: "27-04-1967", age: 58, gender: "M" },
        { clientNo: 230688, title: "Mr", fullName: "Adam", address: "Flat 51 Elmwood Park, M32 0HA", town: "Manchester", county: "Greater Manchester", jobType: "MCC SPOT", phone: "07845623101", dob: "14-02-1987", age: 38, gender: "M" },
        { clientNo: 230153, title: "Mr", fullName: "Allan", address: "808 Claremont Road, M14 5QH", town: "Manchester", county: "Greater Manchester", jobType: "MCC SPOT", phone: "07845100067", dob: "31-03-1967", age: 70, gender: "M" },
        { clientNo: 230441, title: "Mrs", fullName: "Ann Shirley", address: "50-52 Whiston Grove, M22 5TH", town: "Wythenshawe", county: "Manchester", jobType: "MCC SPOT", phone: "07845100067", dob: "26-03-1963", age: 62, gender: "F" },
        { clientNo: 230375, title: "Mr", fullName: "Arun Aroun", address: "37 Manor Road, M22 5TH", town: "Wythenshawe", county: "Manchester", jobType: "MCC SPOT", phone: "07845100067", dob: "10-03-1968", age: 57, gender: "M" },
        { clientNo: 230644, title: "Mrs", fullName: "Ashia Atanga", address: "81 Crossacres Lane, M22 5BY", town: "Wythenshawe", county: "Manchester", jobType: "MCC SPOT", phone: "07845100067", dob: "10-03-1968", age: 60, gender: "F" },
        { clientNo: 230699, title: "Miss", fullName: "Bana Baguira", address: "23 Radstock Street", town: "Wythenshawe", county: "Manchester", jobType: "MCC CIG", phone: "07845100067", dob: "01-12-1956", age: 70, gender: "F" },
        { clientNo: 230704, title: "Mr", fullName: "Barry", address: "16 Nuffield Road, Wythenshawe", town: "Wythenshawe", county: "Manchester", jobType: "MCC SPOT", phone: "07845100067", dob: "01-12-1956", age: 75, gender: "M" },
    ],
};

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

export default function ClientSummaryReport() {
    const tableHeaders = [
        "No.", "Title", "Name", "Address", "Town", "County", 
        "Job Type", "Phone", "DOB", "Age", "Gender"
    ];

    return (
        <div>
            
           
            <div className="mt-4 overflow-hidden">
                
                {/* Report Title & Filters */}
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                        Client Report
                    </h1>

                    <div className="flex space-x-4 items-center mb-4">
                        <select className="p-2 border border-gray-300 rounded-lg text-sm bg-white">
                            <option>DOB Before</option>
                        </select>
                        <input type="date" className="p-2 border border-gray-300 rounded-lg text-sm" />
                        <select className="p-2 border border-gray-300 rounded-lg text-sm bg-white">
                            <option>DOB After</option>
                        </select>
                        <input type="date" className="p-2 border border-gray-300 rounded-lg text-sm" />
                        <select className="p-2 border border-gray-300 rounded-lg text-sm bg-white">
                            <option>DOB</option>
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
                        <button className="text-gray-600 hover:text-blue-600">Detailed Report (20th Hour)</button>
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
                
                {/* Client Summary Table */}
                <div className="overflow-x-auto border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            {/* Search Filters Row */}
                            <tr>
                                {["Search No.", "Search First Name", "Search Surname", "Search Address", "Search Town", "Search County", "Search Job Type", "Search Phone", "Search DOB", "Search Age", "Search Gender"].map((placeholder) => (
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
                            {clientSummaryData.items.length > 0 ? (
                                clientSummaryData.items.map(item => (
                                    <tr key={item.clientNo} className="hover:bg-gray-50">
                                        <td className="px-3 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{item.clientNo}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.title}</td>
                                        <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">{item.fullName}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.address}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.town}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.county}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.jobType}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.phone}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.dob}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.age}</td>
                                        <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.gender}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="px-3 py-8 text-center text-sm text-gray-500">
                                        No data available in table
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination/Summary */}
                 <div className="p-4 border-t flex justify-between items-center text-sm text-gray-600">
                    <p>Showing 1 to {clientSummaryData.items.length} of {clientSummaryData.items.length} entries</p>
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-400 border border-gray-300 p-1 rounded text-xs" disabled>Previous</button>
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">1</span>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">2</button>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">3</button>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}