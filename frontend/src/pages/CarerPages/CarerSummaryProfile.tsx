import { Printer, FileEdit, Truck, MapPin, User, ArrowRight, Eye, Edit3, Star } from "lucide-react";
import React from "react";

// =================================================================
// 1. TYPE DEFINITIONS & DUMMY DATA (Simplified)
// =================================================================

interface ClientDetails {
    title: string;
    fullName: string;
    clientNo: string;
    gender: string;
    dob: string;
    age: number;
    maritalStatus: string;
    jobType: string;
    contactArea: string;
    addressLine1: string;
    addressLine2: string;
    county: string;
    postCode: string;
    phoneHome: string;
    nhsNumber: string;
}

interface AboutMeQA {
    question: string;
    answer: string;
}

interface ContactDetail {
    type: string;
    contact: string;
    tel: string;
    address?: string;
}

interface PreferredCarer {
    name: string;
    hours: string;
    rating: number;
}

const clientData: ClientDetails = {
    title: "Mr",
    fullName: "Charles 'O CONNOR",
    clientNo: "230691",
    gender: "Male",
    dob: "23-Apr-1998",
    age: 27,
    maritalStatus: "Partnered",
    jobType: "MCC SPOT",
    contactArea: "Wythenshawe",
    addressLine1: "Longmire Centre, 181 Langley Lane",
    addressLine2: "Town: Wythenshaw",
    county: "Manchester",
    postCode: "M22 4HY",
    phoneHome: "07744180807",
    nhsNumber: "638 134 4520",
};

const aboutMeContent: AboutMeQA[] = [
    {
        question: "Q: Who is supporting me in filling out this information",
        answer: "A: Charlie is able to help us fill this out himself.",
    },
    {
        question: "Q: Please Do",
        answer: "A: Charlie would like the carers to promote him to get involved in his own care to allow him to build up his strength and ability to complete day to day tasks. Charlie would like carers to be kind a...",
    },
    {
        question: "Q: What is most important to me",
        answer: "A: Charlie said that regaining his independence and get his life as back to normal as possible is something that is very important to him as he has spent a lot time in hospital (14 months)",
    },
    {
        question: "Q: Please Don't",
        answer: "A: Please do not try to take my independence away from me, this is something that is very important to me.",
    },
    {
        question: "Q: People who are important to me",
        answer: "A: Charlie is very close to his brother and sister (and their children), unfortunately his parents have passed away but he is also close to his auntie (who is now his NOK)",
    },
    {
        question: "Q: How and when to support me",
        answer: "A: I am able to walk short distances with my walking stick however due to having my right arm amputated (I require some additional support with carrying things as I am unable). Please help with all me...",
    },
    {
        question: "Q: How I communicate and how to communicate with me",
        answer: "A: Charlie is able to communicate effectively verbally in English and would like the care team to communicate the same.",
    },
    {
        question: "Q: Also worth knowing about me",
        answer: "A: Charlie is a young gentleman that unfortunately was a victim of a stabbing when he was 26. This lead to for a long 14 months in hospital where he had (right arm amputated), multiple other operatio...",
    },
    {
        question: "Q: My wellness",
        answer: "A: Charlie said both his mental and physical health improve when he is eating well and training well in the gym. This is something he would like to make sure he incorporates into his daily life.",
    },
];

const contactData: ContactDetail[] = [
    { type: "Next Of Kin", contact: "Charlie O’Connor", tel: "07744180807", address: "148, The Broadway, Wythenshawe, M22 4HY" },
    { type: "GP Practice", contact: "Dr P S Handa", tel: "0161 998 3326" },
];

const preferredCarers: PreferredCarer[] = [
    { name: "Joe Blogs", hours: "1.2", rating: 5 },
    { name: "Jane Doe", hours: "0.9", rating: 4 },
    { name: "David Smith", hours: "0.5", rating: 5 },
];

// =================================================================
// 2. HELPER COMPONENTS
// =================================================================

/**
 * DetailItem: A simple key-value pair for small details.
 */
const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="flex text-sm py-1">
        <span className="font-medium text-gray-500 w-1/3 min-w-[120px]">{label}:</span>
        <span className="text-gray-800 font-normal flex-1">{value}</span>
    </div>
);

/**
 * InfoCard: Styled card for content sections (Personal Details and Contact).
 */
