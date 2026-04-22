import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import PullRequests from '@/pages/pull-requests';
import { Regras } from '@/pages/regras';
import { Admin } from '@/pages/admin';
import { Perfil } from '@/pages/perfil';
import { Login } from '@/pages/login';
import { Register } from '@/pages/cadastro'; 
import { ForgotPassword } from '@/pages/recuperarSenha'; 

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/recuperarSenha" element={<ForgotPassword />} />
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
