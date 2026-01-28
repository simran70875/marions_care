import React, { useState } from 'react';
import { Plus, X, Search, ArrowRight, ArrowUp } from 'lucide-react';
import { Box, Button, Typography, TextField } from '@mui/material';

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS 
// =================================================================

// Theme Colors (Tailwind Blue and Purple/Red for contrast)
const PRIMARY_BLUE = '#2563EB'; // Blue-600 (Used for active elements)
const ACCENT_PURPLE = '#6D28D9'; // Purple-700 (Used for modal headers/buttons as seen in screenshots)

interface Outcome {
    id: number;
    name: string;
    events: string[]; // List of linked event/task names
}

// Props for the simple Chip component
interface ChipProps {
    label: string;
    isSelected?: boolean;
    className: string;
    onClick?: () => void;
}

// Props for the Add Outcome Modal
interface AddOutcomeModalProps {
    onClose: () => void;
    onSave: (name: string) => void;
}

// Props for the Assign Events Modal
interface AssignEventsModalProps {
    onClose: () => void;
    onSave: (outcomeId: number, newEvents: string[]) => void;
    outcome: Outcome;
    tasks: string[];
}


const initialOutcomes: Outcome[] = [
    { id: 1, name: "Remain independent", events: ["Medication", "Digital TaskSheet"] },
    { id: 2, name: "Social interaction", events: ["Social inclusion (cinema)", "Tea Time"] },
    { id: 3, name: "Manage personal care", events: ["Assist with dressing", "Personal care"] },
];

const allAvailableTasks: string[] = [
    "Administered Medication", "Assist with dressing", "Assisted with breakfast", 
    "Empty commode", "Prepare Breakfast", "Tea Call", 
    "Apply Cream", "Assist with meals and drinks", "Bed Time", 
    "Personal care", "Social inclusion (cinema)", "Tea Time"
];

// Map task names to a color for visual distinction on the main table
const taskColorMap: { [key: string]: string } = {
    "Medication": 'bg-red-600',
    "Digital TaskSheet": 'bg-amber-500',
    "Social inclusion (cinema)": 'bg-blue-500',
    "Assist with dressing": 'bg-green-600',
    "Personal care": 'bg-fuchsia-600',
    "Tea Time": 'bg-teal-500',
    "Apply Cream": 'bg-orange-600',
    // Default or other tasks
    "Task": 'bg-gray-500',
};


// =================================================================
// 2. MODAL COMPONENTS (Inline for single file mandate)
// =================================================================

// Simple Chip component for consistency (replaces MUI Chip)
const Chip: React.FC<ChipProps> = ({ label, className, onClick = () => {} }) => (
    <div 
        onClick={onClick}
        className={`px-3 py-1 text-xs font-semibold rounded-full cursor-pointer transition ${className}`}
    >
        {label}
    </div>
);


