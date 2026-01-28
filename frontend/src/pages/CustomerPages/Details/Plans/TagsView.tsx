import React, { useState } from 'react';
import TagsModal from './TagsModal';
import { useNavigate } from 'react-router';

// Define the type for a Tag
interface Tag {
    label: string;
    color: string; // Tailwind class for background color
}

// Data for the tags shown on the main page
const initialTags: Tag[] = [
    { label: 'Carers Administer Meds', color: 'bg-blue-500' },
    { label: 'Risk Level: HIGH', color: 'bg-orange-500' },
    { label: 'Stoma', color: 'bg-green-600' },
];

const TagsView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTags, setCurrentTags] = useState(initialTags);

    // This function would be passed to the modal to update tags upon saving
    const handleSaveTags = (newTags: Tag[]) => {
        setCurrentTags(newTags);
        setIsModalOpen(false);
        // In a real app, you would send this data to a server here.
        console.log("Updated Tags:", newTags.map(t => t.label));
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* --- Top Header Bar --- */}
            <div className="bg-blue-300 p-4 text-center relative">
                <h1 className="text-xl font-semibold text-gray-800">Tags</h1>
                <p className="text-sm text-gray-600">Page 1 of 1</p>
                <p className="text-sm font-medium text-gray-700">Client: Charles O'CONNOR</p>
                <button
                    onClick={() => {
                        navigate("/customer/plans/start-plan/1")
                    }}
                    className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded"
                >
                    Back
                </button>
            </div>

            {/* --- Main Content Area --- */}
            <div className="p-8">
                <div className="flex justify-end mb-4">
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                        Add Tag <span className="ml-1 text-base">💎</span>
                    </a>
                </div>

                {/* --- Current Tags Container --- */}
                <div className="p-4 bg-gray-200 border border-gray-300 rounded-lg min-h-[100px] flex flex-wrap items-start space-x-2">
                    {currentTags.map((tag, index) => (
                        <span
                            key={index}
                            className={`${tag.color} text-white text-sm px-3 py-1 rounded-full font-medium shadow-md my-1`}
                        >
                            {tag.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* --- Tags Modal --- */}
            <TagsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTags}
                initialSelectedTags={currentTags}
            />
        </div>
    );
};

export default TagsView;