import React from 'react';
// Note: useNavigate is removed as we are not implementing routing logic here.

// --- Type Definitions for Sample Data ---
interface ClientTag {
    label: string;
    color: string;
}

interface ClientDetails {
    clientName: string;
    clientNo: string;
    effectiveDate: string;
    completed: string;
    carerName: string;
    revisionNumber: string;
    createdDate: string;
    reviewDate: string;
    tags: ClientTag[];
    // Data that will be editable on this page
    healthSummary: string;
    personalCareSummary: string;
    mobilitySummary: string;
    nutritionSummary: string;
    domesticSummary: string;
    packageSummary: string;
    backgroundSummary: string;
    formCompletedBy: string;
}

// --- Sample Data (Placeholder based on all previous inputs) ---
const mockClientData: ClientDetails = {
    clientName: "Charles O'CONNOR",
    clientNo: '230591',
    effectiveDate: '25-02-2025',
    completed: 'Pending',
    carerName: 'Pending',
    revisionNumber: 'Not Set',
    createdDate: '06 Nov 2025 07:10',
    reviewDate: 'Not Entered',
    tags: [
        { label: 'Carers Administer Meds', color: 'bg-cyan-600' },
        { label: 'Risk Level: HIGH', color: 'bg-orange-500' },
        { label: 'Stoma', color: 'bg-green-600' },
    ],
    healthSummary: "Client has a pendent alarm worn on the wrist. Past history includes minor cardiac events. Currently managing Type 2 Diabetes and requires support with topical creams and inhalers. DNAR is not in place. No known allergies.",
    personalCareSummary: "Requires full support for personal hygiene (bed bath only). Requires assistance with oral hygiene. Incontinence needs are managed via daily changes by carers.",
    mobilitySummary: "Uses a Zimmer frame for short distances. Primarily wheel-chair dependent. Exhibits left sided lower body weakness. Equipment includes a hoist and a perching stool.",
    nutritionSummary: "Specific dietary requirement: Soft food diet due to previous swallowing difficulties (currently under SALT team). Meals are prepared by family/friends.",
    domesticSummary: "Carers assist with laundry, bed linen change, and dishes. Food shopping is supported by family. Lives alone. Carers access the property via a key safe (code 1234).",
    packageSummary: "Package requires 4 visits per day (morning, lunch, tea, bed). Prefers single cover only. No strong gender preference, but requests experienced staff.",
    backgroundSummary: "Family is very supportive and visits daily. Hobbies include reading and gardening (supported). Worked as a retired primary school teacher.",
    formCompletedBy: "Bhushan Mehra (Date: 06-11-2025)",
};

// --- Reusable Component for Data Blocks ---
const DetailBlock: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
    <div className="flex flex-col md:flex-row py-1 border-b border-gray-200">
        <span className="font-semibold text-gray-700 w-full md:w-1/3 text-sm">{label}:</span>
        <span className="text-gray-900 w-full md:w-2/3 text-sm">{value}</span>
    </div>
);

// --- Component for Editable Answer with Action Buttons ---
const EditableSummary: React.FC<{ section: string; summary: string; onEdit: () => void; onAttach: () => void }> = ({ section, summary, onEdit, onAttach }) => (
    <div className="flex flex-col">
        <h5 className="font-extrabold text-md text-blue-700 mb-1">{section}</h5>
        <div className="flex items-start justify-between bg-gray-50 p-2 rounded-md">
            <p className="text-gray-700 text-sm flex-1 pr-4">{summary}</p>
            <div className="flex space-x-2 text-sm">
                <button 
                    onClick={onEdit} 
                    className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
                    title="Edit Section"
                >
                    <span role="img" aria-label="edit">✏️</span> Edit
                </button>
                <button 
                    onClick={onAttach} 
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                    title="Attach Files"
                >
                    <span role="img" aria-label="attachment">📎</span>
                </button>
            </div>
        </div>
    </div>
);