// A. Add Outcome Modal
const AddOutcomeModal: React.FC<AddOutcomeModalProps> = ({ onClose, onSave }) => {
    const [outcomeName, setOutcomeName] = useState<string>('');

    const handleSave = () => {
        if (outcomeName.trim()) {
            onSave(outcomeName.trim());
            setOutcomeName('');
        }
    };

    return (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
                {/* Modal Header (Styled like the screenshot) */}
                <header style={{ backgroundColor: ACCENT_PURPLE }} className="flex justify-between items-center px-6 py-3 text-white">
                    <Typography variant="h6" className="text-lg font-normal">Add Outcome</Typography>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
                        <X size={20} />
                    </button>
                </header>
                
                {/* Modal Body */}
                <div className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Outcome Name"
                            value={outcomeName}
                            onChange={(e) => setOutcomeName(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                </div>
                
                {/* Modal Footer */}
                <footer className="flex justify-end p-4 bg-gray-50 border-t border-gray-200 gap-3">
                    <Button onClick={onClose} variant="outlined" className="text-gray-600 border-gray-300 normal-case hover:bg-gray-100">
                        Close
                    </Button>
                    <Button 
                        onClick={handleSave} 
                        variant="contained" 
                        style={{ backgroundColor: ACCENT_PURPLE }} 
                        className="text-white normal-case shadow-md hover:bg-purple-800"
                    >
                        Save
                    </Button>
                </footer>
            </div>
        </div>
    );
};

// B. Assign Events Modal
const AssignEventsModal: React.FC<AssignEventsModalProps> = ({ onClose, onSave, outcome, tasks }) => {
    // State is a Set<string> for efficient toggling
    const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set(outcome.events));
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleToggleTask = (task: string) => {
        setSelectedTasks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(task)) {
                newSet.delete(task);
            } else {
                newSet.add(task);
            }
            return newSet;
        });
    };
    
    const handleSave = () => {
        // Convert Set back to Array for the save function
        onSave(outcome.id, Array.from(selectedTasks));
    };

    const filteredTasks = tasks.filter((task: string) => 
        task.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
                {/* Modal Header */}
                <header style={{ backgroundColor: ACCENT_PURPLE }} className="flex justify-between items-center px-6 py-3 text-white">
                    <Typography variant="h6" className="text-lg font-normal">Assign Events</Typography>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
                        <X size={20} />
                    </button>
                </header>
                
                {/* Modal Body */}
                <div className="p-6">
                    {/* Top Chips (Task | Medication) */}
                    <div className="flex justify-end gap-2 mb-4">
                        <Chip label="Task" isSelected={true} className="bg-purple-700 text-white" />
                        <Chip label="Medication" isSelected={false} className="bg-gray-200 text-gray-700" />
                    </div>

                    {/* Search Field */}
                    <div className="mb-6">
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                endAdornment: <Search size={16} className="text-gray-400 mr-1" />, 
                            }}
                            className="rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    
                    {/* Task Selection Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {filteredTasks.map((task: string) => {
                            const isSelected = selectedTasks.has(task);
                            return (
                                <button
                                    key={task}
                                    onClick={() => handleToggleTask(task)}
                                    // Use PRIMARY_BLUE for selected state
                                    className={`
                                        p-3 text-sm font-medium rounded-lg text-left shadow-sm transition duration-150 ease-in-out
                                        ${isSelected 
                                            ? 'bg-blue-600 text-white ring-2 ring-blue-500 ring-offset-1' 
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'
                                        }
                                    `}
                                >
                                    {task}
                                </button>
                            );
                        })}
                    </div>

                </div>
                
                {/* Modal Footer */}
                <footer className="flex justify-end p-4 bg-gray-50 border-t border-gray-200 gap-3">
                    <Button onClick={onClose} variant="outlined" className="text-gray-600 border-gray-300 normal-case hover:bg-gray-100">
                        Close
                    </Button>
                    <Button 
                        onClick={handleSave} 
                        variant="contained" 
                        style={{ backgroundColor: ACCENT_PURPLE }} 
                        className="text-white normal-case shadow-md hover:bg-purple-800"
                    >
                        Save
                    </Button>
                </footer>
            </div>
        </div>
    );
};


// =================================================================
// 3. MAIN COMPONENT 🖼️
// =================================================================

