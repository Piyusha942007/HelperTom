import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, CheckCircle2, Loader2, X, FileText, AlertCircle } from 'lucide-react';
import { fakePdfs } from '../../data/fakeData';
import { uploadService } from '../../services/uploadService';

const PdfUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [uploadingProgress, setUploadingProgress] = useState({}); // Progress tracking map by filename
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const data = await uploadService.getDocuments();
        if (data && data.documents) {
          setFiles(data.documents);
        }
      } catch (err) {
        console.error('Failed to fetch documents from RAG backend', err);
        setFiles(fakePdfs);
      } finally {
        setLoadingDocs(false);
      }
    }
    fetchDocs();
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const performUpload = async (fileList) => {
    setErrorMsg('');
    const list = Array.from(fileList);

    for (const file of list) {
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (ext !== '.pdf' && ext !== '.txt') {
        setErrorMsg(`Unsupported file type: ${file.name}. Only PDF and TXT documents are allowed.`);
        continue;
      }

      const sizeString = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(1)} KB`;

      const fileId = Date.now() + Math.random();
      const newFileObj = {
        id: fileId,
        name: file.name,
        size: sizeString,
        status: 'training',
        date: 'Just now'
      };

      // Add to file table immediately
      setFiles((prev) => [newFileObj, ...prev]);
      setUploadingProgress((prev) => ({ ...prev, [file.name]: 0 }));

      try {
        await uploadService.uploadFile(file, (progress) => {
          setUploadingProgress((prev) => ({ ...prev, [file.name]: progress }));
        });

        // Update status to trained
        setFiles((currentFiles) =>
          currentFiles.map((f) => (f.id === fileId ? { ...f, status: 'trained' } : f))
        );
      } catch (err) {
        console.error(err);
        setFiles((currentFiles) =>
          currentFiles.map((f) => (f.id === fileId ? { ...f, status: 'failed' } : f))
        );
        setErrorMsg(`Failed to upload ${file.name}. Ensure the Python server (port 8000) is running.`);
      } finally {
        setUploadingProgress((prev) => {
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

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      performUpload(e.target.files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = async (fileObj) => {
    try {
      setErrorMsg('');
      // Call RAG backend delete endpoint to physically clear the file and ChromaDB vectors
      await uploadService.deleteFile(fileObj.name);
      setFiles((prev) => prev.filter((f) => f.id !== fileObj.id));
    } catch (err) {
      console.error(err);
      // Remove from UI even if backend fails (e.g. mock files that do not exist physically)
      setFiles((prev) => prev.filter((f) => f.id !== fileObj.id));
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Knowledge Base Upload</h1>
        <p className="text-slate-500">Upload PDFs and documents to train your AI ecommerce assistant.</p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3 shadow-md">
          <AlertCircle className="text-rose-500 flex-shrink-0" size={20} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Upload Area */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-colors cursor-pointer ${
              isDragging 
                ? 'border-blue-500 bg-blue-50/50' 
                : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept=".pdf,.txt"
              className="hidden"
            />
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
              <UploadCloud className="text-blue-600 w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Drag & Drop files here</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Supported files: <strong className="font-semibold text-slate-700">PDF</strong>, <strong className="font-semibold text-slate-700">TXT</strong>. All uploaded files will be chunked and parsed into ChromaDB instantly.
            </p>
            <button 
              type="button"
              className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium shadow-md hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
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
                  {loadingDocs ? (
                    <tr>
                      <td colSpan="4" className="text-center py-12 text-sm text-slate-400">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin text-primary" size={18} />
                          <span>Fetching RAG Knowledge Base...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <AnimatePresence>
                      {files.map((file) => {
                        const isUploading = file.status === 'training';
                        const isFailed = file.status === 'failed';
                        const progress = uploadingProgress[file.name] || 0;

                        return (
                          <motion.tr 
                            key={file.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="hover:bg-slate-50/50 transition-colors"
                          >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                                <FileText className="text-red-500 w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <span className="font-semibold text-slate-900 truncate max-w-[150px] sm:max-w-[240px] block" title={file.name}>
                                  {file.name}
                                </span>
                                <span className="text-[10px] text-slate-400 block">{file.date || 'Ingested'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{file.size}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {file.status === 'trained' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                                <CheckCircle2 size={14} /> Trained
                              </span>
                            ) : isFailed ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                                <AlertCircle size={14} /> Failed
                              </span>
                            ) : (
                              <div className="flex flex-col gap-1.5 w-32">
                                <span className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-semibold">
                                  <Loader2 size={14} className="animate-spin" /> Ingesting ({progress}%)
                                </span>
                                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                                  <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {!isUploading && (
                              <button 
                                onClick={() => handleDeleteFile(file)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <X size={18} />
                              </button>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                  )}
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
                <span>Files are embedded on-the-fly and immediately active for RAG lookups in the chat system.</span>
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

