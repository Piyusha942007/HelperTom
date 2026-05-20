import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  MessageSquare, History, LifeBuoy, Sparkles, Settings,
  LayoutDashboard, FileText, BrainCircuit, Database, Users, BarChart
} from 'lucide-react';
import { useRole } from '../../App';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const userNavItems = [
  { icon: MessageSquare, label: 'Chat Assistant', path: '/chat' },
  { icon: History, label: 'Conversations', path: '/conversations' },
  { icon: LifeBuoy, label: 'Order Support', path: '/support' },
  { icon: Sparkles, label: 'AI Recommendations', path: '/recommendations' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: FileText, label: 'PDF Uploads', path: '/admin/upload' },
  { icon: BrainCircuit, label: 'AI Training', path: '/admin/training' },
  { icon: Database, label: 'Knowledge Base', path: '/admin/knowledge' },
  { icon: Users, label: 'User Conversations', path: '/admin/users' },
  { icon: BarChart, label: 'Analytics', path: '/admin/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { role } = useRole();
  const navItems = role === 'admin' ? adminNavItems : userNavItems;

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen bg-white border-r border-border flex flex-col flex-shrink-0 z-20"
    >
      <div className="h-16 flex items-center justify-center border-b border-border">
        {isCollapsed ? (
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Sparkles className="text-primary w-6 h-6" />
          </div>
        ) : (
          <div className="flex items-center gap-3 px-6 w-full">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Sparkles className="text-primary w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-text-primary tracking-tight">AI Comm</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2 custom-scrollbar">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0", isCollapsed && "mx-auto")} />
              {!isCollapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </div>
      
      {/* Collapse Toggle */}
      <div className="p-4 border-t border-border flex justify-center">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex justify-center py-2 text-text-muted hover:text-text-primary transition-colors"
        >
          {isCollapsed ? '→' : '← Collapse'}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
