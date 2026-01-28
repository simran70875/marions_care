// --- Mock Data for Digital Task Sheet Tab ---
const digitalTasksData = [
  { 
    timeDue: '08:00', 
    timeCompleted: '07:55', 
    task: 'Assist with personal hygiene', 
    status: 'Completed', 
    comments: 'Customer required minimal assistance, in good spirits.', 
    createdBy: 'Yvonne Eaves',
    dateCreated: '20 Oct 25'
  },
  { 
    timeDue: '08:15', 
    timeCompleted: '08:05', 
    task: 'Administer Morning Medication', 
    status: 'Completed', 
    comments: 'Medication administered as per MAR chart. Customer swallowed easily.', 
    createdBy: 'Yvonne Eaves',
    dateCreated: '20 Oct 25'
  },
  { 
    timeDue: '13:00', 
    timeCompleted: '13:10', 
    task: 'Prepare lunch and assist with feeding', 
    status: 'Completed (Late)', 
    comments: 'Arrived 10 mins late due to traffic. Customer enjoyed soup and roll.', 
    createdBy: 'Feven Weldeselawit',
    dateCreated: '19 Oct 25'
  },
  { 
    timeDue: '20:00', 
    timeCompleted: '-', 
    task: 'Tuck in and settle for the night', 
    status: 'Pending', 
    comments: 'Awaiting completion by evening staff.', 
    createdBy: 'Office Chorlton',
    dateCreated: '20 Oct 25'
  },
];

// Helper for table controls (Rows, Print, CSV, etc.)
const DigitalTaskSheetControls = () => (
  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-700">
    <div className="flex flex-wrap gap-2">
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-white">
        Rows ▼
      </button>
      {['Print', 'CSV', 'Column visibility'].map((btn, index) => (
        <button key={index} className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-white">
          {btn}
          {btn.includes('visibility') && ' ▼'}
        </button>
      ))}
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">Search:</span>
      <input type="text" className="p-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
    </div>
  </div>
);

// --- The Digital Task Sheet Tab Component ---
export default function DigitalTaskSheetTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
      
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Task
        </h2>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          View Checker
        </button>
      </div>

      {/* Date Filter Row */}
      <div className="flex items-center space-x-4 p-4 text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">Select dates (DD-MM-YYYY)</span>
        <input type="text" defaultValue="20-09-2025" className="p-1 border border-gray-300 rounded w-28 dark:bg-gray-700 dark:border-gray-600" />
        <span>to</span>
        <input type="text" defaultValue="20-10-2025" className="p-1 border border-gray-300 rounded w-28 dark:bg-gray-700 dark:border-gray-600" />
      </div>
      
      {/* Table Controls/Search Bar */}
      <DigitalTaskSheetControls />

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {['Time Due', 'Time Completed', 'Task', 'Status', 'Comments', 'Created By', 'Date Created'].map(header => (
                <th key={header} className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                  {header} <i className="fas fa-sort text-gray-400 ml-1"></i>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-xs">
            {digitalTasksData.map((task, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-3 py-3 whitespace-nowrap text-gray-900 dark:text-white font-mono">{task.timeDue}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{task.timeCompleted}</td>
                <td className="px-3 py-3 text-gray-700 dark:text-gray-300">{task.task}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    task.status.startsWith('Completed') ? 'bg-green-100 text-green-800' : 
                    task.status.startsWith('Pending') ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-700 dark:text-gray-300 max-w-xs">{task.comments}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{task.createdBy}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{task.dateCreated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center p-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 4 of 4 entries (Mock)</span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 text-sm border rounded-md bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600">
            1
          </button>
          <button className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:border-gray-600 dark:text-gray-300 cursor-not-allowed" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}