import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Database, LayoutDashboard, BrainCircuit } from 'lucide-react';

const AdminLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[#F8FAFC]">
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 text-center py-20">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl flex flex-col items-center relative"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 font-medium text-sm mb-6 border border-blue-500/20 shadow-sm">
            <BrainCircuit size={14} />
            <span>AI Knowledge Base Management</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Train your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">ecommerce AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Upload PDFs, manage knowledge bases, and monitor the performance of your AI assistant. The complete command center for your store's AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/admin/dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-colors"
            >
              <LayoutDashboard size={20} />
              Open Dashboard
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/admin/upload')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Database size={20} />
              Upload Data
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLanding;
