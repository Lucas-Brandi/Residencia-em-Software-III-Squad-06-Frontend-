import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Github, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    githubUsername: '',
    password: '',
    confirmarSenha: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmarSenha) {
      setError('As senhas não conferem!');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          githubUsername: formData.githubUsername,
          avatarUrl: `https://github.com/${formData.githubUsername}.png`,
          password: formData.password,
          role: 'USER',
        }),
      });

      if (!res.ok) throw new Error(`${res.status}`);
      navigate('/login');
    } catch {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <h1 className="text-white text-3xl font-medium mb-8 z-10 drop-shadow-md">
        Cadastre-se aqui!
      </h1>

      <div className="relative z-10 w-full max-w-md bg-[#0A1128]/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-white tracking-[0.6em] text-[12px] uppercase font-semibold">
            DiffyAI
          </span>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <User size={16} className="text-gray-600" />
            </div>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="Usuário"
              required
              className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Github size={16} className="text-gray-600" />
            </div>
            <Input
              name="githubUsername"
              value={formData.githubUsername}
              onChange={handleChange}
              type="text"
              placeholder="Usuário do GitHub"
              required
              className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock size={16} className="text-gray-600" />
            </div>
            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Senha (mínimo 6 caracteres)"
              required
              className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock size={16} className="text-gray-600" />
            </div>
            <Input
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              type="password"
              placeholder="Confirmar senha"
              required
              className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="px-16 bg-gradient-to-b from-[#2A3441] to-[#121826] hover:from-[#374151] hover:to-[#1F2937] text-white border border-white/10 shadow-lg"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <Link
            to="/login"
            className="text-[11px] text-gray-300 hover:text-white transition-colors underline decoration-gray-500/50 underline-offset-4"
          >
            Já possui uma conta? Faça login.
          </Link>
        </div>
      </div>
    </div>
  );
}
