import React from 'react';
import { Info } from 'lucide-react';

// Reusable component for each "About Me" question/answer section
interface AboutMeSectionProps {
    label: string;
    answer: string;
    infoText?: string;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ label, answer, infoText }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
            <label className="block text-base font-semibold text-gray-800 mb-2 flex items-center">
                {label}
                {infoText && (
                    <span className="ml-2 text-gray-500 cursor-help" title={infoText}>
                        <Info className="w-4 h-4" />
                    </span>
                )}
            </label>
            <textarea
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
                rows={Math.max(1, Math.ceil(answer.length / 80))} // Adjust rows based on content length
                value={answer}
            />
        </div>
    );
};

// Main AboutMePage Component
const AboutMePage: React.FC = () => {
    return (
        <div>
            <div className=" bg-white rounded-xl shadow-lg p-6 md:p-8">
                {/* Header Section */}
                <div className="mb-8 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">About Me - <span className="text-indigo-600">Ellisha Bickerton</span></h1>
                    <p className="text-gray-500 text-sm">
                        Details describing Ellisha's personal preferences and needs.
                    </p>
                </div>

                {/* About Me Sections */}
                <div className="space-y-6">
                    <AboutMeSection
                        label="Who is supporting me in filling out this information"
                        answer="Myself"
                        infoText="Who provided the responses to these questions."
                    />
                    <AboutMeSection
                        label="What is most important to me"
                        answer="It is important to me to continue with my independence and remain on the positive track."
                        infoText="Key priorities and values for the individual."
                    />
                    <AboutMeSection
                        label="People who are important to me"
                        answer="Friends and Family"
                        infoText="Individuals or groups significant in the client's life."
                    />
                    <AboutMeSection
                        label="How I communicate and how to communicate with me"
                        answer="I can communicate and can express my views."
                        infoText="Preferred communication methods and any specific considerations."
                    />
                    <AboutMeSection
                        label="My wellness"
                        answer="My goal is to move back to Wigan where I am familiar with the surroundings and I am able to strive there independently."
                        infoText="Client's goals and aspirations related to their well-being."
                    />
                    <AboutMeSection
                        label="Please Do"
                        answer="Support me with everyday activities."
                        infoText="Actions or practices that are beneficial and appreciated."
                    />
                    <AboutMeSection
                        label="Please Don't"
                        answer="Currently residing at a refuge, be mindful when accessing the building."
                        infoText="Actions or practices that should be avoided."
                    />
                    <AboutMeSection
                        label="How and when to support me"
                        answer="Needs support in accessing community, local shops and pharmacy. Need help with everyday cooking and maintaining my environment. Needs help with the personal care as I am Autistic and struggles with complex PTSD."
                        infoText="Specific guidance on providing support."
                    />
                    <AboutMeSection
                        label="Also worth knowing about me"
                        answer="Due to the decline in my both mental and physical health I need help and follow through with my daily tasks."
                        infoText="Any additional important information or background."
                    />
                </div>

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-right">
                    <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;
