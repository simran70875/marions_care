import {
    Search,
    ChevronRight,
    Calendar,
    CheckSquare,
    FileText,
    Printer,
    Table,
} from "lucide-react";
import React from "react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface ClientScheduleItem {
    no: number;
    firstName: string;
    surname: string;
    address: string;
    town: string;
    county: string;
    postCode: string;
    area: string;
    phone: string;
    printChecked: boolean;
}

interface ClientScheduleData {
    items: ClientScheduleItem[];
}

const scheduleData: ClientScheduleData = {
    items: [
        { no: 230704, firstName: "Russell", surname: "Wayne", address: "5 Bankside Court", town: "Manchester", county: "County", postCode: "M12 9GA", area: "Didsbury", phone: "07955159313", printChecked: true },
        { no: 230655, firstName: "Graham", surname: "Kelly", address: "36 Orton Road", town: "Manchester", county: "Lancashire", postCode: "M23 8LJ", area: "Wythenshawe", phone: "07955754988", printChecked: true },
        { no: 72, firstName: "Marjorie", surname: "Morer", address: "Flat 25 Arden Court, 1 Oakhouse Drive", town: "Manchester", county: "County", postCode: "M21 8EW", area: "Chorlton", phone: "0161 801 4155", printChecked: false },
        { no: 230697, firstName: "John Robert", surname: "MOTH", address: "Flat 10, Westfields, 212 Hall Lane", town: "Manchester", county: "Lancashire", postCode: "M23 1LP", area: "Wythenshawe", phone: "07811214128", printChecked: true },
        { no: 76, firstName: "James", surname: "Scott", address: "Flat 35 Egesdon Court, Edge Lane", town: "Manchester", county: "Manchester", postCode: "M21 9HF", area: "Chorlton", phone: "0161 801 3148", printChecked: true },
        { no: 230673, firstName: "Kabsoom", surname: "Ul Haque", address: "10 Hardshaw Close", town: "Manchester", county: "County", postCode: "M13 9TN", area: "Longsight", phone: "07924553913", printChecked: false },
    ],
};

// =================================================================
// 2. HELPER COMPONENTS
// =================================================================

const ClientRow: React.FC<{ client: ClientScheduleItem }> = ({ client }) => {
    return (
        <tr className="hover:bg-gray-50 transition duration-150 ease-in-out">
            <td className="px-3 py-3 text-sm font-medium text-gray-800 whitespace-nowrap">{client.no}</td>
            <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">{client.firstName}</td>
            <td className="px-3 py-3 text-sm text-gray-800 whitespace-nowrap">{client.surname}</td>
            <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{client.address}</td>
            <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{client.town}</td>
            <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{client.county}</td>
            <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{client.postCode}</td>
            <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{client.area}</td>
            <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{client.phone}</td>
            <td className="px-3 py-3 text-center">
                <button 
                    className="text-blue-600 hover:text-white bg-blue-100 hover:bg-blue-600 p-1 rounded-full transition duration-150 shadow-md hover:shadow-lg transform hover:scale-105"
                    aria-label="View Schedule"
                >
                    <Calendar size={18} />
                </button>
            </td>
            <td className="px-3 py-3 text-center">
                <input 
                    type="checkbox" 
                    defaultChecked={client.printChecked} 
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                    aria-label="Select for printing"
                />
            </td>
        </tr>
    );
}

// =================================================================
// 3. MAIN COMPONENT (RENAMED TO App)
// =================================================================

