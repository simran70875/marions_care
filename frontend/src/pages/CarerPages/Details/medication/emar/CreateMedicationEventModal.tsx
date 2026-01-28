import { X, Check } from "lucide-react";
import React, { useState } from "react";

// --- TYPE DEFINITION (for props, matching the others) ---
interface CreateMedicationEventModalProps {
    clientName: string;
    clientDob: string;
    clientId: string;
    clientGPPractice: string;
    clientAllergies: string;
    closeModal: () => void;
}

// --- REUSABLE INPUT FIELD ---
const FormInput: React.FC<{ label: string; placeholder: string }> = ({ label, placeholder }) => (
    <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

// --- MAIN MODAL COMPONENT ---
export const CreateMedicationEventModal: React.FC<CreateMedicationEventModalProps> = ({
    clientName,
    clientDob,
    clientId,
    clientGPPractice,
    clientAllergies,
    closeModal,
}) => {
    // Dummy state for checkboxes
    const [isMandatory, setIsMandatory] = useState(false);
    const [isControlled, setIsControlled] = useState(false);

    return (
        <div className="fixed inset-0 bg-opacity-40 backdrop-filter backdrop-blur-sm flex justify-center items-center z-99999 p-4">
            <div className="bg-white rounded-xl w-full max-w-5xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

                {/* Modal Header */}
                <div className="p-4 bg-teal-600 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold">Create Medication Event</h2>
                    <button onClick={closeModal} className="text-white hover:text-gray-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Client Header Info */}
                <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-1 text-sm">
                        <p className="font-semibold text-gray-800">Name: <span className="font-normal">{clientName}</span></p>
                        <p className="font-semibold text-gray-800">D.O.B: <span className="font-normal">{clientDob}</span></p>
                        <p className="font-semibold text-gray-800">Client ID: <span className="font-normal">{clientId}</span></p>
                        <p className="font-semibold text-gray-800">GP Practice: <span className="font-normal">{clientGPPractice}</span></p>
                    </div>
                </div>

                {/* Client Allergies */}
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 text-sm">
                    <span className="font-semibold">Allergies:</span> {clientAllergies || "None recorded."}
                </div>

                {/* Modal Content - Main Form */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">

                    {/* Row 1: Select Medication */}
                    <FormInput label="Select Medication" placeholder="Type to search or select a medication..." />

                    {/* Row 2: Concentration, Client Dose, Max Dose */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormInput label="Concentration" placeholder="e.g., 200 mg" />
                        <FormInput label="Client Dose" placeholder="e.g., One tablet once a day" />
                        <FormInput label="Maximum Dose Within 24hrs" placeholder="e.g., 4" />
                    </div>

                    {/* Row 3: Form, Route, Administration Method */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormInput label="Form" placeholder="e.g., Tablet, Capsule, Liquid" />
                        <FormInput label="Route" placeholder="e.g., Orally, Topical, Sublingual" />
                        <FormInput label="Administration Method" placeholder="e.g., Carers to administer" />
                    </div>

                    {/* Row 4: Quantity and Checkboxes */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <FormInput label="Number of medication to be given" placeholder="0.0" />
                        <FormInput label="Form:" placeholder="e.g., Tablet" />
                        
                        {/* Mandatory Medication Checkbox */}
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">Mandatory Medication:</label>
                            <div
                                className={`w-6 h-6 border-2 rounded cursor-pointer flex items-center justify-center transition-colors ${
                                    isMandatory ? 'bg-blue-600 border-blue-600' : 'border-gray-400 bg-white'
                                }`}
                                onClick={() => setIsMandatory(!isMandatory)}
                                title="Check if this medication must be given"
                            >
                                {isMandatory && <Check size={16} className="text-white" />}
                            </div>
                        </div>
                        
                        {/* Controlled Medication Checkbox */}
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">Controlled Medication:</label>
                            <div
                                className={`w-6 h-6 border-2 rounded cursor-pointer flex items-center justify-center transition-colors ${
                                    isControlled ? 'bg-blue-600 border-blue-600' : 'border-gray-400 bg-white'
                                }`}
                                onClick={() => setIsControlled(!isControlled)}
                                title="Check if this is a controlled drug"
                            >
                                {isControlled && <Check size={16} className="text-white" />}
                            </div>
                        </div>
                    </div>

                    {/* Location Button (Full Width) */}
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg text-lg transition-colors">
                        Select Location to Administer Medication (Optional)
                    </button>

                    {/* Additional Details Textarea */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Any Additional Client Specific Details?</label>
                        <textarea
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter any specific instructions or details here..."
                        />
                    </div>
                    
                    {/* Warning/Footer Note */}
                    <div className="p-3 bg-yellow-100 border-l-4 border-yellow-500 text-sm text-yellow-800">
                        Event ongoing **"Finish Date"** is not defined.
                    </div>
                </div>

                {/* Modal Footer (Action Buttons) */}
                <div className="p-4 border-t flex justify-end space-x-3 bg-gray-50">
                    <button 
                        onClick={closeModal} 
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                        CANCEL
                    </button>
                    <button 
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
};