import { Menu, Search, Bell, UploadCloud, BrainCircuit } from 'lucide-react';

export function TopNavbar({ onMenuClick }) {
  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="md:hidden text-white/70 hover:text-white">
          <Menu size={24} />
        </button>
        
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-[var(--color-primary)]/50 focus-within:bg-white/10 transition-colors w-64">
          <Search size={16} className="text-white/40" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <button className="hidden lg:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer">
          <UploadCloud size={16} className="text-white/60" />
          <span>Upload PDF</span>
        </button>
        
        <button className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all cursor-pointer">
          <BrainCircuit size={16} />
          <span className="hidden sm:inline">Train AI</span>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>

        <button className="relative text-white/70 hover:text-white transition-colors cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-primary)] rounded-full ring-2 ring-[#09090b]"></span>
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] p-[2px] cursor-pointer">
          <div className="w-full h-full rounded-full border-2 border-[#09090b] overflow-hidden bg-[var(--color-surface)]">
            <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
