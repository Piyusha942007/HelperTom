import { TrendingUp, Users, FileText, Bot, AlertCircle, MessageSquare } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, Admin</h1>
        <p className="text-slate-400">Here's what's happening with your AI Assistant today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={MessageSquare} label="AI Conversations" value="1,248" trend="+12.5%" />
        <StatCard icon={TrendingUp} label="Automated Sales" value="$14,500" trend="+8.2%" />
        <StatCard icon={Users} label="Human Escalations" value="24" trend="-3.1%" trendDown />
        <StatCard icon={Bot} label="AI Accuracy" value="98.2%" trend="+1.1%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Placeholder: AI Training Status */}
        <div className="lg:col-span-2 glass-panel border border-white/10 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">AI Training Status</h2>
            <button className="text-violet-400 text-sm hover:text-violet-300 transition-colors">View Details</button>
          </div>
          <div className="space-y-3 flex-1">
            <TrainingItem title="Return Policy 2026.pdf" status="Completed" date="Today, 09:41 AM" />
            <TrainingItem title="Spring Collection Catalog" status="Training..." date="Today, 08:30 AM" progress={65} />
            <TrainingItem title="Customer Support FAQs" status="Completed" date="Yesterday" />
          </div>
        </div>

        {/* Placeholder: Recent Escalations */}
        <div className="glass-panel border border-white/10 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Escalations</h2>
          </div>
          <div className="space-y-3 flex-1">
            <EscalationItem id="#4819" issue="Complex Refund Request" time="10m ago" />
            <EscalationItem id="#4818" issue="Bulk Order Discount" time="45m ago" />
            <EscalationItem id="#4815" issue="Shipping Address Error" time="2h ago" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, trendDown }) {
  return (
    <div className="glass-panel border border-white/10 p-5 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
          <Icon size={20} className="text-slate-300" />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendDown ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
          {trend}
        </span>
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{label}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function TrainingItem({ title, status, date, progress }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-white/5 hover:bg-slate-800 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center">
          <FileText size={20} />
        </div>
        <div>
          <p className="font-medium text-sm text-white">{title}</p>
          <p className="text-xs text-slate-400">{date}</p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end">
        <span className={`text-xs font-medium ${status === 'Completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
          {status}
        </span>
        {progress && (
          <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-violet-500 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
}

function EscalationItem({ id, issue, time }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer border border-transparent hover:border-white/5">
      <div className="mt-0.5">
        <AlertCircle size={16} className="text-amber-400" />
      </div>
      <div>
        <p className="text-sm font-medium flex items-center gap-2 text-white">
          {issue} <span className="text-xs text-slate-500">{id}</span>
        </p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
  );
}
