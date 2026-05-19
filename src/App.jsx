import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { ChatPage } from './pages/ChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={
            <div className="flex items-center justify-center h-full text-white/50">
              Page placeholder
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;