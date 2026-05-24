import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, TrendingUp, Loader2 } from 'lucide-react';
import { fakeStats } from '../../data/fakeData';
import { analyticsService } from '../../services/analyticsService';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await analyticsService.getDashboardAnalytics();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="h-full min-h-[300px] flex items-center justify-center text-slate-400">
        <Loader2 size={32} className="animate-spin text-primary mr-2" />
        <span>Loading AI Analytics...</span>
      </div>
    );
  }

  const { stats, queriesOverTime } = data;

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
          className="bg-white border border-border rounded-2xl shadow-sm p-6 flex flex-col justify-between h-48 hover:shadow-md transition-shadow"
        >
           <div>
             <h3 className="text-sm font-medium text-slate-500 mb-1">Response Accuracy (RAG Success Rate)</h3>
             <div className="text-4xl font-bold text-slate-900">{stats.resolutionRate}</div>
           </div>
           <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-full">
             <TrendingUp size={16} /> +2.4% from last week
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-border rounded-2xl shadow-sm p-6 flex flex-col justify-between h-48 hover:shadow-md transition-shadow"
        >
           <div>
             <h3 className="text-sm font-medium text-slate-500 mb-1">Knowledge Coverage</h3>
             <div className="text-4xl font-bold text-slate-900">{stats.documentsUploaded} Ingested Docs</div>
           </div>
           <div className="text-xs text-slate-400">
             ChromaDB vector collection is synchronized with active files.
           </div>
        </motion.div>
      </div>

      {/* Queries chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-border rounded-2xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Support Load (Queries over 12 Months)</h3>
        <div className="h-[200px] w-full flex items-end justify-between gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
          {queriesOverTime.map((h, i) => (
            <div key={i} className="w-full bg-blue-500/10 rounded-t relative group h-full flex flex-col justify-end">
              <div 
                className="bg-blue-600 rounded-t transition-all duration-300 group-hover:bg-blue-500"
                style={{ height: `${(h / 150) * 100}%` }}
              ></div>
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap shadow-md">
                {h} queries
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 px-2 text-[10px] text-slate-400 font-semibold uppercase">
          <span>Jan</span>
          <span>Jun</span>
          <span>Dec</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;

