import { Sidebar } from '../sidebar/Sidebar';
import { TopNavbar } from './TopNavbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-white overflow-hidden relative">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[var(--color-primary)]/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[var(--color-secondary)]/10 blur-[150px]"
        />
      </div>

      {/* Sidebar - Desktop and Mobile */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 z-10 relative backdrop-blur-[100px]">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto bg-black/20 border-t border-l border-white/5 md:rounded-tl-2xl shadow-[-10px_-10px_30px_rgba(0,0,0,0.5)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
