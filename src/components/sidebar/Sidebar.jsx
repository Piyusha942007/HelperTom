import { MessageSquare, Settings, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-900">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
              AI
            </div>
            <span className="font-semibold text-lg tracking-tight">Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-gray-900">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${isActive 
                  ? 'bg-emerald-50 text-emerald-700 font-medium' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
              `}
            >
              <item.icon size={18} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
