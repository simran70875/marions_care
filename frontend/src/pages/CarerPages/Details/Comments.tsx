
// --- Mock Data for Comments Tab ---
const commentsData = [
  { 
    date: '2025-10-20', 
    time: '09:37:41', 
    comment: 'Date: 18/10/2025 Time: 18:31 On Call: Ebrahim Call Details: Received a phone call and a follow-up text from Bunmi. Text Message Content: "Charles said he won\'t be in for both fees and bed call. He is staying out tonight and we shouldn\'t bother coming." Action Taken: Message noted for review. No further action required unless circumstances change.', 
    createdBy: 'Office Ch' 
  },
  { 
    date: '2025-10-13', 
    time: '08:58:04', 
    comment: 'Spoke with Charles regarding his foot as he said he is in a lot of pain with it, rang podiatry who said they will keep him down for cancellations as he is struggling with walking. Further to this he said when he wakes up in the morning his room is freezing cold I have emailed Jarod asking him to assist him with the heating.', 
    createdBy: 'Office Chorlton' 
  },
];

// Helper for table controls (Print, CSV, etc.)
const CommentsTableControls = () => (
  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-700">
    <div className="flex flex-wrap gap-2">
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

// --- The Comments Tab Component ---
export default function CommentsTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 p-4">
      
      {/* Header and Add Button */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Admin Comments
        </h2>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Add Comment
        </button>
      </div>

      {/* Date Filter Row */}
      <div className="flex items-center space-x-4 mb-4 text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">Select dates (DD-MM-YYYY)</span>
        <input type="text" defaultValue="20-09-2025" className="p-1 border border-gray-300 rounded w-28 dark:bg-gray-700 dark:border-gray-600" />
        <span>to</span>
        <input type="text" defaultValue="20-10-2025" className="p-1 border border-gray-300 rounded w-28 dark:bg-gray-700 dark:border-gray-600" />
      </div>
      
      {/* Table Controls/Search Bar */}
      <CommentsTableControls />

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-1/12">Date Created</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-6/12">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-1/12">Created By</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-1/12">Edit</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-1/12">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {commentsData.map((comment, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                  {comment.date}
                  <br />
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300 max-w-xl">{comment.comment}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{comment.createdBy}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="px-3 py-1 text-xs font-medium bg-pink-600 text-white rounded hover:bg-pink-700 transition">
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
        Showing 1 to 2 of 2 entries
      </div>
    </div>
  );
}