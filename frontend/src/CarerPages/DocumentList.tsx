import { useState, useMemo } from 'react';
import { 
  FileText, Search, MoreVertical, Download, Eye, 
  History, FilePlus, ChevronRight, FolderOpen, ShieldCheck,
  X, Upload,  Info
} from 'lucide-react';

const DocumentListScreen = () => {
  // --- STATE ---
  const [activeCategory, setActiveCategory] = useState('All Documents');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [documents, setDocuments] = useState([
    { id: 'DOC-2024-001', name: 'Advanced Care Directive', resident: 'Arthur Morgan', version: 'v2.1', type: 'Legal & DNACPR', updated: '2 hours ago', status: 'Verified', owner: 'Sarah Thompson' },
    { id: 'DOC-2024-015', name: 'Dietary Assessment - Q1', resident: 'Martha Stewart', version: 'v1.0', type: 'Clinical Assessments', updated: 'Jan 04, 2026', status: 'Pending Review', owner: 'James Wilson' },
    { id: 'DOC-2024-088', name: 'Consent for Vaccination', resident: 'Alice Cooper', version: 'v3.0', type: 'Consent Forms', updated: 'Dec 28, 2025', status: 'Verified', owner: 'Aditya Gupta' },
    { id: 'DOC-2024-102', name: 'Physiotherapy Progress Report', resident: 'John Marston', version: 'v1.4', type: 'Therapy Reports', updated: 'Dec 15, 2025', status: 'Archived', owner: 'Sarah Thompson' }
  ]);

  // --- FILTER LOGIC ---
  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const matchesCategory = activeCategory === 'All Documents' || doc.type === activeCategory || (activeCategory === 'Archive' && doc.status === 'Archived');
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.resident.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, documents]);

  const categories = [
    { name: 'All Documents', count: documents.length },
    { name: 'Clinical Assessments', count: documents.filter(d => d.type === 'Clinical Assessments').length },
    { name: 'Legal & DNACPR', count: documents.filter(d => d.type === 'Legal & DNACPR').length },
    { name: 'Consent Forms', count: documents.filter(d => d.type === 'Consent Forms').length },
    { name: 'Therapy Reports', count: documents.filter(d => d.type === 'Therapy Reports').length },
    { name: 'Archive', count: documents.filter(d => d.status === 'Archived').length },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-50 text-green-700 border-green-100';
      case 'Pending Review': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'Archived': return 'bg-slate-50 text-slate-500 border-slate-100';
      default: return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  const handleFileUpload = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDoc = {
      id: `DOC-2026-0${Math.floor(Math.random() * 900)}`,
      name: formData.get('docName') as string,
      resident: formData.get('resident') as string,
      version: 'v1.0',
      type: formData.get('type') as string,
      updated: 'Just now',
      status: 'Pending Review',
      owner: 'Current User'
    };
    setDocuments([newDoc, ...documents]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] p-6 font-sans text-slate-900">
      
      {/* --- MODAL: UPLOAD DOCUMENT --- */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-999999 flex items-center justify-center p-4">
          <form onSubmit={handleFileUpload} className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-blue-50/30">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Upload Document</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Secure Clinical Vault</p>
              </div>
              <button type="button" onClick={() => setIsUploadModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-all"><X /></button>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Drop Zone Placeholder */}
              <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50/50 group hover:border-blue-400 transition-all cursor-pointer">
                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm font-bold text-slate-700">Drag files here or click to browse</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">PDF, DOCX, JPG (MAX 10MB)</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Document Name</label>
                  <input name="docName" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="e.g. Care Plan" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resident</label>
                  <select name="resident" required className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none">
                    <option value="Arthur Morgan">Arthur Morgan</option>
                    <option value="Martha Stewart">Martha Stewart</option>
                    <option value="Alice Cooper">Alice Cooper</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                <select name="type" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none">
                  {categories.slice(1, -1).map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
                Commit to Library
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center text-sm font-bold text-blue-600 mb-1">
            <span>Reports & Care Plans</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-400">Documents</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <FolderOpen className="w-7 h-7 mr-3 text-blue-600" />
            Resident Document Library
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <History className="w-4 h-4 mr-2" /> Recent Activity
          </button>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <FilePlus className="w-4 h-4 mr-2" /> Upload Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Sidebar: Folder Categories */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2 mb-4">Categories</h3>
          {categories.map((folder) => (
            <button
              key={folder.name}
              onClick={() => setActiveCategory(folder.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeCategory === folder.name 
                ? 'bg-white text-blue-600 shadow-md border-l-4 border-blue-600' 
                : 'text-slate-500 hover:bg-white hover:text-slate-700'
              }`}
            >
              <div className="flex items-center">
                <FileText className={`w-4 h-4 mr-3 ${activeCategory === folder.name ? 'text-blue-600' : 'text-slate-400'}`} />
                {folder.name}
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${activeCategory === folder.name ? 'bg-blue-50' : 'bg-slate-100'}`}>
                {folder.count}
              </span>
            </button>
          ))}
        </div>

        {/* Main List Area */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by filename, resident or ID..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-50">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Document Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Resident</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDocs.length > 0 ? filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-blue-50/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{doc.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{doc.type} • {doc.updated}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-700">{doc.resident}</p>
                      <p className="text-[10px] text-slate-400">{doc.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Eye className="w-4 h-4" /></button>
                        <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"><Download className="w-4 h-4" /></button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <Info className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-400">No documents found in this category.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="p-4 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400 italic flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-green-500" />
                CQC Compliance: Document versioning and audit trails are active.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentListScreen;