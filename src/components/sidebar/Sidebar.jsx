import { MessageSquare, Settings, X, LayoutDashboard, UploadCloud, BarChart2, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: UploadCloud, label: 'Upload Documents', path: '/upload' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: MessageSquare, label: 'Chats', path: '/chat' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 glass-panel border-r border-white/10
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center font-bold shadow-lg shadow-violet-500/30">
              HT
            </div>
            <span className="font-semibold text-lg tracking-tight">HelperTom</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-violet-500/15 text-violet-400 font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <item.icon size={18} className={({ isActive }) => isActive ? 'text-violet-400' : ''} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 w-full text-left">
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
