import React, { useState } from 'react';
import {  X, Search, ArrowRight, ArrowUp } from 'lucide-react';
import { Box, Button, Typography, TextField } from '@mui/material';

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

// Theme Colors (Tailwind Blue and Purple for contrast)
const PRIMARY_BLUE = '#2563EB'; // Blue-600
const ACCENT_PURPLE = '#6D28D9'; // Purple-700

// --- Data Types ---

interface ClientTag {
    id: number;
    name: string;
    digitalTaskSheetOutcome: string;
    medicationOutcome: string;
}

interface ModalTag {
    name: string;
    category: 'Required' | 'Bonus' | 'Not compatible';
    isPurple: boolean; // For visual distinction in the modal
}

// --- Dummy Data ---

const initialClientTags: ClientTag[] = [
    { id: 1, name: "DNAR in place", digitalTaskSheetOutcome: "Remaining Independent", medicationOutcome: "N/A" },
    { id: 2, name: "Catheter", digitalTaskSheetOutcome: "Personal Care", medicationOutcome: "N/A" },
    { id: 3, name: "PEG Feeding", digitalTaskSheetOutcome: "Manage Nutrition", medicationOutcome: "N/A" },
    { id: 4, name: "Risk Level: HIGH", digitalTaskSheetOutcome: "N/A", medicationOutcome: "High-Risk Meds" },
    { id: 5, name: "Carers Administer Meds", digitalTaskSheetOutcome: "N/A", medicationOutcome: "Meds Only" },
    { id: 6, name: "Lacks Capacity", digitalTaskSheetOutcome: "Legal Compliance", medicationOutcome: "N/A" },
    { id: 7, name: "Intermittent Self Catheter", digitalTaskSheetOutcome: "N/A", medicationOutcome: "N/A" },
];

const allAvailableModalTags: ModalTag[] = [
    // Required (Various risk/admin tags)
    { name: "DNAR in place", category: 'Required', isPurple: false },
    { name: "Family Administer Meds", category: 'Required', isPurple: false },
    { name: "Has Capacity", category: 'Required', isPurple: false },
    { name: "Lacks Capacity", category: 'Required', isPurple: false },
    { name: "Repositioned", category: 'Required', isPurple: false },
    { name: "Risk Level: HIGH", category: 'Required', isPurple: false },
    { name: "Risk Level: MEDIUM", category: 'Required', isPurple: false },
    { name: "Risk Level: LOW", category: 'Required', isPurple: false },
    { name: "Self Administer Meds", category: 'Required', isPurple: false },
    
    // Medications/Special Procedures (Often purple/darker in screenshot)
    { name: "Catheter", category: 'Required', isPurple: true },
    { name: "Convene", category: 'Required', isPurple: true },
    { name: "Cough Assist", category: 'Required', isPurple: true },
    { name: "Intermittent Self Catheter", category: 'Required', isPurple: true },
    { name: "Nebuliser", category: 'Required', isPurple: true },
    { name: "Nephrostomy", category: 'Required', isPurple: true },
    { name: "PEG Feeding", category: 'Required', isPurple: true },
    { name: "Furosemide", category: 'Required', isPurple: true },
    { name: "SALT", category: 'Required', isPurple: true },
    { name: "Stoma", category: 'Required', isPurple: true },
    
    // Medications (More specific examples)
    { name: "Anti-inflammatory medication", category: 'Bonus', isPurple: true },
    { name: "Apixaban", category: 'Bonus', isPurple: true },
    { name: "Clopidogrel", category: 'Bonus', isPurple: true },
    { name: "Diazepam", category: 'Bonus', isPurple: true },
    { name: "Hayfever", category: 'Bonus', isPurple: true },
    { name: "Ibuprofen", category: 'Bonus', isPurple: true },
];

// =================================================================
// 2. MODAL COMPONENTS (TagSetupModal)
// =================================================================

interface ChipProps {
    label: string;
    isPurple?: boolean;
    onClick?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, isPurple = false, onClick = () => {} }) => {
    const baseStyle = 'px-3 py-1 text-sm font-semibold rounded-full transition cursor-pointer hover:opacity-80';
    const colorStyle = isPurple 
        ? 'bg-purple-800 text-white' 
        : 'bg-red-600 text-white'; // Defaulting non-purple to a distinct color for visibility
        
    return (
        <div 
            onClick={onClick}
            className={`${baseStyle} ${colorStyle}`}
        >
            {label}
        </div>
    );
};

