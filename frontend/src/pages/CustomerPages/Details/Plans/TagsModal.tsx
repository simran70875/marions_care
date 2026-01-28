import React, { useState, useEffect } from 'react';

// Define the type for a Tag (same as in TagsView)
interface Tag {
    label: string;
    color: string; // Tailwind class for background color
}

interface TagsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tags: Tag[]) => void;
    initialSelectedTags: Tag[];
}

// --- Comprehensive List of All Available Tags (from image) ---
const availableTagGroups = [
    {
        title: 'Care/Risk Tags',
        tags: [
            { label: 'Carers Administer Meds', color: 'bg-cyan-600' },
            { label: 'DNAR in place', color: 'bg-red-500' },
            { label: 'Family Administer Meds', color: 'bg-blue-600' },
            { label: 'Capacity', color: 'bg-gray-500' },
            { label: 'Lacks Capacity', color: 'bg-orange-400' },
            { label: 'Repositioned', color: 'bg-amber-500' },
            { label: 'Risk Level: HIGH', color: 'bg-orange-500' },
            { label: 'Risk Level: LOW', color: 'bg-yellow-500' },
            { label: 'Risk Level: MEDIUM', color: 'bg-lime-500' },
            { label: 'Self Administer Meds', color: 'bg-green-700' },
        ],
    },
    {
        title: 'Medical Equipment/Procedure Tags',
        tags: [
            { label: 'Catheter', color: 'bg-green-700' },
            { label: 'Cough Assist', color: 'bg-green-700' },
            { label: 'Intermittent Self Catheter', color: 'bg-green-700' },
            { label: 'Conbuliser', color: 'bg-green-700' }, // Assuming Conbuliser is a typo for Nebuliser
            { label: 'Nephrostomy', color: 'bg-green-700' },
            { label: 'PEG Feeding', color: 'bg-green-700' },
            { label: 'Peristeen', color: 'bg-green-700' },
            { label: 'SALT', color: 'bg-green-700' },
            { label: 'Stoma', color: 'bg-green-700' },
        ],
    },
    {
        title: 'Medication/Allergy Tags',
        tags: [
            // Using a distinct blue for Medication tags
            { label: 'Anti-inflammatory', color: 'bg-blue-500' },
            { label: 'Apixaban', color: 'bg-blue-500' },
            { label: 'Clopidogrel', color: 'bg-blue-500' },
            { label: 'Dabigatran', color: 'bg-blue-500' },
            { label: 'Deflammatory', color: 'bg-blue-500' },
            { label: 'Dedication', color: 'bg-blue-500' }, // Assuming this is Dedication / Medication name
            { label: 'Dipyridamole', color: 'bg-blue-500' },
            { label: 'Dust', color: 'bg-blue-500' },
            { label: 'Hayfever', color: 'bg-blue-500' },
            { label: 'Ibuprofen', color: 'bg-blue-500' },
            { label: 'Latex', color: 'bg-blue-500' },
            { label: 'Nitrofurantoin', color: 'bg-blue-500' },
            { label: 'Non-steroidal anti-inflammatory', color: 'bg-blue-500' },
            { label: 'Nuts', color: 'bg-blue-500' },
            { label: 'Penicillin', color: 'bg-blue-500' },
            { label: 'Rivoraxaban', color: 'bg-blue-500' },
            { label: 'Sertraline and Penicillium', color: 'bg-blue-500' },
            { label: 'Trimethoprim antibiotic', color: 'bg-blue-500' },
            { label: 'Warfarin', color: 'bg-blue-500' },
        ],
    },
];

const allAvailableTags: Tag[] = availableTagGroups.flatMap(group => group.tags);

const TagsModal: React.FC<TagsModalProps> = ({ isOpen, onClose, onSave, initialSelectedTags }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>(initialSelectedTags);

    // Effect to reset selected tags when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            // Filter out any initial tags that no longer exist in the master list,
            // but keep the existing ones to maintain the state from TagsView.
            setSelectedTags(initialSelectedTags);
        } else {
            // Clear search term when closing
            setSearchTerm('');
        }
    }, [isOpen, initialSelectedTags]);

    if (!isOpen) return null;

    const filteredTags = allAvailableTags.filter(tag =>
        tag.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isTagSelected = (tag: Tag) =>
        selectedTags.some(t => t.label === tag.label);

    const toggleTag = (tag: Tag) => {
        if (isTagSelected(tag)) {
            setSelectedTags(selectedTags.filter(t => t.label !== tag.label));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleClearPick = () => {
        setSelectedTags([]);
    };

    const handleSave = () => {
        // Find tags in the list that are currently selected to get their correct color/data
        const tagsToSave = allAvailableTags.filter(tag => selectedTags.some(t => t.label === tag.label));
        onSave(tagsToSave);
    };

    // --- Modal Content ---
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-99999">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold">Tags</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl font-light">
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                    {/* Search Bar */}
                    <input
                        type="search"
                        placeholder="Search for tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    />

                    {/* Tags List */}
                    <div className="border p-3 bg-gray-50 rounded">
                        <p className="text-sm font-semibold mb-2 text-gray-700">Tags (Click tags to add)</p>
                        <div className="flex flex-wrap gap-2">
                            {filteredTags.map((tag, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => toggleTag(tag)}
                                    className={`text-white text-xs px-3 py-1 rounded-md font-medium transition-all duration-150 ease-in-out shadow-sm
                                        ${tag.color}
                                        ${isTagSelected(tag) ? 'ring-4 ring-offset-1 ring-yellow-400' : 'hover:opacity-80'}`
                                    }
                                >
                                    {tag.label} {isTagSelected(tag) && <span className="ml-1">✓</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tags to Add/Remove */}
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Tags to add</p>
                        <div className="p-3 border border-gray-300 rounded bg-white min-h-[50px] flex flex-wrap gap-2">
                            {selectedTags.length > 0 ? (
                                selectedTags.map((tag, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`bg-gray-400 text-white text-xs px-3 py-1 rounded-md font-medium shadow-sm hover:bg-red-500 transition`}
                                    >
                                        {tag.label} &times;
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No tags currently selected.</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleClearPick}
                            className="text-blue-600 text-sm font-medium hover:underline"
                        >
                            Clear Pick
                        </button>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end p-4 border-t space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
                    >
                        Exit
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TagsModal;