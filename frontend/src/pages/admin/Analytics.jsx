import { motion } from 'framer-motion';
import { BarChart, TrendingUp } from 'lucide-react';
import { fakeStats } from '../../data/fakeData';

const Analytics = () => {
  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
        <p className="text-slate-500">In-depth metrics of your AI performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-border rounded-2xl shadow-sm p-6 flex flex-col justify-between h-48"
        >
           <div>
             <h3 className="text-sm font-medium text-slate-500 mb-1">Response Accuracy</h3>
             <div className="text-4xl font-bold text-slate-900">{fakeStats.accuracyScore}%</div>
           </div>
           <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-full">
             <TrendingUp size={16} /> +2.4% from last week
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-border rounded-2xl shadow-sm p-6 flex items-center justify-center h-48"
        >
           <div className="text-center">
             <BarChart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
             <p className="text-sm text-slate-400 font-medium">Detailed charts unavailable in demo.</p>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
