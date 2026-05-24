import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, FileText, Loader2 } from 'lucide-react';
import { fakePdfs } from '../../data/fakeData';
import { uploadService } from '../../services/uploadService';

const KnowledgeBase = () => {
  const [files, setFiles] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const data = await uploadService.getDocuments();
        if (data && data.documents) {
          // Filter to only display trained documents
          const trainedDocs = data.documents.filter(doc => doc.status === 'trained');
          setFiles(trainedDocs);
        } else {
          setFiles(fakePdfs.filter(pdf => pdf.status === 'trained'));
        }
      } catch (err) {
        console.error('Failed to fetch documents from RAG backend', err);
        setFiles(fakePdfs.filter(pdf => pdf.status === 'trained'));
      } finally {
        setLoadingDocs(false);
      }
    }
    fetchDocs();
  }, []);

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Knowledge Base</h1>
        <p className="text-slate-500">Manage your trained AI resources and guidelines.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-border rounded-2xl shadow-sm p-6"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <Database className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-slate-900">Active Training Data</h2>
        </div>
        
        <div className="space-y-4">
          {loadingDocs ? (
            <div className="text-center py-12 text-sm text-slate-400">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin text-primary" size={18} />
                <span>Fetching RAG Knowledge Base...</span>
              </div>
            </div>
          ) : files.length > 0 ? (
            files.map(file => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-red-500">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{file.name}</h4>
                      <p className="text-xs text-slate-500">Trained on {file.date} • {file.size}</p>
                    </div>
                 </div>
                 <button className="text-sm font-medium text-blue-500 hover:underline">View Contents</button>
              </div>
            ))
          ) : (
            <div className="text-center text-slate-500 py-12 flex flex-col items-center justify-center gap-2">
              <FileText size={32} className="text-slate-400" />
              <span className="text-sm">No trained documents found in the Knowledge Base.</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default KnowledgeBase;
