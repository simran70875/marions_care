import {
    Printer,
    Table,
    Plus,
    Search,
    Edit,
    Trash2,
    X,
    Pill
} from "lucide-react";
import React, { useState } from "react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA
// =================================================================

interface MedicationItem {
    id: number;
    name: string;
    concentration: string;
    clientDose: string;
    form: string;
    maxDose: number;
    route: string;
    method: string;
    minGap: string;
    isBluePill?: boolean; // For Pregabalin style icon
}

interface ClientDataList {
    name: string;
    medications: MedicationItem[];
}

const clientDataList: ClientDataList = {
    name: "Charles 'O CONNOR",
    medications: [
        { id: 1, name: "Venlafaxine modified-release capsules", concentration: "75 mg", clientDose: "Take one capsule once a day", form: "Capsule", maxDose: 1, route: "Orally", method: "Carers to administer", minGap: "Hrs" },
        { id: 2, name: "Paracetamol tablet", concentration: "500 mg", clientDose: "Two tablets 4 times a day when required", form: "Tablet", maxDose: 2, route: "Orally", method: "Carers to administer", minGap: "Hrs" },
        { id: 3, name: "Loperamide Hydrochloride", concentration: "2 mg", clientDose: "Take two capsules twice a day", form: "Capsule", maxDose: 2, route: "Orally", method: "Carers to administer", minGap: "Hrs" },
        { id: 4, name: "Pregabalin", concentration: "150 mg", clientDose: "Two To Be Taken Twice A Day", form: "Capsule", maxDose: 2, route: "Orally", method: "Carers to administer", minGap: "Hrs", isBluePill: true },
        { id: 5, name: "Zopiclone", concentration: "7.5 mg", clientDose: "One To Be Taken Each Day - Night", form: "Tablet", maxDose: 1, route: "Orally", method: "Carers to administer", minGap: "Hrs" },
    ],
};

// =================================================================
// 2. ADD NEW MEDICATION MODAL COMPONENT (Distinct from EMAR modal)
// =================================================================

interface AddNewMedicationModalProps {
    closeModal: () => void;
}

const AddNewMedicationModal: React.FC<AddNewMedicationModalProps> = ({ closeModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

                {/* Modal Header (blue tone from screenshot) */}
                <div className="p-4 bg-blue-600 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold">Add New Medication</h2>
                    <button onClick={closeModal} className="text-white hover:text-gray-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Content - Form */}
                <div className="p-6 overflow-y-auto flex-1 space-y-4">
                    
                    {/* Row 1: Name */}
                    <div className="col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Enter medication name"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Row 2: Concentration / Dose / Min Gap */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Concentration:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Client Dose:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Gap Between Doses</label>
                            <div className="flex">
                                <input type="number" className="w-1/2 p-2 border border-gray-300 rounded-l-lg text-sm" />
                                <select className="w-1/2 p-2 border border-gray-300 rounded-r-lg text-sm bg-gray-50">
                                    <option>Hrs</option>
                                    <option>Mins</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Form / Max Dose / Route */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Form:</label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-gray-50">
                                <option>Tablet</option>
                                <option>Capsule</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Dose Within 24hrs:</label>
                            <input type="number" className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Route:</label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-gray-50">
                                <option>Orally</option>
                                <option>Topical</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 4: Administration Method / Controlled Checkbox */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Administration Method:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div className="col-span-1 flex items-end pb-1">
                            <input type="checkbox" id="controlled" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <label htmlFor="controlled" className="ml-2 text-sm font-medium text-gray-700">Controlled Medication:</label>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t flex justify-end space-x-3 bg-gray-50">
                    <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors">
                        Close
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

// =================================================================
// 3. MAIN CLIENT MEDICATION LIST COMPONENT
// =================================================================

export default function MedicationList() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen">
            <div className="rounded-xl overflow-hidden">
                
                {/* Header (Matching the screenshot style) */}
                <div className="p-4 md:p-6 bg-blue-100 border-b-2 border-blue-200 flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                        {clientDataList.name} - Medication List
                    </h1>
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center">
                        <Pill size={16} className="mr-2" /> EMAR
                    </button>
                </div>

                {/* Controls and Search */}
                <div className="p-4 flex justify-between items-center">
                    <div className="flex space-x-3">
                        <button 
                            onClick={openModal} 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center transition-colors"
                        >
                            <Plus size={16} className="mr-1" /> Add New Medication
                        </button>
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

                {/* Medication Table */}
                <div className="overflow-x-auto border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Medication</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Concentration</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Client Dose</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Form</th>
                                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Maximum Dose Within 24hrs</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Route</th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Method</th>
                                <th className-="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Minimum Gap Between Doses</th>
                                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clientDataList.medications.map(med => (
                                <tr key={med.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-3 text-sm text-gray-800 font-medium whitespace-nowrap">
                                        {med.name}
                                        {med.isBluePill && <span className="text-xs text-blue-600 ml-1"> <Pill size={12} className="inline-block align-middle" /></span>}
                                    </td>
                                    <td className="px-3 py-3 text-sm text-gray-600">{med.concentration}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600">{med.clientDose}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600">{med.form}</td>
                                    <td className="px-3 py-3 text-center text-sm text-gray-600">{med.maxDose}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600">{med.route}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600">{med.method}</td>
                                    <td className="px-3 py-3 text-sm text-gray-600 whitespace-nowrap">{med.minGap}</td>
                                    <td className="px-3 py-3 text-center text-sm space-x-2 whitespace-nowrap">
                                        <button className="text-pink-600 hover:text-pink-800" title="Edit"><Edit size={16} /></button>
                                        <button className="text-red-600 hover:text-red-800" title="Delete"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan={10} className="px-3 py-2 text-sm text-gray-500">
                                    Showing 1 to 5 of 5 entries
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Render Modal */}
            {isModalOpen && (
                <AddNewMedicationModal 
                    closeModal={closeModal} 
                />
            )}
        </div>
    );
}