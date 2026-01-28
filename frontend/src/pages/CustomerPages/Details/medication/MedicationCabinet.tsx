import {
    Printer,
    Table,
    Search,
    Edit,
    Archive,
    X,
} from "lucide-react";
import React, { useState } from "react";

// =================================================================
// TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface CabinetItem {
    id: number;
    client: string;
    medication: string;
    dose: string;
    form: string;
    openingBalance: number;
    newDelivery: number;
    administered: number;
    disposed: number;
    theoreticalBalance: number;
    actualBalance: number;
    lastReconcilesDate: string;
}

interface ClientCabinetData {
    name: string;
    items: CabinetItem[];
}

const clientCabinetData: ClientCabinetData = {
    name: "Charles 'O CONNOR",
    items: [
        { id: 1, client: "CHARLES 'O CONNOR", medication: "Paracetamol tablet", dose: "Two tablets 4 times a day when required", form: "Tablet", openingBalance: 0, newDelivery: 0, administered: 0, disposed: 0, theoreticalBalance: 0, actualBalance: 0, lastReconcilesDate: "" },
        { id: 2, client: "CHARLES 'O CONNOR", medication: "Loperamide Hydrochloride", dose: "Take two capsules twice a day", form: "Capsule", openingBalance: 0, newDelivery: 34, administered: 0, disposed: 0, theoreticalBalance: -34, actualBalance: 0, lastReconcilesDate: "" },
        { id: 3, client: "CHARLES 'O CONNOR", medication: "Zopiclone", dose: "One To Be Taken Each Day - Night", form: "Tablet", openingBalance: 0, newDelivery: 7, administered: 0, disposed: 0, theoreticalBalance: -7, actualBalance: 0, lastReconcilesDate: "" },
        { id: 4, client: "CHARLES 'O CONNOR", medication: "Zopiclone", dose: "One To Be Taken Each Day - Night", form: "Tablet", openingBalance: 0, newDelivery: 12, administered: 0, disposed: 0, theoreticalBalance: -12, actualBalance: 0, lastReconcilesDate: "" },
        { id: 5, client: "CHARLES 'O CONNOR", medication: "Venlafaxine modified-release capsules", dose: "Take one capsule once a day", form: "Capsule", openingBalance: 0, newDelivery: 25, administered: 0, disposed: 0, theoreticalBalance: -25, actualBalance: 0, lastReconcilesDate: "" },
        { id: 6, client: "CHARLES 'O CONNOR", medication: "Loperamide Hydrochloride", dose: "Take two capsules twice a day", form: "Capsule", openingBalance: 0, newDelivery: 58, administered: 0, disposed: 0, theoreticalBalance: -58, actualBalance: 0, lastReconcilesDate: "" },
        { id: 7, client: "CHARLES 'O CONNOR", medication: "Pregabalin", dose: "Two To Be Taken Twice A Day", form: "Capsule", openingBalance: 0, newDelivery: 50, administered: 0, disposed: 0, theoreticalBalance: -58, actualBalance: 0, lastReconcilesDate: "" },
    ],
};

// =================================================================
// MODALS (Nested components)
// =================================================================

