import React, { useState } from 'react';
// Note: In this single-file environment, we'll use simple characters or inline SVGs 
// for icons, but the component names from lucide-react (like Search) guide the placement.

// =================================================================
// 1. ICON COMPONENTS
// =================================================================

// Helper function for icon placeholders (using inline SVG for portability)
const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);


// =================================================================
// 2. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface ReferralItem {
    id: number;
    staffName: string;
    address: string;
    reason: string;
    referredBy: string;
    contactDate: string;
    commencedDate: string;
    status: 'Active' | 'Archived';
}

interface StatusBadgeProps {
    status: 'Active' | 'Archived';
}

const referralData: ReferralItem[] = [
    { id: 1, staffName: "Patricia Wallace", address: "7 Jack Edwards Court, Manchester, M20 2HT", reason: "BLOCK", referredBy: "MAN SPOT", contactDate: "27-03-2023", commencedDate: "04-04-2023", status: "Active" },
    { id: 2, staffName: "Charles O' Connor", address: "101 Langley Lane, Northenden, M22 4DY", reason: "MCC", referredBy: "BLOCK", contactDate: "19-09-2023", commencedDate: "26-09-2023", status: "Archived" },
    { id: 3, staffName: "Amelia Khan", address: "7 Trinity Court, Withernsea Road, M21 9XD", reason: "MAN SPOT", referredBy: "Private", contactDate: "28-01-2023", commencedDate: "02-05-2023", status: "Active" },
    { id: 4, staffName: "Evelyn Almas", address: "4 Brown Walk, Brunswick, M13 9YF", reason: "MAN SPOT", referredBy: "MAN SPOT", contactDate: "29-03-2023", commencedDate: "06-04-2023", status: "Active" },
    { id: 5, staffName: "Saafira Selva", address: "Ground Floor Flat 25, Ardwick Court, M14 4YA", reason: "BLOCK", referredBy: "MAN SPOT", contactDate: "05-02-2024", commencedDate: "12-02-2024", status: "Active" },
];

// =================================================================
// 3. SUB COMPONENTS
// =================================================================

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const baseClasses = "inline-flex px-3 py-0.5 text-xs font-semibold leading-5 rounded-full shadow-sm";
    const colorClasses = status === 'Active' 
        ? "bg-green-100 text-green-700" 
        : "bg-red-100 text-red-700";
    return (
        <span className={`${baseClasses} ${colorClasses}`}>{status}</span>
    );
};


// =================================================================
// 4. MAIN COMPONENT
// =================================================================

