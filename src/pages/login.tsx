import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario && senha) {
      console.log('Login bem-sucedido!');
      navigate('/dashboard');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-4">
      
      <div className="w-full max-w-[420px] bg-[#0A1128]/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl relative z-10">
        
        <div className="text-center mb-6">
          <h2 className="text-white tracking-[0.4em] text-[11px] uppercase font-semibold drop-shadow-md">
            Starian
          </h2>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-[22px] font-medium mb-3 drop-shadow-md">Seja bem-vindo!</h1>
          <div className="w-24 h-[1px] bg-white/30 mx-auto"></div>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <User size={16} className="text-gray-600" />
            </div>
            <Input
              type="text"
              placeholder="Usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10 pr-4 focus-visible:ring-blue-500/50"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock size={16} className="text-gray-600" />
            </div>
            <Input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10 pr-4 focus-visible:ring-blue-500/50"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-300 mt-2 px-1">
            <label className="flex items-center cursor-pointer hover:text-white transition-colors">
              <input 
                type="checkbox" 
                className="mr-2 w-3.5 h-3.5 rounded-sm bg-white/10 border-white/20 cursor-pointer accent-blue-500" 
              />
              Lembre-se de mim.
            </label>
            <Link to="/recuperarSenha" className="hover:text-white transition-colors underline decoration-gray-500/50 underline-offset-2">
              Esqueceu a senha?
            </Link>
          </div>

          <div className="flex justify-center pt-5">
            <Button
              type="submit"
              size="lg"
              className="px-14 bg-gradient-to-b from-[#2A3441] to-[#121826] hover:from-[#374151] hover:to-[#1F2937] text-white border border-white/10 shadow-lg"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center gap-4 border-t border-white/10 pt-6">
          <Link to="/cadastro" className="text-[11px] text-gray-300 hover:text-white transition-colors">
            Cadastre-se aqui.
          </Link>
        </div>

      </div>
    </div>
  );
}
