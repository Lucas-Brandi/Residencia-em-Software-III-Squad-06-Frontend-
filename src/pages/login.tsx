import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authService } from '@/services/auth';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.login({ username, password });
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/dashboard');
    } catch {
      setError('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-[#0A1128]/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-white tracking-[0.4em] text-[11px] uppercase font-semibold drop-shadow-md">
            DiffyAI
          </h2>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-[22px] font-medium mb-3 drop-shadow-md">
            Seja bem-vindo!
          </h1>
          <div className="w-24 h-[1px] bg-white/30 mx-auto" />
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <User size={16} className="text-gray-600" />
            </div>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10 pr-4"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock size={16} className="text-gray-600" />
            </div>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10 pr-4"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-300 px-1">
            <label className="flex items-center cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                className="mr-2 w-3.5 h-3.5 rounded-sm accent-blue-500"
              />
              Lembre-se de mim.
            </label>
            <Link
              to="/recuperarSenha"
              className="hover:text-white transition-colors underline decoration-gray-500/50 underline-offset-2"
            >
              Esqueceu a senha?
            </Link>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="flex justify-center pt-5">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="px-14 bg-gradient-to-b from-[#2A3441] to-[#121826] hover:from-[#374151] hover:to-[#1F2937] text-white border border-white/10 shadow-lg"
            >
              {loading ? 'Entrando...' : 'Login'}
            </Button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center border-t border-white/10 pt-6">
          <Link
            to="/cadastro"
            className="text-[11px] text-gray-300 hover:text-white transition-colors"
          >
            Cadastre-se aqui.
          </Link>
        </div>
      </div>
    </div>
  );
}