const InfoCard: React.FC<{ title: string; children: React.ReactNode; isActive?: boolean; icon?: React.ReactNode; editable?: boolean }> = ({ title, children, isActive = false, icon, editable = false }) => (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 h-full">
        <div className="flex justify-between items-start pb-2 mb-2">
            <h3 className="text-base font-semibold text-gray-700">{title}</h3>
            <div className="flex items-center gap-2">
                {isActive && (
                    <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full flex items-center gap-1">
                        Active <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    </span>
                )}
                {icon && <div className="flex gap-2 text-white bg-purple-600 p-2 rounded-lg">{icon}</div>}
                {editable && (
                    <button className="text-gray-400 hover:text-purple-600 transition-colors">
                        <Edit3 size={16} />
                    </button>
                )}
            </div>
        </div>
        <div className="text-sm text-gray-700 space-y-0.5">
            {children}
        </div>
    </div>
);

/**
 * Card for the new four-section grid.
 */
const SectionCard: React.FC<{ title: string; children: React.ReactNode; badge?: string; badgeColor?: string }> = ({ title, children, badge, badgeColor = 'bg-gray-100' }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-semibold text-gray-700 uppercase">{title}</h4>
            <div className="flex items-center space-x-2">
                {badge && (
                    <span className={`text-xs font-medium ${badgeColor} text-gray-700 px-2 py-0.5 rounded-full`}>
                        {badge}
                    </span>
                )}
                <button className="text-gray-400 hover:text-purple-600 transition-colors">
                    <Edit3 size={14} />
                </button>
            </div>
        </div>
        <div className="text-xs text-gray-600 flex-grow">
            {children}
        </div>
    </div>
);

// =================================================================
// 3. MAIN COMPONENT
// =================================================================

