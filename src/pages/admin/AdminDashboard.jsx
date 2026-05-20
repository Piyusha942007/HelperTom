import { motion } from 'framer-motion';
import { 
  FileText, Users, Activity, Target, MessageSquare, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal 
} from 'lucide-react';
import { fakeStats, fakeConversations } from '../../data/fakeData';

const StatCard = ({ title, value, icon: Icon, trend, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
        <Icon className="text-blue-500 w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
        trend > 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
      }`}>
        {trend > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
  </motion.div>
);

const AdminDashboard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard overview</h1>
          <p className="text-slate-500">Monitor your AI assistant's performance and training metrics.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Knowledge PDFs" 
          value={fakeStats.totalPdfs} 
          icon={FileText} 
          trend={12.5} 
          delay={0.1} 
        />
        <StatCard 
          title="Accuracy Score" 
          value={`${fakeStats.accuracyScore}%`} 
          icon={Target} 
          trend={2.4} 
          delay={0.2} 
        />
        <StatCard 
          title="Active Users" 
          value={fakeStats.activeUsers} 
          icon={Users} 
          trend={-1.2} 
          delay={0.3} 
        />
        <StatCard 
          title="AI Conversations" 
          value={fakeStats.conversations} 
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
          <div className="h-[300px] w-full bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center">
            {/* Chart Placeholder */}
            <div className="text-center">
              <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">Chart visualization will appear here</p>
            </div>
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
            <button className="text-blue-500 text-sm font-medium hover:underline">View All</button>
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
