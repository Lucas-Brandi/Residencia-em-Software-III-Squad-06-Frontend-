import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import PullRequests from '@/pages/pull-requests';
import { Regras } from '@/pages/regras';
import { Admin } from '@/pages/admin';
import { Perfil } from '@/pages/perfil';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/prs" element={<PullRequests />} />
      <Route path="/regras" element={<Regras />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}

export default App;