export default function App() {
    return (
        <div>
            
            {/* Top Bar / Navigation */}
            <div className=" flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2 text-lg font-medium text-gray-700">
                    <button className="flex items-center px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 transition-colors">
                        <Printer size={14} className="mr-1" /> Print
                    </button>
                    <button className="flex items-center px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 transition-colors">
                        <FileEdit size={14} className="mr-1" /> Add Private Note
                    </button>
                </div>
                
                {/* View Next Client Profile */}
                <div className="text-right">
                    <button className="text-purple-700 text-sm font-semibold hover:underline flex items-center mb-1">
                        View Next Client Profile <ArrowRight size={14} className="ml-1"/>
                    </button>
                    <div className="text-xs text-gray-500">
                        Favour Abodun - <span className="font-semibold text-purple-600">in</span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid (3 Columns) - All cards within this grid now use h-full to match height */}
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* COLUMN 1: Profile Picture */}
                <div className="col-span-1 flex flex-col">
                    <div className="bg-white rounded-lg p-6 flex flex-col items-center justify-center shadow-md border border-gray-200 h-full">
                        
                        {/* Round Profile Picture with Upload Icon */}
                        <div className="relative w-48 h-48 mb-6">
                            {/* Placeholder Image - Round and Purple */}
                            <div className="w-full h-full bg-purple-600 rounded-full border-4 border-purple-300 flex items-center justify-center text-white shadow-xl">
                                <User size={96} />
                            </div>
                            
                            {/* Upload Icon - Positioned on top */}
                            <button 
                                className="absolute bottom-0 right-0 p-2 bg-purple-700 hover:bg-purple-800 text-white rounded-full shadow-lg border-2 border-white transition-colors"
                                title="Click to upload profile picture"
                            >
                                <FileEdit size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: Personal Details */}
                <div className="col-span-1">
                    <InfoCard title="Personal Details" isActive={true}>
                        <DetailItem label="Title" value={clientData.title} />
                        <DetailItem label="Name" value={<span className="font-semibold text-gray-900">{clientData.fullName}</span>} />
                        <DetailItem label="Client No" value={clientData.clientNo} />
                        <DetailItem label="Gender" value={clientData.gender} />
                        <DetailItem label="DOB" value={`${clientData.dob} (Age: ${clientData.age})`} />
                        <DetailItem label="Marital Status" value={clientData.maritalStatus} />
                        <DetailItem label="Job Type" value={clientData.jobType} />
                    </InfoCard>
                </div>

                {/* COLUMN 3: Contact */}
                <div className="col-span-1">
                    <InfoCard 
                        title="Contact" 
                        icon={<> <MapPin size={18} /> <Truck size={18} /> </>}
                    >
                        <DetailItem label="Area" value={clientData.contactArea} />
                        <DetailItem label="Address" value={clientData.addressLine1} />
                        <DetailItem label="Town" value={clientData.addressLine2} />
                        <DetailItem label="County" value={clientData.county} />
                        <DetailItem label="Post Code" value={<span className="font-semibold text-gray-900">{clientData.postCode}</span>} />
                        <DetailItem label="Phone(Home)" value={clientData.phoneHome} />
                        <DetailItem label="NHS number" value={clientData.nhsNumber} />
                    </InfoCard>
                </div>
            </div>

            {/* Section for Add Tag Button */}
            <div className=" mt-6">
                 <button className="px-6 py-2 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500 transition-colors text-sm font-medium">
                    Add Tag
                </button>
            </div>

            {/* SECTION 2: About Me */}
            <div className=" mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                
                {/* Header for About Me section */}
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                    <div className="text-xl font-semibold text-gray-700">About Me</div>
                    <div className="flex space-x-2">
                        <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 bg-blue-50 rounded-md">
                            <Eye size={16} className="mr-1"/> View Updated History
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-gray-800">
                            <Eye size={16} />
                        </button>
                    </div>
                </div>

                {/* "Click to view all" hint */}
                <p className="text-sm text-gray-500 mb-4">(Click <Eye size={14} className="inline-block mx-1 text-purple-600"/> to view all)</p>

                {/* Q&A Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {aboutMeContent.map((item, index) => (
                        <div key={index} className="space-y-1">
                            <p className="font-semibold text-gray-800">{item.question}</p>
                            <p className="text-gray-700 pl-4">{item.answer}</p>
                        </div>
                    ))}
                </div>

                {/* Last Saved Date */}
                <div className="text-right text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
                    Last Saved : 14-10-2025
                </div>
            </div> {/* End About Me section */}
            
            {/* SECTION 3: New Four Cards Grid */}
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                
                {/* CARD 1: Client Bio */}
                <SectionCard title="Client Bio" badge="14-10-2025" badgeColor="bg-blue-100">
                    <p className="line-clamp-4">
                        Charlie is an avid football fan and enjoys watching matches with his brother. He has a great sense of humor and loves reading sci-fi novels in his spare time. He is a generally positive person who is focused on regaining his independence and living life to the fullest despite his recent challenges.
                    </p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">
                        View all
                    </button>
                </SectionCard>

                {/* CARD 2: Contacts */}
                <SectionCard title="Contacts">
                    <div className="space-y-2">
                        {contactData.map((contact, index) => (
                            <div key={index} className="pb-1 border-b border-gray-100 last:border-b-0">
                                <p className="text-gray-900 font-medium">{contact.type} - {contact.contact}</p>
                                <p className="text-gray-500">Tel: {contact.tel}</p>
                                {contact.address && <p className="text-gray-500 line-clamp-1">{contact.address}</p>}
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* CARD 3: Admin Comments */}
                <SectionCard title="Admin Comments" badge="4" badgeColor="bg-orange-100">
                    <p className="text-gray-800 font-medium mb-1">Team Meeting Notes (02/10/2025):</p>
                    <p className="line-clamp-5">
                        Reviewed care plan adherence. Carers are advised to continue encouraging independence, particularly during morning routines. Ensure two-carer assistance is consistently provided for transfers. New medication protocol starting next week, see attached notes for details. Carers must sign off on the new protocol immediately.
                    </p>
                    <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">
                        View all
                    </button>
                </SectionCard>

                {/* CARD 4: Preferred Carer */}
                <SectionCard title="Preferred Carer" badge="3.6 Total" badgeColor="bg-green-100">
                    <div className="text-xs text-gray-800 font-medium grid grid-cols-[1fr_auto_auto] gap-x-2 items-center border-b border-gray-100 py-1">
                        <span className="text-gray-500">Name</span>
                        <span className="text-gray-500">Hrs</span>
                        <span className="text-gray-500">Rating</span>
                    </div>
                    {preferredCarers.map((carer, index) => (
                        <div key={index} className="grid grid-cols-[1fr_auto_auto] gap-x-2 items-center py-1">
                            <span className="font-semibold text-gray-700">{carer.name}</span>
                            <span className="text-gray-600">{carer.hours}</span>
                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star key={i} size={10} fill={i < carer.rating ? "orange" : "gray"} strokeWidth={0} className="text-orange-400" />
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="text-right mt-2 text-gray-500">
                        <span className="font-semibold text-xs">Total Hours: 5.8</span>
                    </div>
                </SectionCard>

            </div> {/* End New Four Cards Grid */}

        </div>
    );
}