// --- Main Web View Component ---
const ClientPlanWebView: React.FC = () => {
    const data = mockClientData;

    // Placeholder actions for the new buttons
    const handleEdit = (field: string) => {
        alert(`Initiating Edit for: ${field} (In a real app, this would open an inline editor or a modal.)`);
        // Example of updating data:
        // setData(prev => ({ ...prev, healthSummary: 'Updated health summary...' }));
    };

    const handleAttach = (field: string) => {
        alert(`Opening Attachment Modal for: ${field} (In a real app, this would open a file upload/management modal.)`);
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">


            {/* --- 2. Main Dashboard Layout (Sidebar + Content) --- */}
            <div>
     

                {/* Right Content Area */}
                <div>
                    {/* Client Header/Metadata Block */}
                    <div className="bg-white border p-4 shadow-md mb-6 rounded-lg">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Plan: Client Onboarding</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm">
                            <DetailBlock label="Client Name" value={data.clientName} />
                            <DetailBlock label="Effective Date" value={data.effectiveDate} />
                            <DetailBlock label="Client No" value={data.clientNo} />
                            <DetailBlock label="Completed" value={data.completed} />
                            <DetailBlock label="Carer Name" value={data.carerName} />
                            <DetailBlock label="Revision Number" value={data.revisionNumber} />
                            <DetailBlock label="Created" value={data.createdDate} />
                            <DetailBlock label="Review Date" value={data.reviewDate} />
                        </div>
                    </div>

                    {/* --- Initial Care Assessment Summary and Tags --- */}
                    <div className="bg-white border p-4 shadow-md rounded-lg">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-lg font-bold text-blue-600">Initial Care Assessment</h3>
                            <span className="text-sm font-medium text-gray-700">Client: **{data.clientName}**</span>
                        </div>
                        
                        {/* Tags Display */}
                        <div className="mb-6 border-b pb-4">
                            <h4 className="text-md font-bold text-gray-800 mb-2">Associated Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {data.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className={`${tag.color} text-white text-sm px-3 py-1 rounded-full font-medium shadow-sm`}
                                    >
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* --- Interactive Summary Sections --- */}
                        <div className="space-y-6">
                            <EditableSummary 
                                section="HEALTH SUMMARY" 
                                summary={data.healthSummary} 
                                onEdit={() => handleEdit('healthSummary')}
                                onAttach={() => handleAttach('healthSummary')}
                            />
                            <EditableSummary 
                                section="PERSONAL CARE & HYGIENE" 
                                summary={data.personalCareSummary} 
                                onEdit={() => handleEdit('personalCareSummary')}
                                onAttach={() => handleAttach('personalCareSummary')}
                            />
                            <EditableSummary 
                                section="PHYSICAL HEALTH & MOBILITY" 
                                summary={data.mobilitySummary} 
                                onEdit={() => handleEdit('mobilitySummary')}
                                onAttach={() => handleAttach('mobilitySummary')}
                            />
                            <EditableSummary 
                                section="NUTRITION & HYDRATION" 
                                summary={data.nutritionSummary} 
                                onEdit={() => handleEdit('nutritionSummary')}
                                onAttach={() => handleAttach('nutritionSummary')}
                            />
                            <EditableSummary 
                                section="DOMESTIC & PROPERTY ACCESS" 
                                summary={data.domesticSummary} 
                                onEdit={() => handleEdit('domesticSummary')}
                                onAttach={() => handleAttach('domesticSummary')}
                            />
                            <EditableSummary 
                                section="CARE PACKAGE DETAILS" 
                                summary={data.packageSummary} 
                                onEdit={() => handleEdit('packageSummary')}
                                onAttach={() => handleAttach('packageSummary')}
                            />
                            <EditableSummary 
                                section="PERSONAL BACKGROUND & LIKES" 
                                summary={data.backgroundSummary} 
                                onEdit={() => handleEdit('backgroundSummary')}
                                onAttach={() => handleAttach('backgroundSummary')}
                            />

                            <section className="border-t pt-4">
                                <h5 className="font-extrabold text-md text-blue-700 mb-1">ASSESSMENT COMPLETION</h5>
                                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                    <p className="text-gray-700 text-sm flex-1 pr-4">**Form completed by**: {data.formCompletedBy}</p>
                                    <button 
                                        onClick={() => handleEdit('formCompletedBy')} 
                                        className="text-blue-500 hover:text-blue-700 font-medium text-sm flex items-center"
                                        title="Edit Completion Details"
                                    >
                                        <span role="img" aria-label="edit">✏️</span> Edit
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPlanWebView;