import { useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

export function UploadDocs() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([
    { name: 'refund_policy_2024.pdf', size: '2.4 MB', status: 'completed' },
    { name: 'faq_shipping.docx', size: '1.1 MB', status: 'completed' }
  ]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Add logic here for actual file upload
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Upload Knowledge Documents</h1>
        <p className="text-slate-400">Add documents to improve the AI's response accuracy.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Upload Area */}
          <div 
            className={`glass-panel border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all ${isDragging ? 'border-violet-500 bg-violet-500/10' : 'border-white/20 hover:border-violet-500/50 hover:bg-white/5'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-inner shadow-black/50">
              <Upload className="text-violet-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Click or drag file to this area to upload</h3>
            <p className="text-slate-400 mb-6">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files.</p>
            <button className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-medium hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Select Files
            </button>
          </div>
        </div>

        {/* Uploaded Files List */}
        <div className="glass-panel border border-white/10 rounded-xl p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-white mb-4">Uploaded Documents</h3>
          <div className="flex-1 overflow-y-auto space-y-3">
            {files.map((file, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-white/5 rounded-lg p-3 flex items-center justify-between group hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-500/20 text-violet-400 rounded-md">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white truncate max-w-[150px]">{file.name}</p>
                    <p className="text-xs text-slate-400">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === 'completed' && <CheckCircle size={16} className="text-emerald-400" />}
                  <button className="text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100">
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
            {files.length === 0 && (
              <div className="text-center text-slate-500 py-8">
                No documents uploaded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
