import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, CheckCircle2, Loader2, X, FileText, AlertCircle } from 'lucide-react';
import { fakePdfs } from '../../data/fakeData';

const PdfUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState(fakePdfs);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Fake upload process
    const newFile = {
      id: Date.now(),
      name: e.dataTransfer.files[0]?.name || 'New_Training_Data.pdf',
      size: '1.5 MB',
      status: 'training',
      date: 'Just now'
    };
    
    setFiles([newFile, ...files]);

    // Simulate training completion
    setTimeout(() => {
      setFiles(currentFiles => 
        currentFiles.map(f => f.id === newFile.id ? { ...f, status: 'trained' } : f)
      );
    }, 4000);
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Knowledge Base Upload</h1>
        <p className="text-slate-500">Upload PDFs and documents to train your AI ecommerce assistant.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Upload Area */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-colors ${
              isDragging 
                ? 'border-blue-500 bg-blue-50/50' 
                : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <UploadCloud className="text-blue-600 w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Drag & Drop files here</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Supported files: PDF, DOCX, TXT. Maximum file size 50MB. All uploaded files will be processed by the AI pipeline.
            </p>
            <button className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium shadow-md hover:bg-slate-800 transition-colors">
              Browse Files
            </button>
          </motion.div>

          {/* File List */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Uploaded Documents</h2>
            <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-border text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    <th className="px-6 py-4">File Name</th>
                    <th className="px-6 py-4">Size</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <AnimatePresence>
                    {files.map((file) => (
                      <motion.tr 
                        key={file.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                              <FileText className="text-red-500 w-5 h-5" />
                            </div>
                            <span className="font-medium text-slate-900 truncate max-w-[150px] sm:max-w-[200px] block">{file.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{file.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {file.status === 'trained' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                              <CheckCircle2 size={14} /> Trained
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                              <Loader2 size={14} className="animate-spin" /> Processing AI
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <X size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Info/Policies Area */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-semibold text-blue-900 mb-3">
              <AlertCircle size={20} className="text-blue-600" />
              Upload Guidelines
            </h3>
            <ul className="text-sm text-blue-800 space-y-3">
              <li className="flex items-start gap-2">
                <span className="shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></span>
                <span>Ensure documents contain structured text. Scanned images without OCR will not be processed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></span>
                <span>Do not upload files containing sensitive PII (Personally Identifiable Information) or payment details.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></span>
                <span>Large files (over 20MB) may take up to 15 minutes to fully train the AI model.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-3">Data Privacy Policy</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              All uploaded data is securely encrypted at rest. Our AI model trains exclusively on your tenant's siloed data. None of your proprietary business knowledge is shared globally or used to train public foundational models.
            </p>
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Read full security policy &rarr;</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PdfUpload;
