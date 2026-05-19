import { Sidebar } from '../sidebar/Sidebar';
import { TopNavbar } from './TopNavbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f9fafb] text-gray-900 overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 min-w-0 bg-white shadow-sm border-l border-gray-200 z-10">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
