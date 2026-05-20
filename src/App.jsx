import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';

// Layout
import MainLayout from './components/layout/MainLayout';

// User Pages
import UserLanding from './pages/user/UserLanding';
import ChatbotPage from './pages/user/ChatbotPage';
import SettingsPage from './pages/user/SettingsPage';
import Conversations from './pages/user/Conversations';
import OrderSupport from './pages/user/OrderSupport';
import AiRecommendations from './pages/user/AiRecommendations';

// Admin Pages
import AdminLanding from './pages/admin/AdminLanding';
import AdminDashboard from './pages/admin/AdminDashboard';
import PdfUpload from './pages/admin/PdfUpload';
import KnowledgeBase from './pages/admin/KnowledgeBase';
import AdminConversations from './pages/admin/AdminConversations';
import Analytics from './pages/admin/Analytics';

// Global Context for Role Switching
export const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

function App() {
  const [role, setRole] = useState('user'); // 'user' or 'admin'

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <BrowserRouter>
        <Routes>
          {/* Main Layout Wraps Everything */}
          <Route path="/" element={<MainLayout />}>
            {/* User Routes */}
            <Route index element={role === 'admin' ? <Navigate to="/admin" /> : <UserLanding />} />
            <Route path="chat" element={role === 'admin' ? <Navigate to="/admin" /> : <ChatbotPage />} />
            <Route path="conversations" element={role === 'admin' ? <Navigate to="/admin" /> : <Conversations />} />
            <Route path="support" element={role === 'admin' ? <Navigate to="/admin" /> : <OrderSupport />} />
            <Route path="recommendations" element={role === 'admin' ? <Navigate to="/admin" /> : <AiRecommendations />} />
            
            {/* Admin Routes */}
            <Route path="admin" element={role === 'user' ? <Navigate to="/" /> : <AdminLanding />} />
            <Route path="admin/dashboard" element={role === 'user' ? <Navigate to="/" /> : <AdminDashboard />} />
            <Route path="admin/upload" element={role === 'user' ? <Navigate to="/" /> : <PdfUpload />} />
            <Route path="admin/knowledge" element={role === 'user' ? <Navigate to="/" /> : <KnowledgeBase />} />
            <Route path="admin/training" element={role === 'user' ? <Navigate to="/" /> : <KnowledgeBase />} />
            <Route path="admin/users" element={role === 'user' ? <Navigate to="/" /> : <AdminConversations />} />
            <Route path="admin/analytics" element={role === 'user' ? <Navigate to="/" /> : <Analytics />} />

            {/* Shared Route */}
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RoleContext.Provider>
  );
}

export default App;