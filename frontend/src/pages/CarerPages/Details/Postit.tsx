

// --- Mock Data for Post-It Tab (Dummy Data Added) ---
const postItData = [
  { 
    id: '345', 
    created: '20 Oct 25 10:30', 
    incidentDate: '20 Oct 25 09:00', 
    status: 'Open', 
    priority: 'High', 
    subject: 'Heating Issue in Room', 
    description: 'Customer reported room is freezing overnight. Email sent to maintenance.', 
    createdBy: 'Office Chorlton' 
  },
  { 
    id: '344', 
    created: '19 Oct 25 14:05', 
    incidentDate: '19 Oct 25 14:05', 
    status: 'Closed', 
    priority: 'Medium', 
    subject: 'Medication Top-up Needed', 
    description: 'Amlodipine running low. Prescription request submitted to GP.', 
    createdBy: 'Feven Weldeselawit' 
  },
  { 
    id: '343', 
    created: '15 Oct 25 08:00', 
    incidentDate: '14 Oct 25 22:30', 
    status: 'Open', 
    priority: 'Low', 
    subject: 'New Carer Introduction', 
    description: 'Note to schedule a double-up shift for Bunmi to introduce her to Charles.', 
    createdBy: 'Office Admin' 
  },
];

// Helper for table controls (Show rows, Print, CSV, etc.)
const PostItTableControls = () => (
  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
    <div className="flex flex-wrap gap-2">
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-gray-900 dark:text-white">
        Show 25 rows ▼
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-gray-900 dark:text-white">
        Print
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-gray-900 dark:text-white">
        Export CSV
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-gray-900 dark:text-white">
        Copy
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

// --- The Post-It Tab Component with Data ---
export default function PostItTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
      
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
          <i className="fas fa-sticky-note mr-2 text-purple-600"></i> Post-It
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">About Charles 'O CONNOR</p>
      </div>

      {/* Date Filter Row */}
      <div className="flex items-center space-x-4 p-4 text-sm border-b border-gray-200 dark:border-gray-700">
        <span className="font-medium text-gray-700 dark:text-gray-300">Initial Date</span>
        <input type="text" defaultValue="06/05/2031" className="p-1 border border-gray-300 rounded w-28 dark:bg-gray-700 dark:border-gray-600" />
        <span className="font-medium text-gray-700 dark:text-gray-300">Final Date</span>
        <input type="text" defaultValue="06/05/2031" className="p-1 border border-gray-300 rounded w-28 dark:bg-gray-700 dark:border-gray-600" />
        <span className="font-medium text-gray-700 dark:text-gray-300">Filter By</span>
        <select className="p-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600">
          <option>Date Created</option>
        </select>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center">
          <i className="fas fa-search mr-1"></i> Search
        </button>
      </div>
      
      {/* Table Controls/Search Bar */}
      <PostItTableControls />

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {['Task ID', 'Created', 'Incident Date', 'Status', 'Priority', 'Subject', 'Description', 'Created By'].map(header => (
                <th key={header} className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                  {header} <i className="fas fa-sort text-gray-400 ml-1"></i>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {postItData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-3 py-3 whitespace-nowrap text-gray-900 dark:text-white font-mono">{item.id}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.created}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.incidentDate}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${item.status === 'Open' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' : 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${item.priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100' : 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100'}`}>
                    {item.priority}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-700 dark:text-gray-300">{item.subject}</td>
                <td className="px-3 py-3 text-gray-700 dark:text-gray-300 max-w-xs truncate">{item.description}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{item.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center p-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 3 of 3 entries (Mock)</span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Previous
          </button>
          <button className="px-3 py-1 text-sm border rounded-md bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600">
            1
          </button>
          <button className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}