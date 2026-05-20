import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageSquare, ArrowRight, Zap } from 'lucide-react';

const UserLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[#F8FAFC]">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 text-center py-20">
        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[10%] w-32 h-32 bg-primary/10 rounded-full blur-3xl hidden md:block"
        />
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-[10%] w-48 h-48 bg-blue-500/10 rounded-full blur-3xl hidden md:block"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
            <Zap size={14} />
            <span>Next-Gen Ecommerce Assistant</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Your personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">shopping AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Experience the future of ecommerce. Get instant answers about products, orders, returns, and recommendations from our intelligent assistant.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/chat')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-colors"
            >
              <MessageSquare size={20} />
              Start Chatting
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Explore Features
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Mockup preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 w-full max-w-4xl h-64 bg-white/60 backdrop-blur-xl border border-white/40 rounded-t-3xl shadow-2xl overflow-hidden relative mx-auto hidden sm:block"
        >
          <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          <div className="p-8 flex flex-col gap-4">
             <div className="w-3/4 h-12 bg-slate-100 rounded-2xl rounded-tl-sm self-start"></div>
             <div className="w-1/2 h-16 bg-primary/10 rounded-2xl rounded-tr-sm self-end"></div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default UserLanding;
