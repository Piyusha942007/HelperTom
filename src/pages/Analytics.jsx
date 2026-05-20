import { BarChart3, PieChart, TrendingUp, Users } from 'lucide-react';

export function Analytics() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-slate-400">Track AI performance and user engagement.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Conversations", value: "24,592", trend: "+12.5%", icon: Users, color: "text-blue-400", bg: "bg-blue-500/20" },
          { title: "Avg Response Time", value: "1.2s", trend: "-0.4s", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/20" },
          { title: "Resolution Rate", value: "94.2%", trend: "+2.1%", icon: PieChart, color: "text-violet-400", bg: "bg-violet-500/20" },
          { title: "Tokens Used", value: "1.2M", trend: "+150k", icon: BarChart3, color: "text-orange-400", bg: "bg-orange-500/20" }
        ].map((stat, i) => (
          <div key={i} className="glass-panel border border-white/10 p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 flex-1">
        {/* Placeholder Chart 1 */}
        <div className="glass-panel border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Queries Over Time</h3>
          <div className="flex-1 flex items-end justify-between gap-2">
            {[40, 70, 45, 90, 65, 85, 120, 95, 130, 110, 150, 140].map((h, i) => (
              <div key={i} className="w-full bg-violet-500/20 rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 w-full bg-violet-500 rounded-t-sm transition-all duration-500"
                  style={{ height: `${h}%` }}
                ></div>
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {h * 10}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 font-medium">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Placeholder Chart 2 */}
        <div className="glass-panel border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Top Intent Categories</h3>
          <div className="flex-1 flex flex-col gap-4 justify-center">
            {[
              { label: "Order Tracking", value: 45, color: "bg-blue-500" },
              { label: "Refund Policy", value: 25, color: "bg-violet-500" },
              { label: "Product Info", value: 20, color: "bg-emerald-500" },
              { label: "Other", value: 10, color: "bg-slate-500" }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1 text-slate-300">
                  <span>{item.label}</span>
                  <span className="font-medium text-white">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
