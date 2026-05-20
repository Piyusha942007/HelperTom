import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10">
        <Navbar toggleSidebar={() => setIsMobileOpen(!isMobileOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
