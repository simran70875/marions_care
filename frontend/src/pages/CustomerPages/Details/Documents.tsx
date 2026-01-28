import { useState, useRef } from "react";
import { 
  Folder, 
  FileText, 
  Upload, 
  X, 
  Search, 
  Trash2, 
  Edit,
  File
} from "lucide-react";

// --- Types ---
interface DocumentEntry {
  type: 'folder' | 'file';
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  tags: string;
}

// Helper for table controls
const DocumentsTableControls = ({ onAddFolder }: { onAddFolder: () => void }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
    <div className="flex flex-wrap gap-2">
      {['Print', 'CSV', 'Tag Search'].map((label) => (
        <button key={label} className="px-3 py-1 text-xs font-medium bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors dark:text-white shadow-sm">
          {label}
        </button>
      ))}
      <button 
        onClick={onAddFolder}
        className="px-3 py-1 text-xs font-medium bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors dark:text-white shadow-sm"
      >
        Add Folder
      </button>
      <button className="px-3 py-1 text-xs font-medium bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors dark:text-white shadow-sm">
        Files Only
      </button>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">Search:</span>
      <div className="relative">
        <input type="text" className="p-1 pl-8 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:ring-2 focus:ring-blue-500" />
        <Search size={14} className="absolute left-2 top-2 text-gray-400" />
      </div>
    </div>
  </div>
);

export default function DocumentsTab() {
  const [documents, setDocuments] = useState<DocumentEntry[]>([
    { type: 'folder', fileName: 'Body Map', fileSize: '-', uploadedBy: '-', tags: 'Local' },
    { type: 'folder', fileName: 'Contract', fileSize: '-', uploadedBy: '-', tags: 'Local' },
    { type: 'folder', fileName: 'Correspondence', fileSize: '-', uploadedBy: '-', tags: 'Local' },
    { type: 'folder', fileName: 'Referrals', fileSize: '-', uploadedBy: '-', tags: 'Default' },
    { type: 'folder', fileName: 'Support Plan', fileSize: '-', uploadedBy: '-', tags: 'Local' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---
  const handleFileUpload = () => {
    if (!selectedFile) return;

    const newDoc: DocumentEntry = {
      type: 'file',
      fileName: selectedFile.name,
      fileSize: (selectedFile.size / (1024 * 1024)).toFixed(2), // Convert to MB
      uploadedBy: 'Office Admin',
      tags: 'Local'
    };

    setDocuments([...documents, newDoc]);
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const deleteDocument = (index: number) => {
    if(window.confirm("Delete this item?")) {
        setDocuments(documents.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
      
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          Documents
        </h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm font-medium"
        >
          <Upload size={16} />
          Add Document To Profile
        </button>
      </div>

      <DocumentsTableControls onAddFolder={() => alert('Add Folder Logic')} />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">
              <th className="px-6 py-3 w-16 text-center">Type</th>
              <th className="px-6 py-3">File Name</th>
              <th className="px-6 py-3">Size (MB)</th>
              <th className="px-6 py-3">Uploaded By</th>
              <th className="px-6 py-3">Tags</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {documents.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 text-center">
                  {doc.type === 'folder' ? (
                    <Folder className="inline text-orange-400" size={20} fill="currentColor" fillOpacity={0.2} />
                  ) : (
                    <FileText className="inline text-blue-500" size={20} />
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                  {doc.fileName}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{doc.fileSize}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{doc.uploadedBy}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    doc.tags === 'Local' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {doc.tags}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 text-gray-400">
                        <button className="hover:text-blue-500 transition-colors"><Edit size={16} /></button>
                        <button onClick={() => deleteDocument(index)} className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700">
        Showing 1 to {documents.length} of {documents.length} entries
      </div>

      {/* --- UPLOAD MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border dark:border-gray-700">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Upload Document</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Dropzone Area */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    selectedFile ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                
                {selectedFile ? (
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-3 text-blue-600 dark:text-blue-300">
                            <File size={32} />
                        </div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white text-center break-all">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mb-3 text-gray-500">
                            <Upload size={32} />
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to select or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, Word, or Images (Max 10MB)</p>
                    </>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
                <select className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm">
                    <option>Local</option>
                    <option>Default</option>
                    <option>Confidential</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button 
                disabled={!selectedFile}
                onClick={handleFileUpload}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm font-medium"
              >
                Confirm Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}