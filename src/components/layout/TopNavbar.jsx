import { Menu } from 'lucide-react';

export function TopNavbar({ onMenuClick }) {
  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="md:hidden text-gray-600 hover:text-gray-900 mr-4">
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-800">Chat</h1>
      </div>
    </header>
  );
}