export default function App() {
    const tableHeaders = [
        "No.", "First Name", "Surname", "Address", "Town", "County", 
        "Post Code", "Area", "Phone", "View Schedule", "Print All"
    ];

    return (
        <div>
            <div className="rounded-xl overflow-hidden">
                
                {/* Report Title & Filters */}
                <div className="border-b border-gray-200">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
                        Client Schedules Ready for Printing
                    </h1>
                    <p className="text-sm text-red-600 font-medium mb-4">Dates selected are now inclusive</p>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">Date Range:</label>
                            <input type="date" defaultValue="2025-10-22" className="p-2 border border-gray-300 rounded-lg text-sm bg-white w-32 focus:border-blue-500 focus:ring-blue-500 transition duration-150" />
                            <span className="text-gray-500">to</span>
                            <input type="date" defaultValue="2025-10-26" className="p-2 border border-gray-300 rounded-lg text-sm bg-white w-32 focus:border-blue-500 focus:ring-blue-500 transition duration-150" />
                        </div>
                        
                        <select defaultValue="Client" className="p-2 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 focus:ring-blue-500 transition duration-150">
                            <option>Client</option>
                            <option>Carer</option>
                        </select>
                        
                        <select defaultValue="Pending" className="p-2 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 focus:ring-blue-500 transition duration-150">
                            <option>Pending</option>
                            <option>Active</option>
                            <option>Cancelled</option>
                        </select>
                        
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center shadow-md hover:shadow-lg transition duration-150">
                            <Search size={16} className="mr-2" /> Find Events
                        </button>
                    </div>
                </div>

                {/* Print/Export Controls and Search */}
                <div className="flex flex-wrap justify-between items-center bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-wrap items-center space-x-4 text-sm font-medium mb-3 sm:mb-0">
                        <button className="text-gray-600 hover:text-indigo-600 transition duration-150 flex items-center">Copy</button>
                        <button className="text-gray-600 hover:text-indigo-600 transition duration-150 flex items-center">Excel</button>
                        <button className="text-gray-600 hover:text-indigo-600 transition duration-150 flex items-center">PDF</button>
                        <button className="text-gray-600 hover:text-indigo-600 transition duration-150 flex items-center">Print</button>
                        <button className="text-gray-600 hover:text-indigo-600 transition duration-150 flex items-center">Area Search</button>
                        <button className="text-gray-600 hover:text-indigo-600 transition duration-150 flex items-center"><Table size={16} className="mr-1" /> Column visibility</button>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search table content..."
                            className="pl-10 p-2 border border-gray-300 rounded-lg text-sm w-full transition duration-150 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
                
                {/* Client Selection Table */}
                <div className="overflow-x-auto border-t border-gray-200 mb-6 shadow-inner">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            {/* Search Filters Row */}
                            <tr>
                                {tableHeaders.map((header) => (
                                    <th key={`search-filter-${header}`} className="px-3 py-1 bg-white border-b border-gray-200">
                                        {header !== "View Schedule" && header !== "Print All" && (
                                            <input
                                                type="text"
                                                placeholder={`Search ${header}`}
                                                className="w-full p-1 border border-gray-300 rounded-md text-xs text-gray-700 focus:border-blue-400 focus:ring-blue-400"
                                            />
                                        )}
                                    </th>
                                ))}
                            </tr>
                            <tr className="border-b border-gray-300">
                                {/* Main Headers */}
                                {tableHeaders.map((header) => (
                                    <th key={`header-${header}`} 
                                        className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap cursor-pointer bg-gray-100 hover:bg-gray-200 transition duration-150"
                                    >
                                        <div className="flex items-center">
                                            {header}
                                            {header !== "View Schedule" && header !== "Print All" && <ChevronRight size={12} className="ml-1 rotate-90 text-gray-400" />}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {scheduleData.items.map(client => (
                                <ClientRow key={client.no} client={client} />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 4. PDF Generation Controls (Refactored) */}
                <div className="bg-gray-50 border-t border-gray-200">

                    {/* Footer Text & Database Save */}
                    <div className="mb-8 bg-white p-5 rounded-lg shadow-lg border border-gray-200">
                        <label htmlFor="pdf-footer" className="block text-sm font-bold text-gray-800 mb-2">
                            Footer Text for (New) PDF's
                        </label>
                        <textarea
                            id="pdf-footer"
                            rows={2}
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none"
                            placeholder="Enter any mandatory disclaimer or legal footer text here..."
                        />
                        <div className="mt-4 flex items-center space-x-2">
                            <input type="checkbox" id="saveInDatabase" className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                            <label htmlFor="saveInDatabase" className="text-sm font-medium text-gray-700 select-none">
                                Save generated PDF in database
                            </label>
                        </div>
                    </div>

                    {/* PDF Generation Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {/* Card 1: Standard & Compacted PDF Generation */}
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                                <FileText size={20} className="mr-2 text-indigo-600" /> Standard Generation
                            </h3>
                            
                            <div className="flex flex-wrap gap-4 items-center justify-between">
                                <label className="text-sm font-medium text-gray-700 min-w-[70px]">Period Start:</label>
                                <input type="date" defaultValue="2025-10-22" className="p-2 border border-gray-300 rounded-lg text-sm bg-white flex-1 min-w-[120px]" />
                            </div>
                            <div className="flex flex-wrap gap-4 items-center justify-between">
                                <label className="text-sm font-medium text-gray-700 min-w-[70px]">Period Finish:</label>
                                <input type="date" defaultValue="2025-10-28" className="p-2 border border-gray-300 rounded-lg text-sm bg-white flex-1 min-w-[120px]" />
                            </div>

                            <div className="pt-4 space-y-3">
                                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition duration-150 shadow-lg">
                                    Generate Full PDF
                                </button>
                                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition duration-150 shadow-lg">
                                    Generate Compacted PDF (Legacy)
                                </button>
                                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition duration-150 shadow-lg">
                                    Generate Compacted PDF (New)
                                </button>
                            </div>
                        </div>

                        {/* Card 2: PDF Content Options */}
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                                <CheckSquare size={20} className="mr-2 text-green-600" /> Content & Font
                            </h3>
                            <div className="grid grid-cols-2 gap-y-3 text-sm font-medium">
                                {['Client Address', 'Location Address', 'Tasks', 'Job Image', 'Schedule SignOff'].map(label => (
                                    <label key={label} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            defaultChecked={label === 'Tasks' || label === 'Job Image'}
                                            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" 
                                        />
                                        <span>{label}</span>
                                    </label>
                                ))}
                            </div>
                            
                            <div className="pt-4 border-t mt-4">
                                 <label htmlFor="font-select" className="block text-sm font-medium text-gray-700 mb-2">Select Font Size:</label>
                                 <select id="font-select" defaultValue="16px" className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:border-green-500 focus:ring-green-500 transition duration-150">
                                     <option>12px</option>
                                     <option>16px</option>
                                     <option>20px</option>
                                 </select>
                            </div>
                        </div>

                        {/* Card 3: Compacted PDF V2 Settings */}
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                                <Printer size={20} className="mr-2 text-blue-600" /> Compacted PDF V2
                            </h3>
                            <div className="grid grid-cols-2 gap-y-3 text-sm font-medium">
                                {['Client Address', 'Schedule SignOff', 'Location Address', 'Tasks'].map(label => (
                                    <label key={`v2-${label}`} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                                        <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                        <span>{label}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="pt-4 border-t mt-4">
                                 <label htmlFor="v2-font-select" className="block text-sm font-medium text-gray-700 mb-2">Select Font Size (V2):</label>
                                 <select id="v2-font-select" defaultValue="12px" className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 focus:ring-blue-500 transition duration-150">
                                     <option>10px</option>
                                     <option>12px</option>
                                     <option>14px</option>
                                 </select>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition duration-150 shadow-lg">
                                Generate Compacted PDF V2
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
