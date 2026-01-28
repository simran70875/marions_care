
// --- Mock Data for Notes Tab ---
const notesData = [
  { time: '18 Oct 25 17:10', note: 'Carer notes at home. I also rang to let you know I spoke with the reception - he said he was told to wait for... ', createdBy: 'Parvez', signedBy: 'Parvez', file: true },
  { time: '17 Oct 25 20:02', note: 'Did carer worker notes at home. I also rang to let you know I spoke with the reception - he said he was told to wait for... ', createdBy: 'Office Admin', signedBy: 'Parvez', file: true },
  { time: '17 Oct 25 10:49', note: 'Charles was not home.', createdBy: 'Yvonne Maria Eaves', signedBy: 'Yvonne Maria Eaves', file: false },
  { time: '17 Oct 25 09:37', note: 'Charles was not home. Carer notes at home.', createdBy: 'Office Ch', signedBy: 'Office Ch', file: true },
  { time: '16 Oct 25 22:04', note: 'Charles was very pleasant but I was told to leave him alone as he has been getting angry with me because he has not been sleeping.', createdBy: 'Bunmi Christiana Junaid', signedBy: 'Bunmi Christiana Junaid', file: true },
  { time: '16 Oct 25 20:23', note: 'Go animal. Charles didn\'t want to talk. Told him I was at the door, but he just yelled "leave me alone".', createdBy: 'Mercy Anuoluwapo', signedBy: 'Mercy Anuoluwapo', file: true },
  // Repeat some data to demonstrate scroll and pagination
  { time: '15 Oct 25 11:30', note: 'Charles was told I was waiting, he said ok but was quiet.', createdBy: 'Office Admin', signedBy: 'Feven Weldeselawit', file: true },
  { time: '14 Oct 25 19:54', note: 'He was told to wait for a phone call about his appointments.', createdBy: 'Alisha Nadeem', signedBy: 'Alisha Nadeem', file: true },
  { time: '14 Oct 25 08:38', note: 'Charles went out for a smoke.', createdBy: 'Yvonne Maria Eaves', signedBy: 'Yvonne Maria Eaves', file: false },
];

// Helper for table controls (Print, CSV, etc.)
const NotesTableControls = () => (
  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
      <span className="font-medium">Selected dates (DD-MM-YYYY)</span>
      <input type="text" defaultValue="15-09-2025" className="p-1 border rounded w-28 dark:bg-gray-700 dark:border-gray-600" />
      <span>to</span>
      <input type="text" defaultValue="18-10-2025" className="p-1 border rounded w-28 dark:bg-gray-700 dark:border-gray-600" />
    </div>
    <div className="flex flex-wrap gap-2">
      <button className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-white">
        Rows ▼
      </button>
      {['Print', 'CSV', 'Details only', 'Column visibility'].map((btn, index) => (
        <button key={index} className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors dark:text-white">
          {btn}
          {btn.includes('visibility') && ' ▼'}
        </button>
      ))}
    </div>
  </div>
);

// --- The Notes Tab Component ---
export default function NotesTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Carer Notes For Admin about Charles 'O CONNOR
        </h2>
      </div>

      {/* Controls/Filter Bar */}
      <NotesTableControls />

      {/* Search and Page Info Bar (Matching the screenshot layout) */}
      <div className="flex justify-between items-center p-3">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing 1 to 20 of 78 entries (Mock)
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">Search:</span>
          <input type="text" className="p-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
        </div>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-1/12">Date/Time</th>
              <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-6/12">Note</th>
              <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-2/12">Created By</th>
              <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-2/12">Signed By</th>
              <th className="px-3 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300 w-1/12">File</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-xs">
            {notesData.map((note, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-3 py-3 whitespace-nowrap text-gray-900 dark:text-white">{note.time}</td>
                <td className="px-3 py-3 text-gray-700 dark:text-gray-300">{note.note}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{note.createdBy}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">{note.signedBy}</td>
                <td className="px-3 py-3 whitespace-nowrap text-center">
                  {note.file ? <i className="fas fa-file text-blue-500"></i> : <i className="fas fa-times text-gray-400"></i>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-end items-center p-3 border-t border-gray-200 dark:border-gray-700 space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 20 of 78 entries</span>
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