interface TagSetupModalProps {
    onClose: () => void;
    tag: ClientTag; // The tag being configured
}

const TagSetupModal: React.FC<TagSetupModalProps> = ({ onClose, tag }) => {
    // State to manage the active tab: Required | Bonus | Not compatible
    const [activeTab, setActiveTab] = useState<'Required' | 'Bonus' | 'Not compatible'>('Required');
    
    // State for selected tags in the modal (using dummy initial state for demonstration)
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set([
        "DNAR in place", "Catheter", "PEG Feeding", "Apixaban"
    ]));
    
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleToggleTag = (tagName: string) => {
        setSelectedTags(prev => {
            const newSet = new Set(prev);
            if (newSet.has(tagName)) {
                newSet.delete(tagName);
            } else {
                newSet.add(tagName);
            }
            return newSet;
        });
    };

    const filteredTags = allAvailableModalTags
        .filter(t => t.category === activeTab)
        .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden">
                {/* Modal Header (Dark Purple) */}
                <header style={{ backgroundColor: ACCENT_PURPLE }} className="flex justify-between items-center px-6 py-3 text-white">
                    <Typography variant="h6" className="text-xl font-normal">Tag Setup</Typography>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
                        <X size={24} />
                    </button>
                </header>
                
                {/* Modal Tabs and Body */}
                <div className="p-6">
                    {/* Tabs */}
                    <div className="flex gap-0 border-b border-gray-200 mb-6">
                        {['Required', 'Bonus', 'Not compatible'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-150 normal-case
                                    ${activeTab === tab
                                        ? 'border-blue-600 text-blue-600 font-bold'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    
                    {/* Controls Row */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Typography variant="body1" className="text-base font-semibold text-gray-700">
                                {tag.name} Tag Setup
                            </Typography>
                            {/* Outcome Pick button as seen in screenshot */}
                            <Button size="small" variant="contained" style={{ backgroundColor: PRIMARY_BLUE }} className="normal-case">
                                Outcome Pick
                            </Button>
                        </div>
                        
                        <div className="w-1/3">
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Tag search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    endAdornment: <Search size={16} className="text-gray-400 mr-1" />, 
                                }}
                                className="rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Tags Area */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags: (Click tags to add)
                        </label>
                        <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 min-h-[150px] shadow-inner">
                            <div className="flex flex-wrap gap-2">
                                {filteredTags.map((t) => {
                                    const isSelected = selectedTags.has(t.name);
                                    return (
                                        <button 
                                            key={t.name}
                                            onClick={() => handleToggleTag(t.name)}
                                            className={`
                                                px-3 py-1 text-xs font-semibold rounded-lg transition duration-150 ease-in-out shadow-sm
                                                ${isSelected 
                                                    ? 'bg-blue-600 text-white ring-2 ring-blue-500 ring-offset-1' 
                                                    : t.isPurple 
                                                        ? 'bg-purple-800 text-white hover:bg-purple-700'
                                                        : 'bg-red-600 text-white hover:bg-red-500'
                                                }
                                            `}
                                        >
                                            {t.name}
                                        </button>
                                    );
                                })}
                                {filteredTags.length === 0 && (
                                    <span className="text-gray-400 italic">No tags found for "{activeTab}" category.</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Modal Footer */}
                <footer className="flex justify-end p-4 bg-gray-50 border-t border-gray-200 gap-3">
                    <Button onClick={onClose} variant="outlined" className="text-gray-600 border-gray-300 normal-case hover:bg-gray-100">
                        Close
                    </Button>
                    <Button 
                        onClick={() => { console.log('Tags Saved:', Array.from(selectedTags)); onClose(); }} 
                        variant="contained" 
                        style={{ backgroundColor: ACCENT_PURPLE }} 
                        className="text-white normal-case shadow-md hover:bg-purple-800"
                    >
                        Save Tags
                    </Button>
                </footer>
            </div>
        </div>
    );
};


// =================================================================
// 3. MAIN COMPONENT 🖼️
// =================================================================

const ClientTagSetup: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedTag, setSelectedTag] = useState<ClientTag | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const openTagSetupModal = (tag: ClientTag) => {
        setSelectedTag(tag);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTag(null);
    };

    const filteredTags: ClientTag[] = initialClientTags.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box className="bg-white">
            
            {/* Header */}
            <Box className="flex items-center justify-between px-0 py-2 border-b border-gray-200 mb-4">
                <Typography variant="h5" className="text-2xl font-normal text-gray-800 mr-4 flex-shrink-0">
                    Client Tag Setup
                </Typography>
            </Box>
            
            {/* Controls and Search */}
            <Box className="p-1 flex flex-col md:flex-row justify-between items-start md:items-center">
                <Box className="flex flex-wrap gap-2 text-sm font-normal mb-3 md:mb-0">
                    {['Show 50 rows', 'Copy', 'Excel', 'PDF', 'Print', 'Column visibility'].map((label: string) => (
                        <Button 
                            key={label} 
                            size="small" 
                            color="inherit" 
                            className="normal-case font-normal border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            {label}
                        </Button>
                    ))}
                </Box>

                {/* Search Box */}
                <Box className="flex items-center gap-2 w-full md:w-auto">
                    <Typography variant="body2" className="font-bold text-gray-700 flex-shrink-0">
                        Search:
                    </Typography>
                    <TextField
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: 250 }}
                        InputProps={{
                            endAdornment: <Search size={16} className="text-gray-400 mr-1" />, 
                        }}
                        className="rounded-md border-gray-300 shadow-sm"
                    />
                </Box>
            </Box>
            
            {/* Custom Table Structure */}
            <Box className="w-full mt-4 border border-gray-300 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 bg-gray-100 font-semibold text-gray-700 border-b border-gray-300">
                    {/* Client Tag Column */}
                    <div className="col-span-4 p-3 border-r border-gray-300 flex items-center gap-1">
                        <span className="text-sm">Client Tag</span>
                        <ArrowUp size={12} className="text-gray-500" />
                    </div>
                    {/* Assignment Columns */}
                    <div className="col-span-4 p-3 border-r border-gray-300 flex items-center">
                        <span className="text-sm">Digital TaskSheet Assigned to Outcome</span>
                    </div>
                    <div className="col-span-4 p-3 flex items-center">
                        <span className="text-sm">Medication Assigned to Outcome</span>
                    </div>
                </div>

                {/* Table Rows */}
                {filteredTags.map((tag: ClientTag, index: number) => (
                    <div 
                        key={tag.id} 
                        className={`grid grid-cols-12 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-blue-50/50`}
                    >
                        {/* Client Tag Column (Clickable to open modal) */}
                        <div 
                            className="col-span-4 p-3 border-r border-gray-200 flex items-center gap-3 cursor-pointer"
                            onClick={() => openTagSetupModal(tag)}
                        >
                            <span className="text-white font-semibold px-2 py-1 rounded-md"
                                style={{ backgroundColor: ACCENT_PURPLE }}>
                                {tag.name}
                            </span>
                            <ArrowRight size={16} className="text-blue-600" />
                        </div>

                        {/* Digital TaskSheet Outcome Column */}
                        <div className="col-span-4 p-3 border-r border-gray-200 flex items-center">
                            <span className="text-gray-700">
                                {tag.digitalTaskSheetOutcome}
                            </span>
                        </div>

                        {/* Medication Outcome Column */}
                        <div className="col-span-4 p-3 flex items-center">
                            <span className="text-gray-700">
                                {tag.medicationOutcome}
                            </span>
                        </div>
                    </div>
                ))}
                
                {filteredTags.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No client tags found matching "{searchTerm}".
                    </div>
                )}
            </Box>
            
            {/* Footer Pagination */}
            <div className="p-3 border-t flex justify-between items-center text-sm text-gray-600 mt-4">
                <p>Showing 1 to {filteredTags.length} of {initialClientTags.length} entries</p>
                <Box className="flex items-center gap-2">
                    <Button size="small" className="normal-case text-gray-600">Previous</Button>
                    <Chip label="1" isPurple={false} onClick={() => {}} />
                    <Button size="small" className="normal-case text-gray-600">2</Button>
                    <Button size="small" className="normal-case text-gray-600">...</Button>
                    <Button size="small" className="normal-case text-gray-600">Next</Button>
                </Box>
            </div>


            {/* Tag Setup Modal */}
            {showModal && selectedTag && (
                <TagSetupModal 
                    onClose={handleCloseModal}
                    tag={selectedTag}
                />
            )}

        </Box>
    );
}


export default ClientTagSetup;