import { useState } from "react";
import { X, Save, Trash2, Edit } from "lucide-react";

// --- Types ---
interface CommentEntry {
  date: string;
  time: string;
  comment: string;
  createdBy: string;
}

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
  // State for Managing Comments
  const [comments, setComments] = useState<CommentEntry[]>([
    { 
      date: '2025-10-20', 
      time: '09:37:41', 
      comment: "Charles said he won't be in for both fees and bed call. He is staying out tonight and we shouldn't bother coming.", 
      createdBy: 'Office Ch' 
    },
    { 
      date: '2025-10-13', 
      time: '08:58:04', 
      comment: 'Spoke with Charles regarding his foot as he said he is in a lot of pain with it, rang podiatry.', 
      createdBy: 'Office Chorlton' 
    },
  ]);

  // State for Modal and Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  // Logic: Add Comment
  const handleAddComment = () => {
    if (!newCommentText.trim()) return;

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0];

    const newEntry: CommentEntry = {
      date: formattedDate,
      time: formattedTime,
      comment: newCommentText,
      createdBy: "Admin User", // This would usually come from your Auth context
    };

    setComments([newEntry, ...comments]); // Add to top of list
    setNewCommentText("");
    setIsModalOpen(false);
  };

  // Logic: Delete Comment
  const deleteComment = (index: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments(comments.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 p-4 relative">
      
      {/* Header and Add Button */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Admin Comments
        </h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium shadow-sm"
        >
          + Add Comment
        </button>
      </div>

      {/* Date Filter Row */}
      <div className="flex items-center space-x-4 mb-4 text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">Select dates (DD-MM-YYYY)</span>
        <input type="text" defaultValue="20-09-2025" className="p-1 border border-gray-300 rounded w-32 dark:bg-gray-700 dark:border-gray-600" />
        <span className="dark:text-gray-400">to</span>
        <input type="text" defaultValue="20-10-2025" className="p-1 border border-gray-300 rounded w-32 dark:bg-gray-700 dark:border-gray-600" />
      </div>
      
      <CommentsTableControls />

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300">Date Created</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300">Created By</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {comments.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                  <span className="font-medium">{item.date}</span>
                  <br />
                  <span className="text-xs text-gray-500">{item.time}</span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300 max-w-xl break-words">
                  {item.comment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 font-medium">
                  {item.createdBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded dark:hover:bg-yellow-900/30">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteComment(index)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded dark:hover:bg-red-900/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Row */}
      <div className="p-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        Showing 1 to {comments.length} of {comments.length} entries
      </div>

      {/* --- ADD COMMENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border dark:border-gray-700">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Add New Admin Comment</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Comment
              </label>
              <textarea
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                placeholder="Type the administrative note here..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                Save Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}