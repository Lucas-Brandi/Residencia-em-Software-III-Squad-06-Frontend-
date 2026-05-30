import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import PullRequests from '@/pages/pull-requests';
import Repositories from '@/pages/repositories';
import { Regras } from '@/pages/regras';
import { Admin } from '@/pages/admin';
import { Perfil } from '@/pages/perfil';
import { Login } from '@/pages/login';
import { Register } from '@/pages/cadastro';
import { ForgotPassword } from '@/pages/recuperarSenha';
import PRAnalysis from '@/pages/pr-analysis';
import Teams from '@/pages/teams';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/recuperarSenha" element={<ForgotPassword />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/prs" element={<PullRequests />} />
      <Route path="/repositories" element={<Repositories />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/regras" element={<Regras />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/pr/:id" element={<PRAnalysis />} />
    </Routes>
  );
}

export default App;
