import { 
  LayoutDashboard, 
  MessageSquare, 
  Bot, 
  BookOpen, 
  ShieldCheck, 
  Package, 
  BarChart2, 
  Settings,
  X,
  Sparkles
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: MessageSquare, label: 'Conversations', path: '/conversations' },
  { icon: Bot, label: 'AI Assistant', path: '/chat' },
  { icon: BookOpen, label: 'Knowledge Base', path: '/knowledge' },
  { icon: ShieldCheck, label: 'Policies', path: '/policies' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-[#09090b] border-r border-white/5
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-3 text-[var(--color-primary)]">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center border border-[var(--color-primary)]/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <Sparkles size={18} className="text-[var(--color-glow)]" />
            </div>
            <span className="font-satoshi font-bold text-lg text-white tracking-wide">Nex<span className="text-[var(--color-primary)]">AI</span></span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'}
              `}
            >
              <item.icon size={18} className="transition-transform group-hover:scale-110" />
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User / Plan Area */}
        <div className="p-4 border-t border-white/5">
          <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/20 rounded-xl p-4">
            <p className="text-xs text-white/60 font-medium mb-1">Current Plan</p>
            <p className="text-sm font-semibold text-white">Enterprise AI</p>
          </div>
        </div>
      </aside>
    </>
  );
}
