import React, { useState } from 'react';

// --- Type Definitions ---

interface Contact {
    id: number;
    type: string;
    name: string;
    jobTitle: string;
    position: string;
    billing: 'Yes' | 'No';
    template: string;
    phone: string;
    email: string;
    relation: string;
    originCode: string;
    edit: boolean;
    delete: boolean;
    type2: 'Normal' | 'External';
    split: 'Yes' | 'No';
    contactsGroup: string;
    carePlanSignOff: 'Yes' | 'No';
}

interface FilterState {
    [key: string]: string;
}

// --- Mock Data ---

const MOCK_CONTACTS: Contact[] = [
    {
        id: 1,
        type: 'Emergency Contact',
        name: 'Pauline Connor',
        jobTitle: '',
        position: '',
        billing: 'No',
        template: '',
        phone: '07896637872',
        email: '',
        relation: 'Aunt',
        originCode: '',
        edit: true,
        delete: true,
        type2: 'Normal',
        split: 'No',
        contactsGroup: '',
        carePlanSignOff: 'No',
    },
    {
        id: 2,
        type: 'Next Of Kin',
        name: 'Andrew',
        jobTitle: '',
        position: '',
        billing: 'No',
        template: '',
        phone: '07423575562',
        email: '',
        relation: 'Brother',
        originCode: '',
        edit: true,
        delete: true,
        type2: 'Normal',
        split: 'No',
        contactsGroup: '',
        carePlanSignOff: 'No',
    },
    {
        id: 3,
        type: 'GP',
        name: 'Northenden Group Practice',
        jobTitle: '',
        position: '',
        billing: 'No',
        template: '',
        phone: '0161 958 3206',
        email: '',
        relation: '',
        originCode: '',
        edit: true,
        delete: true,
        type2: 'Normal',
        split: 'No',
        contactsGroup: '',
        carePlanSignOff: 'No',
    },
    {
        id: 4,
        type: 'Social Worker',
        name: 'Sophie Beecara-Adams',
        jobTitle: '',
        position: '',
        billing: 'No',
        template: '',
        phone: '07775261750',
        email: 'Sophie Beecara-Adams@manchester.gov.uk',
        relation: '',
        originCode: '',
        edit: true,
        delete: true,
        type2: 'Normal',
        split: 'No',
        contactsGroup: '',
        carePlanSignOff: 'No',
    },
    {
        id: 5,
        type: 'Pharmacy',
        name: 'Well Pharmacy',
        jobTitle: '',
        position: '',
        billing: 'No',
        template: '',
        phone: '0161 945 4025',
        email: '',
        relation: '',
        originCode: '',
        edit: true,
        delete: true,
        type2: 'Normal',
        split: 'No',
        contactsGroup: '',
        carePlanSignOff: 'No',
    },
];

// --- Utility Components for Icons ---

const EditIcon: React.FC = () => (
    <svg className="w-4 h-4 text-gray-500 hover:text-purple-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-9l5 5m-9 9V11a2 2 0 012-2h4l-4 4z"></path>
    </svg>
);

const DeleteIcon: React.FC = () => (
    <svg className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
    </svg>
);

// --- Main Component ---

