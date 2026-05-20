import RoleSwitcher from '../ui/RoleSwitcher';
import { Bell, Search, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="h-16 border-b border-border bg-white/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10 shrink-0 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        {/* Hamburger Menu Button */}
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-text-secondary hover:text-text-primary hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative max-w-md w-full hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-gray-50 border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-6">
        <button className="relative p-2 text-text-secondary hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>
        <RoleSwitcher />
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-blue-400 p-0.5 shadow-sm shrink-0">
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent" 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover bg-white"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
