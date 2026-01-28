import {
    ChevronRight,
    Plus,
    Printer,
    Table,
    Calendar,
    HelpCircle,
    ClipboardCheck,
    X,
    Edit,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CreateMedicationEventModal } from "./CreateMedicationEventModal";

// =================================================================
// 1. TYPE DEFINITIONS
// =================================================================

interface Medication {
    id: number;
    name: string;
    dose: string;
    quantity: number;
    form: string;
    route: string;
    adminStatus: { [key: number]: string }; // key is day number (e.g., 21, 22); value is "Time/Initials"
    type: "Regular" | "PRN" | "Night";
}

interface ClientData {
    name: string;
    dob: string;
    clientId: string;
    gpPractice: string;
    allergies: string;
    currentDate: string;
    medications: Medication[];
}

interface EMARRowProps {
    med: Medication;
    openModal: (id: number) => void;
}

interface MedicationInfoModalProps {
    medication: Medication | undefined;
    closeModal: () => void;
}


// =================================================================
// 1.1 QUICK LINKS DROPDOWN COMPONENT (New Component)
// =================================================================

interface QuickLink {
    name: string;
    route: string;
}

const quickLinks: QuickLink[] = [
    { name: "Medication History", route: "/client/history" },
    { name: "Medication List", route: "/client/medlist" },
    { name: "Medication Cabinet", route: "/client/cabinet" },
    { name: "EMAR History", route: "/client/emar-history" },
];

