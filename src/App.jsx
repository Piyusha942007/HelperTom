import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ChatPage } from './pages/ChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={
            <div className="flex items-center justify-center h-full text-gray-500">
              Page not found
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;