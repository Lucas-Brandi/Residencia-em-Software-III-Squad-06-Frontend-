import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Link de recuperação enviado para: ${email}`);
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="w-full max-w-[420px] bg-[#0A1128]/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl relative z-10">
        
        <div className="text-center mb-6">
          <span className="text-white tracking-[0.4em] text-[11px] uppercase font-semibold drop-shadow-md">
            Starian
          </span>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-white text-[22px] font-medium mb-2 drop-shadow-md">Recuperar Senha</h1>
          <p className="text-gray-300 text-xs px-4">
            Digite o endereço de e-mail associado à sua conta e enviaremos um link para redefinir sua senha.
          </p>
          <div className="w-24 h-[1px] bg-white/30 mx-auto mt-6"></div>
        </div>

        <form className="space-y-6" onSubmit={handleRecover}>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Mail size={16} className="text-gray-600" />
            </div>
            <Input
              type="email"
              placeholder="Seu e-mail cadastrado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10 pr-4 focus-visible:ring-blue-500/50"
              required
            />
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-gradient-to-b from-[#2A3441] to-[#121826] hover:from-[#374151] hover:to-[#1F2937] text-white border border-white/10 shadow-lg"
          >
            Enviar link de recuperação
          </Button>
        </form>

        <div className="mt-8 flex justify-center border-t border-white/10 pt-6">
          <Link to="/login" className="flex items-center text-[11px] text-gray-300 hover:text-white transition-colors">
            <ArrowLeft size={12} className="mr-1" /> 
            Voltar para o Login
          </Link>
        </div>

      </div>
    </div>
  );
}