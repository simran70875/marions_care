// --- Mock Data for Tasks Tab ---
const tasksData = [
  { 
    date: '07 Oct 25 17:49', 
    task: 'Administered Medicines, Served with Cordials (Juice, Squash)', 
    createdBy: 'Yvonne Maria Eaves' 
  },
  { 
    date: '07 Oct 25 13:22', 
    task: 'Assist With Whatever Service User Needs, Assist With Personal Hygiene As Per Need', 
    createdBy: 'Feven Weldeselawit' 
  },
  { 
    date: '07 Oct 25 12:44', 
    task: 'Administered Medicines, Assist With Whatever Service User Needs, Assist with Snacks/ Supper/ Meal, Served with Cordials (Juice, Squash), Stoma Care, Washed Dishes', 
    createdBy: 'Alisha Nadeem' 
  },
  { 
    date: '07 Oct 25 07:59', 
    task: 'Administered Medicines, Assist With Whatever Service User Needs, Assist With Personal Hygiene As Per Need, Served with Cordials (Juice, Squash), Washed Dishes', 
    createdBy: 'Yvonne Maria Eaves' 
  },
  { 
    date: '07 Oct 25 07:55', 
    task: 'Administered Medicines, Assist With Whatever Service User Needs, Assist With Personal Hygiene As Per Need', 
    createdBy: 'Jey Addibanglo' 
  },
  { 
    date: '06 Oct 25 08:00', 
    task: 'Assist with Clothing (Changing/ Dressing), Administered Medicines, Assist With Whatever Service User Needs, Assist With Personal Hygiene As Per Need, Served with Cordials (Juice, Squash), Stoma Care, Washed Dishes', 
    createdBy: 'Mercy Anuoluwapo' 
  },
  { 
    date: '06 Oct 25 08:00', 
    task: 'Administered Medicines, Assist With Whatever Service User Needs, Assist With Personal Hygiene As Per Need, Assist with Snacks/ Supper/ Meal, Served with Cordials (Juice, Squash)', 
    createdBy: 'Feven Weldeselawit' 
  },
  { 
    date: '06 Oct 25 08:00', 
    task: 'Assist with Clothing (Changing/ Dressing), Prepare Meal, Administered Medicines, Assist With Whatever Service User Needs, Served with Cordials (Juice, Squash)', 
    createdBy: 'Yvonne Maria Eaves' 
  },
  { 
    date: '06 Oct 25 08:00', 
    task: 'Administered Medicines, Assist With Whatever Service User Needs As Per Need, Served with Bowel Care (Coffee), Stoma Care', 
    createdBy: 'Mercy Anuoluwapo' 
  },
  { 
    date: '06 Oct 25 08:00', 
    task: 'Assist With Whatever Service User Needs, Stoma Care', 
    createdBy: 'Jey Addibanglo' 
  },
];

// Helper for table controls (Rows, Print, CSV, etc.)
const TasksTableControls = () => (
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

// --- The Tasks Tab Component ---
export default function TasksTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
      
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Tasks Completed
        </h2>
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">48 tasks completed</span>
      </div>

      {/* Date Filter Row */}
      <div className="flex items-center space-x-4 p-4 text-sm border-b border-gray-200 dark:border-gray-700">
        <span className="font-medium text-gray-700 dark:text-gray-300">Selected dates (DD-MM-YYYY)</span>
        <input type="text" defaultValue="29-09-2025" className="p-1 border border-gray-300 rounded w-28 dark:bg-gray-700 dark:border-gray-600" />
        <span>to</span>
        <input type="text" defaultValue="29-10-2025" className="p-1 border border-gray-300 rounded w-28 dark:bg-gray-700 dark:border-gray-600" />
      </div>
      
      {/* Table Controls/Search Bar */}
      <TasksTableControls />

      {/* Table Structure */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-scroll"> {/* Added max-height for scroll as seen in screenshot */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10"> {/* Sticky header for scrolling */}
            <tr>
              <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-1/12">Date/Time</th>
              <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-7/12">Tasks</th>
              <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-4/12">Created By</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-xs">
            {tasksData.map((task, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-3 py-3 whitespace-nowrap text-gray-900 dark:text-white">{task.date}</td>
                <td className="px-3 py-3 text-gray-700 dark:text-gray-300">{task.task}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{task.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center p-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 20 of 25 entries (Mock)</span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 text-sm border rounded-md text-gray-500 dark:border-gray-600 cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1 text-sm border rounded-md bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600">
            1
          </button>
          <button className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            2
          </button>
          <button className="px-3 py-1 text-sm border rounded-md text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}