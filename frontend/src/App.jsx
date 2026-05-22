import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/Login';

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

// Protected Route Component to secure dashboard access
function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [role, setRole] = useState('user'); // 'user' or 'admin'

  useEffect(() => {
    const storedRole = sessionStorage.getItem('userRole');
    if (storedRole === 'admin' || storedRole === 'user') {
      setRole(storedRole);
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Main Layout Wraps Everything, protected by auth */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
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

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </RoleContext.Provider>
  );
}

export default App;