import React, { useState } from 'react';
import { PlusCircle, Edit3, Trash2, CheckCircle, XCircle } from 'lucide-react';

// --- Static Data ---
interface Category {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
}

const staticCategories: Category[] = [
    { id: 'QA-101', name: 'Quality Assurance', description: 'Monitoring and improving service delivery standards.', isActive: true },
    { id: 'MED-205', name: 'Medication Management', description: 'Protocols for drug administration and inventory.', isActive: true },
    { id: 'FIN-310', name: 'Financial Planning', description: 'Handling client accounts and billing cycles.', isActive: false },
    { id: 'TRA-400', name: 'Staff Training', description: 'Documentation for ongoing professional development.', isActive: true },
    { id: 'ENV-501', name: 'Environmental Safety', description: 'Checklists and procedures for home safety.', isActive: false },
];

// --- Core Category Manager (Static) Component ---

const StaticPlanCategoryManager: React.FC = () => {
    // State is only used for the form fields, which doesn't actually submit anything
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');

    const handleStaticSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a static component, we just log the action
        console.log(`[STATIC ACTION] Attempted to save category: Name: ${newCategoryName}, Description: ${newCategoryDescription}`);
        alert('This is a static demo. Data was not saved.');
    };
    
    // Function to mimic an action without implementation
    const handleStaticAction = (action: string, id: string) => {
        console.log(`[STATIC ACTION] Clicked ${action} for ID: ${id}`);
        alert(`Static action triggered: ${action} on ID ${id}. No changes were made.`);
    }

    return (
        <>
            {/* Page Header (Matching Screenshot Design) */}
            <div className="mb-6 pb-4 border-b border-gray-200">
                {/* Breadcrumb style text for context */}
                <p className="text-sm text-gray-500 mb-1 font-medium">
                    <span className="text-indigo-600">Admin</span> &gt; <span className="text-gray-700">Plans</span>
                </p>
                
                <h1 className="text-3xl font-extrabold text-indigo-700">
                    Plan Category Manager
                </h1>
                <p className="text-gray-600 mt-1">
                    Manage the list of available categories for care plans.
                </p>
            </div>

            {/* Static Add/Edit Category Form - Styled with Indigo */}
            <div id="category-form" className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-indigo-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                    <PlusCircle className="w-5 h-5 mr-2 text-indigo-600" />
                    Add New Category
                </h2>
                <form onSubmit={handleStaticSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name *</label>
                        <input
                            id="categoryName"
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            required
                            placeholder="e.g., Quality Assurance"
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                        <textarea
                            id="categoryDescription"
                            value={newCategoryDescription}
                            onChange={(e) => setNewCategoryDescription(e.target.value)}
                            rows={2}
                            placeholder="A brief explanation of this category's purpose."
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Add Category
                        </button>
                    </div>
                </form>
            </div>

            {/* Static Categories Table - Implementing the Blue Divider Design */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Existing Plan Categories ({staticCategories.length})</h2>
                </div>
                
                <table className="min-w-full">
                    {/* Table Header: White Background, Blue Bottom Border (matching design) */}
                    <thead className="bg-white border-b-2 border-indigo-600">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {staticCategories.map((category) => (
                            // Row styling: White background with a distinct blue bottom border for division
                            <tr 
                                key={category.id} 
                                className="bg-white border-b border-indigo-200 last:border-b-0"
                            >
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
                                    {category.id}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-600">
                                    {category.name}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                                    {category.description || '—'}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => handleStaticAction('Toggle Status', category.id)}
                                        className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                                            category.isActive ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                                        }`}
                                    >
                                        {category.isActive ? (
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                        ) : (
                                            <XCircle className="w-3 h-3 mr-1" />
                                        )}
                                        {category.isActive ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                    <button
                                        onClick={() => handleStaticAction('Edit', category.id)}
                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-100 transition-colors"
                                        title="Edit"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleStaticAction('Delete', category.id)}
                                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-100 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

// --- Main Component (Centered Layout) ---

const PlanCategoryManagerStatic: React.FC = () => {
    return (
        // Wrapper to center content and apply background styling
        <div className="min-h-screen bg-gray-50 font-inter p-4 sm:p-8">
            {/* Centering container with max-w-5xl for slightly wider content */}
            <div className="max-w-5xl mx-auto">
                <StaticPlanCategoryManager />
            </div>
        </div>
    );
};

export default PlanCategoryManagerStatic;