const ClientContactsTable: React.FC = () => {
    const [contacts] = useState<Contact[]>(MOCK_CONTACTS);
    const [filters, setFilters] = useState<FilterState>({});
    const [searchTerm, setSearchTerm] = useState('');

    // Table column definitions (matching the image order and labels)
    const columns = [
        { key: 'type', label: 'Type' },
        { key: 'name', label: 'Name' },
        { key: 'jobTitle', label: 'Job Title' },
        { key: 'position', label: 'Position' },
        { key: 'billing', label: 'Billing' },
        { key: 'template', label: 'Template' },
        { key: 'phone', label: 'Phone' },
        { key: 'email', label: 'E-mail' },
        { key: 'relation', label: 'Relation' },
        { key: 'originCode', label: 'Code' },
        { key: 'edit', label: 'Edit', isAction: true },
        { key: 'delete', label: 'Delete', isAction: true },
        { key: 'type2', label: 'Type' }, // Duplicate label, using type2 key
        { key: 'split', label: 'Split' },
        { key: 'contactsGroup', label: 'Contacts Groups' },
        { key: 'carePlanSignOff', label: 'Care Plan Sign Off' },
    ];

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        // Note: Filtering logic for the table is complex, for this design recreation, we'll keep the filters in state.
    };
    
    // In a real app, this would apply all filters and the search term
    const filteredContacts = contacts; 
    
    const handleAction = (action: 'edit' | 'delete', contactId: number) => {
        // Placeholder for action logic
        console.log(`${action} contact ID: ${contactId}`);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-white font-inter">
            {/* Header Area */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Contacts
                </h1>
                
                {/* Right Action Buttons & Search */}
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1.5 text-sm font-medium bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition-colors">
                        Contact Type
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition-colors">
                        Shared Contacts
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors">
                        Add contact
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors">
                        Add Split Billing Invoice Contact
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-colors">
                        Contacts's History
                    </button>
                    
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-1.5 border border-gray-300 rounded-lg text-sm w-36 focus:ring-purple-500 focus:border-purple-500 ml-4"
                    />
                </div>
            </div>

            {/* Bulk Actions/View Options */}
            <div className="flex items-center space-x-3 mb-4">
                <button className="text-xs font-medium px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                    Copy
                </button>
                <button className="text-xs font-medium px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                    Export Excel
                </button>
                <button className="text-xs font-medium px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                    Export CSV
                </button>
                <button className="text-xs font-medium px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                    Export PDF
                </button>
                <button className="text-xs font-medium px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                    Print
                </button>
                <button className="text-xs font-medium px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                    Column visibility
                </button>
            </div>

            {/* Data Table Container */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    
                    {/* Table Headers */}
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider ${col.isAction ? 'w-10 text-center' : ''}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Filter Row (Search Row from image) */}
                    <tbody className="bg-white">
                        <tr className="border-b border-gray-200 bg-gray-100">
                            {columns.map((col) => (
                                <td key={`filter-${col.key}`} className="px-3 py-1">
                                    {col.isAction ? (
                                        // Empty cell for action columns
                                        <div className="h-5"></div>
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder={`Search ${col.label.split(' ')[0]}`}
                                            className="w-full text-xs p-1 border border-gray-300 rounded-sm focus:ring-purple-500 focus:border-purple-500"
                                            onChange={(e) => handleFilterChange(col.key, e.target.value)}
                                            value={filters[col.key] || ''}
                                        />
                                    )}
                                </td>
                            ))}
                        </tr>
                    </tbody>

                    {/* Table Body - Data Rows */}
                    <tbody className="divide-y divide-gray-200">
                        {filteredContacts.map((contact) => (
                            <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{contact.type}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-purple-600 font-medium cursor-pointer">{contact.name}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.jobTitle}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.position}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.billing}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.template}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-purple-600 cursor-pointer">{contact.email}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.relation}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.originCode}</td>
                                
                                {/* Action: Edit */}
                                <td className="px-3 py-2 whitespace-nowrap text-center">
                                    <span onClick={() => handleAction('edit', contact.id)} title="Edit Contact">
                                        <EditIcon />
                                    </span>
                                </td>
                                
                                {/* Action: Delete */}
                                <td className="px-3 py-2 whitespace-nowrap text-center">
                                    <span onClick={() => handleAction('delete', contact.id)} title="Delete Contact">
                                        <DeleteIcon />
                                    </span>
                                </td>
                                
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.type2}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.split}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.contactsGroup}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{contact.carePlanSignOff}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination/Summary Footer */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>
                    Showing 1 to {filteredContacts.length} of {MOCK_CONTACTS.length} entries
                </span>
                <div className="flex items-center space-x-1">
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-xs">
                        Previous
                    </button>
                    <span className="px-3 py-1 border border-purple-600 bg-purple-100 rounded-lg font-medium text-xs">
                        1
                    </span>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-xs">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

// Default export for the component to be runnable in the canvas
export default ClientContactsTable;