const AssignEventsToOutcomes: React.FC = () => {
    const [showAddOutcomeModal, setShowAddOutcomeModal] = useState<boolean>(false);
    const [showAssignEventsModal, setShowAssignEventsModal] = useState<boolean>(false);
    const [outcomes, setOutcomes] = useState<Outcome[]>(initialOutcomes);
    const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Handlers
    const handleAddOutcome = (name: string) => {
        const newOutcome: Outcome = {
            id: Date.now(), // Simple unique ID
            name,
            events: [],
        };
        setOutcomes([newOutcome, ...outcomes]);
        setShowAddOutcomeModal(false);
    };

    const handleAssignEvents = (outcomeId: number, newEvents: string[]) => {
        setOutcomes(prevOutcomes => prevOutcomes.map(o => 
            o.id === outcomeId ? { ...o, events: newEvents } : o
        ));
        setShowAssignEventsModal(false);
        setSelectedOutcome(null);
    };
    
    const openAssignEvents = (outcome: Outcome) => {
        setSelectedOutcome(outcome);
        setShowAssignEventsModal(true);
    };

    // Filtered data based on search
    const filteredOutcomes: Outcome[] = outcomes.filter(o => 
        o.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box className="bg-white">
            
            {/* Header & Add Outcome Button */}
            <Box className="flex items-center justify-between px-0 py-2 border-b border-gray-200 mb-4">
                <Typography variant="h5" className="text-2xl font-normal text-gray-800 mr-4 flex-shrink-0">
                    Assign Events To Outcomes
                </Typography>
                
                <Button
                    variant="contained"
                    onClick={() => setShowAddOutcomeModal(true)}
                    startIcon={<Plus size={18} />}
                    className="normal-case font-semibold text-white shadow-md hover:bg-blue-700"
                    style={{ backgroundColor: PRIMARY_BLUE }}
                >
                    Add Outcome
                </Button>
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
            
            {/* Custom Table Structure (mimicking screenshot) */}
            <Box className="w-full mt-4 border border-gray-300 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 bg-gray-100 font-semibold text-gray-700 border-b border-gray-300">
                    <div className="col-span-4 p-3 border-r border-gray-300 flex items-center gap-1">
                        <span className="text-sm">Outcomes</span>
                        <ArrowUp size={12} className="text-gray-500" />
                    </div>
                    {/* The rest of the columns are dynamic tasks. We just show a placeholder/search here */}
                    <div className="col-span-8 p-3 flex items-center justify-between">
                        <span className="text-sm">Assigned Tasks</span>
                        {/* Example Chip from screenshot */}
                        <Chip label="Medication" className="bg-red-600 text-white" />
                    </div>
                </div>

                {/* Table Rows */}
                {filteredOutcomes.map((outcome: Outcome, index: number) => (
                    <div 
                        key={outcome.id} 
                        className={`grid grid-cols-12 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-blue-50/50`}
                    >
                        {/* Outcomes Column */}
                        <div 
                            className="col-span-4 p-3 border-r border-gray-200 flex items-center gap-3 cursor-pointer"
                            onClick={() => openAssignEvents(outcome)}
                        >
                            <span className="font-semibold text-blue-600 underline hover:text-blue-700 transition">
                                {outcome.name}
                            </span>
                            <ArrowRight size={16} className="text-blue-600" />
                        </div>

                        {/* Assigned Events/Tasks Column */}
                        <div className="col-span-8 p-3 flex flex-wrap gap-2 items-center">
                            {outcome.events.length > 0 ? (
                                outcome.events.map((task: string) => (
                                    <Chip 
                                        key={task} 
                                        label={task} 
                                        className={`${taskColorMap[task] || taskColorMap['Task']} text-white`}
                                    />
                                ))
                            ) : (
                                <span className="text-gray-500 italic">No tasks assigned. Click to assign.</span>
                            )}
                        </div>
                    </div>
                ))}
                
                {filteredOutcomes.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No outcomes found matching "{searchTerm}".
                    </div>
                )}
            </Box>
            
            {/* Footer Pagination */}
            <div className="p-3 border-t flex justify-between items-center text-sm text-gray-600 mt-4">
                <p>Showing 1 to {filteredOutcomes.length} of {outcomes.length} entries</p>
                <Box className="flex items-center gap-2">
                    <Button size="small" className="normal-case text-gray-600">Previous</Button>
                    <Chip label="1" className={`bg-blue-600 text-white rounded-md`} />
                    <Button size="small" className="normal-case text-gray-600">2</Button>
                    <Button size="small" className="normal-case text-gray-600">...</Button>
                    <Button size="small" className="normal-case text-gray-600">Next</Button>
                </Box>
            </div>


            {/* Modals */}
            {showAddOutcomeModal && (
                <AddOutcomeModal 
                    onClose={() => setShowAddOutcomeModal(false)} 
                    onSave={handleAddOutcome} 
                />
            )}

            {showAssignEventsModal && selectedOutcome && (
                <AssignEventsModal
                    onClose={() => setShowAssignEventsModal(false)}
                    onSave={handleAssignEvents}
                    outcome={selectedOutcome}
                    tasks={allAvailableTasks}
                />
            )}

        </Box>
    );
}

export default AssignEventsToOutcomes