// --- Add Stock Modal (screencapture-care2-onetouchhealth-net-cm-in-med-medCabinetRpt-client-php-2025-10-22-16_35_46.png) ---
const AddStockModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
    return (
        <div className="fixed inset-0 bg-opacity-40 backdrop-filter backdrop-blur-sm flex justify-center items-center z-99999 p-4">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-4 bg-teal-600 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold">Add Stock to medication cabinet</h2>
                    <button onClick={closeModal} className="text-white hover:text-gray-200"><X size={24} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Destination Client</label>
                        <input type="text" value={clientCabinetData.name} readOnly className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Select Medication</label>
                        <input type="text" placeholder="Search Medication" className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Enter Quantity:</label>
                        <input type="number" placeholder="0" className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>
                <div className="p-4 border-t flex justify-end space-x-3 bg-gray-50">
                    <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold">
                        Close
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Movement of Medication Modal (screencapture-care2-onetouchhealth-net-cm-in-med-medCabinetRpt-client-php-2025-10-22-16_35_59.png) ---
const MovementOfMedicationModal: React.FC<{ closeModal: () => void, medicationName: string }> = ({ closeModal, medicationName }) => {
    const [isDisposal, setIsDisposal] = useState(false); // Used to toggle the header style
    
    // Dummy Data for selected medication
    const medDetails = clientCabinetData.items.find(item => item.medication === medicationName) || clientCabinetData.items[0];

    return (
        <div className="fixed inset-0 bg-opacity-40 backdrop-filter backdrop-blur-sm flex justify-center items-center z-99999 p-4">
            <div className="bg-white rounded-xl w-full max-w-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-4 bg-blue-600 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold">Movement of medication</h2>
                    <button onClick={closeModal} className="text-white hover:text-gray-200"><X size={24} /></button>
                </div>
                
                <div className="flex justify-around bg-gray-100 border-b">
                    <button 
                        onClick={() => setIsDisposal(false)} 
                        className={`py-3 px-6 text-sm font-semibold transition-colors ${!isDisposal ? 'bg-white border-t-4 border-blue-600 text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        Medication From Pharmacy
                    </button>
                    <button 
                        onClick={() => setIsDisposal(true)} 
                        className={`py-3 px-6 text-sm font-semibold transition-colors ${isDisposal ? 'bg-white border-t-4 border-pink-600 text-pink-600' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        Medication Disposal
                    </button>
                </div>

                <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-800 border">
                        <span className="font-semibold">Medication:</span> {medDetails.medication} ({medDetails.dose} / {medDetails.form})
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Enter Quantity:</label>
                            <input type="number" placeholder="0" className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Came From:</label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white">
                                <option>New Delivery</option>
                                <option>Stock Transfer</option>
                                <option>Audit Adjustment</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Medication Addition Comment:</label>
                        <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-none"></textarea>
                    </div>

                    {isDisposal && (
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Disposal Reason:</label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white">
                                <option>Expired</option>
                                <option>Damaged</option>
                                <option>Patient Transfer</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t flex justify-end space-x-3 bg-gray-50">
                    {isDisposal && (
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center">
                            <Archive size={16} className="mr-1" /> Archive
                        </button>
                    )}
                    <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold">
                        Close
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};


// =================================================================
// MAIN COMPONENT
// =================================================================

export default function MedsCabinet() {
    const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
    const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
    const [movementMedication, setMovementMedication] = useState<string>("");

    const openAddStockModal = () => setIsAddStockModalOpen(true);
    const closeAddStockModal = () => setIsAddStockModalOpen(false);

    const openMovementModal = (medication: string) => {
        setMovementMedication(medication);
        setIsMovementModalOpen(true);
    };
    const closeMovementModal = () => {
        setIsMovementModalOpen(false);
        setMovementMedication("");
    };

    const tableHeaders = [
        "Client", "Medication", "Dose", "Form", "Opening Balance", 
        "New Delivery", "Administered", "Disposed", 
        "Theoretical Balance", "Actual Balance", "Last Reconciles Date", "History", "Edit"
    ];

    return (
        <div>
            <div className=" shadow-2xl overflow-hidden">
                
                {/* Header and Controls */}
                <div className="p-4 md:p-6 bg-white border-b-2 border-blue-200 flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                        My Meds Cabinet
                    </h1>
                    <div className="flex space-x-3">
                        <button 
                            onClick={openAddStockModal}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center transition-colors"
                        >
                            Add Meds to Cabinet
                        </button>
                        <button className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center transition-colors">
                            Archived Meds
                        </button>
                    </div>
                </div>

                {/* Print/Export/Search Bar */}
                <div className="p-4 flex justify-between items-center">
                    <div className="flex space-x-3 text-sm">
                        <button className="border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-100">Rows</button>
                        <button className="border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-100">Copy</button>
                        <button className="border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-100">Excel</button>
                        <button className="border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-100">PDF</button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium">
                            <Printer size={16} className="mr-1" /> Print
                        </button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium">
                            <Table size={16} className="mr-1" /> Column visibility
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
                
                {/* Medication Cabinet Table */}
                <div className="overflow-x-auto border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {tableHeaders.map(header => (
                                    <th key={header} className="px-3 py-3 text-left text-[10px] font-semibold text-gray-600 uppercase whitespace-nowrap">
                                        {header.replace(/ /g, "\u00A0")} {/* Use non-breaking space */}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clientCabinetData.items.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-3 text-sm text-gray-800 font-medium whitespace-nowrap">{item.client}</td>
                                    <td className="px-3 py-3 text-sm text-gray-800 font-medium whitespace-nowrap">{item.medication}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.dose}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{item.form}</td>
                                    <td className="px-3 py-3 text-center text-sm text-gray-600">{item.openingBalance}</td>
                                    <td className="px-3 py-3 text-center text-sm text-gray-600">{item.newDelivery}</td>
                                    <td className="px-3 py-3 text-center text-sm text-gray-600">{item.administered}</td>
                                    <td className="px-3 py-3 text-center text-sm text-gray-600">{item.disposed}</td>
                                    <td className={`px-3 py-3 text-center text-sm font-semibold ${item.theoreticalBalance < 0 ? 'text-red-600' : 'text-green-600'}`}>{item.theoreticalBalance}</td>
                                    
                                    {/* Actual Balance and Edit Button */}
                                    <td className="px-3 py-3 text-center text-sm">
                                        <button 
                                            onClick={() => openMovementModal(item.medication)}
                                            className="text-blue-600 hover:text-blue-800 border border-blue-600 p-1 rounded transition-colors"
                                            title="Update Actual Balance"
                                        >
                                            <Edit size={14} />
                                        </button>
                                    </td>
                                    
                                    <td className="px-3 py-3 text-center text-sm text-gray-600 whitespace-nowrap">{item.lastReconcilesDate}</td>
                                    
                                    {/* History and Edit (Final Columns) */}
                                    <td className="px-3 py-3 text-center text-sm">
                                        <button className="text-blue-600 hover:text-blue-800 font-semibold" title="View History">
                                            History
                                        </button>
                                    </td>
                                    <td className="px-3 py-3 text-center text-sm">
                                        <button className="text-pink-600 hover:text-pink-800" title="Edit Item">
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
                    <p>Showing 1 to 9 of 9 entries</p>
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-400 border border-gray-300 p-1 rounded text-xs" disabled>Previous</button>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">1</span>
                        <button className="text-gray-700 border border-gray-300 p-1 rounded text-xs">Next</button>
                    </div>
                </div>
            </div>

            {/* Render Modals */}
            {isAddStockModalOpen && (
                <AddStockModal closeModal={closeAddStockModal} />
            )}
            {isMovementModalOpen && (
                <MovementOfMedicationModal 
                    closeModal={closeMovementModal} 
                    medicationName={movementMedication} 
                />
            )}
        </div>
    );
}