import { motion } from 'framer-motion';
import { History, Search } from 'lucide-react';
import { fakeConversations } from '../../data/fakeData';

const Conversations = () => {
  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Conversations</h1>
          <p className="text-slate-500">Your chat history with the AI Assistant.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search history..." 
            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="divide-y divide-slate-100">
          {fakeConversations.map((conv, idx) => (
            <div key={conv.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-4">
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <History className="text-slate-500 w-5 h-5" />
               </div>
               <div>
                 <h3 className="font-semibold text-slate-900 text-sm">{conv.title}</h3>
                 <p className="text-slate-500 text-sm mt-0.5">{conv.preview}</p>
                 <span className="text-xs text-slate-400 mt-2 block font-medium">{conv.date}</span>
               </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Conversations;
