import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import PullRequests from '@/pages/pull-requests';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/prs" element={<PullRequests />} />
    </Routes>
  );
}

export default App;
