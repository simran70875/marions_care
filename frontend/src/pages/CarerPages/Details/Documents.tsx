
// --- Mock Data for Documents Tab ---
const documentsData = [
  { type: 'folder', fileName: 'Body Map', fileSize: '-', uploadedBy: '-', tags: 'Local' },
  { type: 'folder', fileName: 'Contract', fileSize: '-', uploadedBy: '-', tags: 'Local' },
  { type: 'folder', fileName: 'Correspondence', fileSize: '-', uploadedBy: '-', tags: 'Local' },
  { type: 'folder', fileName: 'Referrals', fileSize: '-', uploadedBy: '-', tags: 'Default' },
  { type: 'folder', fileName: 'Support Plan', fileSize: '-', uploadedBy: '-', tags: 'Local' },
];

// Helper for table controls (Print, CSV, etc.)
const DocumentsTableControls = () => (
  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
    <div className="flex flex-wrap gap-2">
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-gray-900 dark:text-white">
        Print
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-gray-900 dark:text-white">
        CSV
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-gray-900 dark:text-white">
        Tag Search
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-gray-900 dark:text-white">
        Add Folder
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-gray-900 dark:text-white">
        Files Only
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-gray-900 dark:text-white">
        Column visibility ▼
      </button>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">Search:</span>
      <input type="text" className="p-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
    </div>
  </div>
);

// --- The Documents Tab Component ---
export default function DocumentsTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
      
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Documents
        </h2>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Add Document To Profile
        </button>
      </div>

      {/* Table Controls/Search Bar */}
      <DocumentsTableControls />

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-1/12">Type</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-3/12">File Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-1/12">File Size(MB)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-2/12">Uploaded By</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-2/12">Tags</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-1/12">Option</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-2/12">Options</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {documentsData.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                  {/* Folder Icon */}
                  <i className="fas fa-folder text-orange-500 mr-2"></i>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-600 dark:text-blue-400 font-medium cursor-pointer">
                  {doc.fileName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{doc.fileSize}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{doc.uploadedBy}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${doc.tags === 'Local' ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}`}>
                    {doc.tags}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Row */}
      <div className="p-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        Showing 1 to 5 of 5 entries
      </div>
    </div>
  );
}