const QuickLinksDropdown: React.FC<{ setIsOpen: (isOpen: boolean) => void }> = ({ setIsOpen }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);

    const handleLinkClick = (route: string) => {
        console.log(`Navigating to: ${route}`);
        setIsOpen(false);
        // In a real application, you'd use a router function here (e.g., navigate(route))
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-purple-800 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center transition-colors"
            >
                Medication Quick Links <ChevronRight size={16} className="ml-1 rotate-90" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {quickLinks.map((link) => (
                        <a
                            key={link.name}
                            href="#" // Use href="#" or the actual route
                            onClick={(e) => { e.preventDefault(); handleLinkClick(link.route); }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-700"
                            role="menuitem"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

// =================================================================
// 2. DUMMY DATA
// =================================================================

const clientData: ClientData = {
    name: "Charles 'O CONNOR",
    dob: "23-04-1988",
    clientId: "511500",
    gpPractice: "Northenden Group Practice",
    allergies: "None recorded.",
    currentDate: "22-10-2025",
    medications: [
        { id: 1, name: "Loperamide Hydrochloride", dose: "Two capsules twice a day", quantity: 2, form: "Capsule", route: "Orally", adminStatus: { 21: "Morning/JA", 22: "Morning/JA", 23: "Morning/FW", 24: "Morning/FW" }, type: "Regular" },
        { id: 2, name: "Paracetamol Tablet", dose: "Two tablets 4 times a day when required", quantity: 2, form: "Tablet", route: "Orally", adminStatus: { 21: "Any/JA", 22: "Any/JA", 23: "Any", 24: "Any" }, type: "PRN" },
        { id: 3, name: "Pregabalin", dose: "Two To Be Taken Twice A Day", quantity: 1, form: "Capsule", route: "Orally", adminStatus: { 21: "Morning/JA", 22: "Morning/JA", 23: "Morning/FW", 24: "Morning/FW" }, type: "Regular" },
        { id: 4, name: "Venlafaxine modified-release capsules", dose: "Take one capsule once a day", quantity: 1, form: "Capsule", route: "Orally", adminStatus: { 21: "Morning/JA", 22: "Morning/JA", 23: "Morning/FW", 24: "Morning/FW" }, type: "Regular" },
        { id: 5, name: "Zopiclone", dose: "One To Be Taken Each Day - Night", quantity: 1, form: "Tablet", route: "Orally", adminStatus: { 21: "Overnight/JA", 22: "Overnight/JA", 23: "Overnight/FW", 24: "Overnight/FW" }, type: "Night" },
    ],
};

const dateHeaders: number[] = [21, 22, 23, 24];

// =================================================================
// 3. STYLE HELPERS
// =================================================================

const getAdminStyle = (status: string): string => {
    // JA/FW (Initials) imply administered - colored Green
    if (status.includes("JA") || status.includes("FW")) return "bg-green-500 text-white font-semibold";

    // Scheduled Times (Not yet administered)
    if (status.includes("Morning")) return "bg-yellow-200 text-yellow-800";
    if (status.includes("Overnight")) return "bg-gray-200 text-gray-700";
    if (status.includes("Any")) return "bg-pink-100 text-pink-700"; // For PRN

    return "bg-white text-gray-700 border border-gray-300"; // Default
};

// =================================================================
// 4. EMAR ROW COMPONENT
// =================================================================

const EMARRow: React.FC<EMARRowProps> = ({ med, openModal }) => {
    return (
        <tr className="hover:bg-gray-50 border-b border-gray-200">
            {/* Red Alert Pill (if applicable) */}
            <td className="w-5 text-center px-2">
                {med.id === 2 && <span className="text-red-500 font-extrabold text-lg">•</span>}
            </td>

            {/* Medication Name */}
            <td className="px-3 py-2 text-sm text-gray-800 font-medium whitespace-nowrap">
                {med.name}
                {med.id === 2 && <span className="text-xs bg-blue-500 text-white px-1 ml-1 rounded">PRN</span>}
                {med.id === 3 && <span className="text-xs bg-indigo-500 text-white px-1 ml-1 rounded">Free</span>}
            </td>

            {/* Details Button */}
            <td className="text-center w-10">
                <button
                    onClick={() => openModal(med.id)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    title="View Details"
                >
                    <Plus size={16} />
                </button>
            </td>

            {/* Dose */}
            <td className="px-3 py-2 text-sm text-gray-600">{med.dose}</td>

            {/* Quantity, Form, Route */}
            <td className="px-3 py-2 text-sm text-gray-600 w-16 text-center">{med.quantity}</td>
            <td className="px-3 py-2 text-sm text-gray-600 w-20 whitespace-nowrap">{med.form}</td>
            <td className="px-3 py-2 text-sm text-gray-600 w-20 whitespace-nowrap">{med.route}</td>

            {/* Administration Schedule/Status Grid */}
            {dateHeaders.map(day => {
                const status = med.adminStatus[day];
                const [time, initials] = status ? status.split('/') : ["---", ""];

                return (
                    <td key={day} className="px-1 py-1 text-xs text-center w-24">
                        <div
                            className={`p-1 rounded cursor-pointer transition-shadow hover:shadow-lg ${getAdminStyle(status)}`}
                            title={`Status on ${day}: ${initials ? 'Administered by ' + initials : 'Scheduled Time: ' + time}`}
                            onClick={() => console.log(`Triggering administration window for ${med.name} on day ${day}`)}
                        >
                            <span className="font-bold">{time}</span>
                            <div className="text-[10px] opacity-90">{initials}</div>
                        </div>
                    </td>
                );
            })}
        </tr>
    );
};


// =================================================================
// 5. MEDICATION INFO MODAL COMPONENT (UPDATED FOR BLUR BACKGROUND)
// =================================================================

const MedicationInfoModal: React.FC<MedicationInfoModalProps> = ({ medication, closeModal }) => {
    if (!medication) return null;

    // Dummy data for the modal details
    const modalDetails = {
        clientDose: medication.dose,
        maxDose: "2",
        concentration: "2 mg",
        form: medication.form,
        route: medication.route,
        method: "Carers to administer",
        additionalDetails: "Needs to be taken 30 minutes before food.",

        createdDate: "22-09-2025 11:21:43",
        createdBy: "Bhushan Mehra",
        startDate: "25-09-2025",
        endDate: "",
        reviewDate: "",
        repeatEvery: "1 day(s)",
        minGap: "6 hours",
        alerts: false,
    };

    const InfoField: React.FC<{ label: string, value: string }> = ({ label, value }) => (
        <div className="col-span-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
            <input
                type="text"
                value={value}
                readOnly
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800"
            />
        </div>
    );

    return (
        <div className="fixed inset-0  bg-opacity-40 backdrop-filter backdrop-blur-sm flex justify-center items-center z-999999 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

                {/* Modal Header */}
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Medication Info: {medication.name}</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-red-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Content - Grid Layout */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">

                    {/* Medication Details Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InfoField label="Client Dose" value={modalDetails.clientDose} />
                        <InfoField label="Concentration" value={modalDetails.concentration} />
                        <InfoField label="Form" value={modalDetails.form} />

                        <InfoField label="Maximum Dose Witn 24hrs" value={modalDetails.maxDose} />
                        <InfoField label="Route" value={modalDetails.route} />
                        <InfoField label="Method" value={modalDetails.method} />
                    </div>

                    {/* Additional Details & Edit Button */}
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-end mb-2">
                            <label className="block text-xs font-medium text-gray-500">Additional Details:</label>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold flex items-center">
                                <Edit size={14} className="mr-1" /> Edit Details
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={modalDetails.additionalDetails}
                            rows={3}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 resize-none"
                        />
                    </div>

                    {/* Audit & Schedule Details Section */}
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mt-6">Audit & Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InfoField label="Medication Created Date" value={modalDetails.createdDate} />
                        <InfoField label="Medication Created By" value={modalDetails.createdBy} />
                        <InfoField label="Start Date" value={modalDetails.startDate} />

                        <InfoField label="End Date" value={modalDetails.endDate || "N/A"} />
                        <InfoField label="Review Date" value={modalDetails.reviewDate || "N/A"} />
                        <InfoField label="Repeat Every" value={modalDetails.repeatEvery} />

                        <InfoField label="Minimum Gap Between Doses" value={modalDetails.minGap || "N/A"} />

                        {/* Alerts Toggle/Info */}
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                Admits Receiving Missed Medication Alerts:
                            </label>
                            <div className={`w-full p-2 rounded-lg text-sm font-semibold ${modalDetails.alerts ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {modalDetails.alerts ? "YES" : "NO"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t flex justify-end">
                    <button onClick={closeModal} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-semibold">
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
};


// =================================================================
// 6. MAIN EMAR TRACKER COMPONENT
// =================================================================

export default function EMARTracker() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
    const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
    const [selectedMedicationId, setSelectedMedicationId] = useState<number | null>(null);

    const openModal = (id: number) => {
        setSelectedMedicationId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMedicationId(null);
    };

    const openCreateEventModal = () => setIsCreateEventModalOpen(true);
    const closeCreateEventModal = () => setIsCreateEventModalOpen(false);

    return (
        <div className="bg-gray-100">
            <div className=" bg-white rounded-xl shadow-2xl overflow-hidden">

                {/* Header (Matching the screenshot style) */}
                <div className="p-4 md:p-6 bg-purple-50 flex justify-between items-center border-b-2 border-purple-200">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                        E-MAR <span className="text-gray-500 ml-2 font-normal text-lg">(Medication Tracker)</span>
                    </h1>
                    <div className="flex space-x-2">
                        <button
                            onClick={openCreateEventModal} // CALL NEW FUNCTION HERE
                            className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center"
                        >
                            Create Medication Exam
                        </button>
                        {/* Medication Quick Links Dropdown (Conditional Rendering) */}
                        {isQuickLinksOpen ? (
                            <QuickLinksDropdown setIsOpen={setIsQuickLinksOpen} />
                        ) : (
                            <button
                                onClick={() => setIsQuickLinksOpen(true)}
                                className="bg-purple-800 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center transition-colors"
                            >
                                Medication Quick Links <ChevronRight size={16} className="ml-1" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Client Information Panel */}
                <div className="p-4 md:p-6 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-2 text-sm">
                        <p className="font-semibold text-gray-800">
                            Name: <span className="font-normal">{clientData.name}</span>
                        </p>
                        <p className="font-semibold text-gray-800">
                            D.O.B: <span className="font-normal">{clientData.dob}</span>
                        </p>
                        <p className="font-semibold text-gray-800">
                            Client ID: <span className="font-normal">{clientData.clientId}</span>
                        </p>
                        <p className="font-semibold text-gray-800">
                            GP Practice: <span className="font-normal">{clientData.gpPractice}</span>
                        </p>
                    </div>
                    <div className="mt-4 p-2 bg-red-50 border-l-4 border-red-500 text-red-800">
                        <span className="font-semibold">Allergies:</span> {clientData.allergies}
                    </div>
                </div>

                {/* E-MAR Schedule Grid */}
                <div className="p-4 md:p-6">

                    {/* Date and Key */}
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="date"
                            defaultValue={clientData.currentDate.split('-').reverse().join('-')} // Format YYYY-MM-DD
                            onChange={() => { }} // Placeholder
                            className="p-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <div className="flex space-x-3 text-xs font-medium">
                            <span className="px-2 py-1 bg-green-500 text-white rounded">Administered</span>
                            <span className="px-2 py-1 bg-amber-500 text-white rounded">Not Administered</span>
                            <span className="px-2 py-1 bg-red-500 text-white rounded">Refused</span>
                            <span className="px-2 py-1 bg-indigo-500 text-white rounded">Other</span>
                            <span className="px-2 py-1 bg-gray-500 text-white rounded">Cancelled</span>
                            <HelpCircle size={16} className="text-gray-500 cursor-pointer" />
                        </div>
                    </div>

                    {/* Print and View Options */}
                    <div className="flex space-x-4 mb-4 text-sm font-medium border-b pb-2">
                        <button className="text-gray-600 hover:text-blue-600 flex items-center"><Printer size={16} className="mr-1" /> Print</button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center"><ClipboardCheck size={16} className="mr-1" /> EMAR Audit</button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center"><Table size={16} className="mr-1" /> Column visibility</button>
                        <button className="text-gray-600 hover:text-blue-600 flex items-center"><Calendar size={16} className="mr-1" /> Month View</button>
                    </div>

                    {/* Medication Table */}
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-5"></th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                                    <th className="text-center w-10"></th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Done</th>
                                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Quantity</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Form</th>
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Route</th>
                                    {dateHeaders.map(day => (
                                        <th key={day} className="px-1 py-3 text-center text-xs font-semibold text-gray-600 uppercase w-24">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {clientData.medications.map(med => (
                                    <EMARRow key={med.id} med={med} openModal={openModal} />
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td colSpan={7} className="px-3 py-2 text-sm text-gray-500">
                                        Showing 1 to 5 of 5 entries
                                    </td>
                                    <td colSpan={dateHeaders.length} className="text-right px-3 py-2">
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                            Stop All Medication
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

            {/* Render Modal */}
            {isModalOpen && (
                <MedicationInfoModal
                    medication={clientData.medications.find(m => m.id === selectedMedicationId)}
                    closeModal={closeModal}
                />
            )}

            {/* Render NEW Create Medication Event Modal */}
            {isCreateEventModalOpen && (
                <CreateMedicationEventModal
                    clientName={clientData.name}
                    clientDob={clientData.dob}
                    clientId={clientData.clientId}
                    clientGPPractice={clientData.gpPractice}
                    clientAllergies={clientData.allergies}
                    closeModal={closeCreateEventModal}
                />
            )}
        </div>
    );
}