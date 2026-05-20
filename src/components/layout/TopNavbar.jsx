import { Menu } from 'lucide-react';

export function TopNavbar({ onMenuClick }) {
  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/10 glass-panel sticky top-0 z-30">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="md:hidden text-slate-300 hover:text-white mr-4 transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-white tracking-wide">HelperTom</h1>
      </div>
    </header>
  );
}
