import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
   FileText, Users, Activity, Target, MessageSquare, 
   ArrowUpRight, ArrowDownRight, MoreHorizontal, User, Loader2
} from 'lucide-react';
import { fakeStats, fakeConversations } from '../../data/fakeData';
import { analyticsService } from '../../services/analyticsService';

const StatCard = ({ title, value, icon: Icon, trend, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
        <Icon className="text-primary w-6 h-6 animate-pulse" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
        trend >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
      }`}>
        {trend >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
  </motion.div>
);

const AdminDashboard = () => {
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
      <div className="h-full min-h-[400px] flex items-center justify-center text-slate-400">
        <Loader2 size={32} className="animate-spin text-primary mr-2" />
        <span>Loading Admin Panel...</span>
      </div>
    );
  }

  const { stats, queriesOverTime } = data;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
          <p className="text-slate-500">Monitor your AI assistant's performance and training metrics in real-time.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Ingested Files" 
          value={stats.documentsUploaded} 
          icon={FileText} 
          trend={12.5} 
          delay={0.1} 
        />
        <StatCard 
          title="Accuracy Score" 
          value={stats.resolutionRate} 
          icon={Target} 
          trend={2.4} 
          delay={0.2} 
        />
        <StatCard 
          title="Active Users" 
          value={stats.activeUsers} 
          icon={Users} 
          trend={1.2} 
          delay={0.3} 
        />
        <StatCard 
          title="AI Conversations" 
          value={stats.totalConversations} 
          icon={MessageSquare} 
          trend={24.8} 
          delay={0.4} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white border border-border rounded-2xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Performance Over Time</h2>
            <button className="text-text-muted hover:text-text-primary"><MoreHorizontal size={20} /></button>
          </div>
          <div className="h-[300px] w-full bg-slate-50 rounded-xl border border-border flex items-end justify-between p-6 gap-2">
            {queriesOverTime.map((h, i) => (
              <div key={i} className="w-full bg-primary/10 rounded-t relative group h-full flex flex-col justify-end">
                <div 
                  className="bg-primary rounded-t transition-all duration-500 hover:bg-primary-hover"
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-border rounded-2xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Recent Conversations</h2>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          
          <div className="space-y-5">
            {fakeConversations.map((conv) => (
              <div key={conv.id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <User className="text-blue-500 w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-medium text-slate-900 truncate">{conv.title}</h4>
                  <p className="text-xs text-slate-500 truncate mb-1">{conv.preview}</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{conv.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

