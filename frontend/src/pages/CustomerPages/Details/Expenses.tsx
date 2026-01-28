

// --- Mock Data for Expenses Tab (Dummy Data Added) ---
const expensesData = [
  { 
    created: '20 Oct 25 15:30', 
    description: 'Receipt for new bathroom cleaning supplies.', 
    date: '20-10-2025', 
    purpose: 'Consumables', 
    walletTransaction: 'Yes', 
    fileUploaded: 'Yes', 
    amount: '£15.50', 
    assignedTo: 'Office Admin', 
    createdBy: 'Feven W.',
    confirmed: 'Yes',
    jobType: 'Standard'
  },
  { 
    created: '18 Oct 25 11:00', 
    description: 'Bus fare for escort to GP appointment.', 
    date: '18-10-2025', 
    purpose: 'Travel', 
    walletTransaction: 'No', 
    fileUploaded: 'No', 
    amount: '£4.00', 
    assignedTo: 'Carer Fund', 
    createdBy: 'Mercy A.',
    confirmed: 'No',
    jobType: 'Appointment'
  },
  { 
    created: '15 Oct 25 09:15', 
    description: 'Purchase of new electric kettle for customer use.', 
    date: '15-10-2025', 
    purpose: 'Equipment', 
    walletTransaction: 'Yes', 
    fileUploaded: 'Yes', 
    amount: '£29.99', 
    assignedTo: 'Office Admin', 
    createdBy: 'Office Ch.',
    confirmed: 'Yes',
    jobType: 'Standard'
  }
];

// Helper for table controls (Rows, Print, CSV, etc.)
const ExpensesTableControls = () => (
  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-700">
    <div className="flex flex-wrap gap-2">
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-white">
        Rows ▼
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-white">
        Print
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-white">
        CSV
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-white">
        Column visibility ▼
      </button>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">Search:</span>
      <input type="text" className="p-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
    </div>
  </div>
);

// --- The Expenses Tab Component ---
export default function ExpensesTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
      
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Expenses
        </h2>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center">
          <i className="fas fa-plus mr-1"></i> Click Here To Add New Expenses
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
      <ExpensesTableControls />

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {['Created', 'Description', 'Date', 'Purpose', 'Wallet Transaction', 'File Uploaded', 'Amount', 'Assigned To', 'Created By', 'Confirmed', 'Edit', 'Delete', 'Job Type'].map(header => (
                <th key={header} className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                  {header} {['Created', 'Description', 'Date', 'Amount', 'Created By'].includes(header) && <i className="fas fa-sort text-gray-400 ml-1"></i>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-xs">
            {expensesData.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-3 py-3 whitespace-nowrap text-gray-900 dark:text-white">{expense.created}</td>
                <td className="px-3 py-3 text-gray-700 dark:text-gray-300 max-w-xs">{expense.description}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{expense.date}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{expense.purpose}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${expense.walletTransaction === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{expense.walletTransaction}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${expense.fileUploaded === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{expense.fileUploaded}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap font-bold text-gray-900 dark:text-white">{expense.amount}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{expense.assignedTo}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{expense.createdBy}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${expense.confirmed === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{expense.confirmed}</span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400">Edit</button>
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <button className="text-red-600 hover:text-red-900 dark:text-red-400">Delete</button>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{expense.jobType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center p-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 3 of 3 entries (Mock)</span>
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