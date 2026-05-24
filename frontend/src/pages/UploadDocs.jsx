import { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { uploadService } from '../services/uploadService';

export function UploadDocs() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([
    { name: 'refund_policy_2024.pdf', size: '2.4 MB', status: 'completed' },
    { name: 'faq_shipping.txt', size: '1.1 KB', status: 'completed' }
  ]);
  const [uploadingFiles, setUploadingFiles] = useState({}); // Track upload progress by file name
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const performUpload = async (fileList) => {
    setErrorMsg('');
    const newFiles = Array.from(fileList);
    
    for (const file of newFiles) {
      // Validate extensions
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (ext !== '.txt' && ext !== '.pdf') {
        setErrorMsg(`Unsupported file type: ${file.name}. Only .txt and .pdf documents are supported.`);
        continue;
      }

      // Add to uploading queue
      const fileSizeString = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(1)} KB`;
      
      const newFileObj = {
        name: file.name,
        size: fileSizeString,
        status: 'uploading'
      };

      // Add to list and set progress to 0%
      setFiles((prev) => [newFileObj, ...prev]);
      setUploadingFiles((prev) => ({ ...prev, [file.name]: 0 }));

      try {
        await uploadService.uploadFile(file, (progress) => {
          setUploadingFiles((prev) => ({ ...prev, [file.name]: progress }));
        });

        // Mark as completed
        setFiles((prev) => 
          prev.map((f) => f.name === file.name ? { ...f, status: 'completed' } : f)
        );
      } catch (err) {
        console.error(err);
        setFiles((prev) => 
          prev.map((f) => f.name === file.name ? { ...f, status: 'failed' } : f)
        );
        setErrorMsg(`Failed to upload ${file.name}. Ensure the Python server (port 8000) is running.`);
      } finally {
        setUploadingFiles((prev) => {
          const updated = { ...prev };
          delete updated[file.name];
          return updated;
        });
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      performUpload(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      performUpload(e.target.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = (fileName) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Upload Knowledge Documents</h1>
          <p className="text-slate-400">Add policies and PDFs to train the AI's document retrieval pipeline.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-300 text-sm flex items-center gap-3 shadow-md">
          <AlertCircle className="text-rose-400 flex-shrink-0" size={20} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Upload Area */}
          <div 
            className={`glass-panel border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${isDragging ? 'border-violet-500 bg-violet-500/10' : 'border-white/10 hover:border-violet-500/50 hover:bg-white/5'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".txt,.pdf"
              className="hidden"
            />
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-inner shadow-black/50 border border-white/5">
              <Upload className="text-violet-400 animate-pulse" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Click or drag files here to upload</h3>
            <p className="text-slate-400 mb-6 text-sm max-w-md">
              Supports **PDF** or **TXT** policies. RAG ingestion will parse text splitters and save vector weights instantly.
            </p>
            <button 
              type="button"
              className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-medium hover:bg-slate-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              Select Files
            </button>
          </div>
        </div>

        {/* Uploaded Files List */}
        <div className="glass-panel border border-white/10 rounded-2xl p-6 flex flex-col h-full overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4">Uploaded Documents</h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {files.map((file, idx) => {
              const isUploading = file.status === 'uploading';
              const isFailed = file.status === 'failed';
              const progress = uploadingFiles[file.name] || 0;

              return (
                <div key={idx} className="bg-slate-800/40 border border-white/5 rounded-xl p-3.5 flex flex-col gap-2 group hover:bg-slate-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-md ${isFailed ? 'bg-rose-500/20 text-rose-400' : 'bg-violet-500/20 text-violet-400'}`}>
                        {isUploading ? <Loader2 size={18} className="animate-spin text-violet-400" /> : <FileText size={18} />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate max-w-[140px] md:max-w-[180px]" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'completed' && <CheckCircle size={16} className="text-emerald-400" />}
                      {isFailed && <AlertCircle size={16} className="text-rose-400" />}
                      {!isUploading && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteFile(file.name); }}
                          className="text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-700/50"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Upload Progress Bar */}
                  {isUploading && (
                    <div className="w-full mt-1">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-semibold">
                        <span>Ingesting...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-300" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {files.length === 0 && (
              <div className="text-center text-slate-500 py-12 flex flex-col items-center justify-center gap-2">
                <FileText size={32} className="text-slate-600 animate-pulse" />
                <span className="text-sm">No training documents.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