const ReferralReportsPage: React.FC = () => {
    // State for mock filtering (to demonstrate search input functionality)
    const [searchTerm, setSearchTerm] = useState<string>('');

    const tableHeaders: string[] = [
        "Staff Name", "Address", "Referral Reason", "Referred By", "First Contact Date", "Service Commenced Date", "Status"
    ];

    const filteredData: ReferralItem[] = referralData.filter((item: ReferralItem) => 
        Object.values(item).some((val: string | number) => 
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    

    return (
        <div>
            {/* Centered Report Container */}
            <div className="rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                
                <header className="p-6 border-b border-gray-200 bg-gray-50">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Referral Reports
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Comprehensive list of all client referrals with current status and key dates.
                    </p>
                </header>

                <main className="p-6">
                    {/* Filter Section - Matching the theme's box look */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mb-6 rounded-lg bg-indigo-50 border border-indigo-200 shadow-sm">
                        {/* Date Filters */}
                        {['First Contact After', 'First Contact Before', 'Service Commence After', 'Service Commence Before'].map((label: string) => (
                            <div key={label}>
                                <label className="block text-xs font-semibold text-indigo-700 mb-1">{label}:</label>
                                <input type="date" className="mt-1 block w-full rounded-lg border-indigo-300 shadow-sm p-2 text-sm focus:ring-purple-500 focus:border-purple-500 transition-colors" />
                            </div>
                        ))}
                        
                        {/* Checkboxes and Search Button */}
                        <div className="lg:col-span-4 flex flex-wrap items-center space-x-6 mt-2">
                            <label className="flex items-center text-sm font-medium text-indigo-700">
                                <input type="checkbox" defaultChecked className="rounded text-purple-600 focus:ring-purple-500 mr-2 border-indigo-400" />
                                Active
                            </label>
                            <label className="flex items-center text-sm font-medium text-indigo-700">
                                <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500 mr-2 border-indigo-400" />
                                Archived
                            </label>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md text-sm font-semibold">
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Table Toolbar and Search */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
                        <div className="flex flex-wrap gap-2 text-sm font-medium">
                            {/* Toolbar Buttons matching the theme style */}
                            {['Rows', 'Copy', 'Excel', 'PDF', 'Print', 'Area Search', 'Tag Search', 'Column visibility'].map((label: string) => (
                                <button key={label} 
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs font-semibold transition-colors shadow-sm">
                                    {label}
                                </button>
                            ))}
                            <button 
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors shadow-sm">
                                Clear Search
                            </button>
                        </div>
                        
                        {/* Global Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search all fields..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 p-1.5 border border-gray-300 rounded-lg text-sm w-40 md:w-64 focus:border-purple-500 focus:ring-purple-500 transition-colors shadow-sm"
                            />
                            <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Responsive Table Container */}
                    <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                {/* Search Filters Row */}
                                <tr>
                                    {tableHeaders.map((header: string) => (
                                        <th key={`filter-${header}`} className="px-3 py-2 bg-white border-b border-gray-200">
                                            <input
                                                type="text"
                                                placeholder={`Filter ${header}`}
                                                className="w-full p-1 border border-gray-300 rounded-md text-xs text-gray-700 focus:border-purple-500 focus:ring-purple-500"
                                            />
                                        </th>
                                    ))}
                                </tr>
                                {/* Main Headers */}
                                <tr className="border-b border-gray-300">
                                    {tableHeaders.map((header: string) => (
                                        <th key={`header-${header}`} 
                                            className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
                                            style={{ minWidth: header.includes('Name') || header.includes('Address') ? '200px' : '150px' }}
                                        >
                                            <div className="flex items-center">
                                                {header}
                                                <ChevronRight className="ml-1 rotate-90 text-gray-400" />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredData.length > 0 ? (
                                    filteredData.map((item: ReferralItem) => (
                                        <tr key={item.id} className="hover:bg-purple-50 transition-colors">
                                            <td className="px-3 py-3 text-sm font-medium text-purple-600 whitespace-nowrap cursor-pointer hover:underline">{item.staffName}</td>
                                            <td className="px-3 py-3 text-sm text-gray-600 whitespace-normal min-w-[250px]">{item.address}</td>
                                            <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.reason}</td>
                                            <td className="px-3 py-3 text-sm text-blue-600 whitespace-nowrap">{item.referredBy}</td>
                                            <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.contactDate}</td>
                                            <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.commencedDate}</td>
                                            <td className="px-3 py-3 whitespace-nowrap">
                                                <StatusBadge status={item.status} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-3 py-8 text-center text-sm text-gray-500">
                                            No referrals match the current search term: "{searchTerm}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Pagination/Summary */}
                    <div className="mt-4 p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                        <p>Showing 1 to {filteredData.length} of 693 entries</p>
                        <div className="flex items-center space-x-1 mt-3 sm:mt-0">
                            <button className="text-gray-400 border border-gray-300 p-1 rounded text-xs px-2" disabled>Previous</button>
                            <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs shadow-md">1</span>
                            {[2, 3, 4, 5, 6].map((page: number) => (
                                <button key={page} className="text-gray-700 border border-gray-300 p-1 rounded text-xs px-2 hover:bg-gray-100">{page}</button>
                            ))}
                            <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs px-2 hover:bg-gray-100">Next</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ReferralReportsPage;
