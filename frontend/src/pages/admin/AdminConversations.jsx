import { motion } from 'framer-motion';
import { MessageSquare, Eye } from 'lucide-react';
import { fakeConversations } from '../../data/fakeData';

const AdminConversations = () => {
  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">User Conversations</h1>
        <p className="text-slate-500">Monitor live AI chats and review past transcripts.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="divide-y divide-slate-100">
          {fakeConversations.map((conv, idx) => (
            <div key={conv.id} className="p-4 hover:bg-slate-50 transition-colors flex justify-between items-center">
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <MessageSquare className="text-blue-500 w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-slate-900 text-sm">User_{conv.id * 892}</h3>
                   <p className="text-slate-500 text-sm mt-0.5">{conv.title}</p>
                   <span className="text-xs text-slate-400 mt-1 block font-medium">{conv.date}</span>
                 </div>
               </div>
               <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50">
                 <Eye size={16} /> View
               </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminConversations;
