import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    usuario: '',
    email: '',
    celular: '',
    senha: '',
    confirmarSenha: '',
    dia: '',
    mes: '',
    ano: '',
    cpf: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não conferem!");
      return;
    }
    console.log('Conta criada com sucesso:', formData);
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      <h1 className="text-white text-3xl font-medium mb-8 z-10 drop-shadow-md">Cadastre-se aqui!</h1>

      <div className="relative z-10 w-full max-w-[900px] bg-[#0A1128]/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl">
        
        <div className="text-center mb-10">
          <span className="text-white tracking-[0.6em] text-[12px] uppercase font-semibold drop-shadow-md">
            Starian
          </span>
        </div>

        <form className="space-y-8" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User size={16} className="text-gray-600" />
                </div>
                <Input 
                  name="usuario" value={formData.usuario} onChange={handleChange}
                  type="text" placeholder="Usuário" 
                  className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10 pr-4 focus-visible:ring-blue-500/50" 
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail size={16} className="text-gray-600" />
                </div>
                <Input 
                  name="email" value={formData.email} onChange={handleChange}
                  type="email" placeholder="E-mail" 
                  className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10 pr-4 focus-visible:ring-blue-500/50" 
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Phone size={16} className="text-gray-600" />
                </div>
                <Input 
                  name="celular" value={formData.celular} onChange={handleChange}
                  type="text" placeholder="Celular" 
                  className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10 pr-4 focus-visible:ring-blue-500/50" 
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock size={16} className="text-gray-600" />
                </div>
                <Input 
                  name="senha" value={formData.senha} onChange={handleChange}
                  type="password" placeholder="Senha" 
                  className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10 pr-4 focus-visible:ring-blue-500/50" 
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock size={16} className="text-gray-600" />
                </div>
                <Input 
                  name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange}
                  type="password" placeholder="Confirmar senha" 
                  className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 pl-10 pr-4 focus-visible:ring-blue-500/50" 
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-300 text-[11px] italic mb-2 block">Data de nascimento:</label>
                <div className="flex gap-3">
                  <Input 
                    name="dia" value={formData.dia} onChange={handleChange}
                    type="text" placeholder="Dia" maxLength={2} 
                    className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 text-center px-2 focus-visible:ring-blue-500/50" 
                  />
                  <Input 
                    name="mes" value={formData.mes} onChange={handleChange}
                    type="text" placeholder="Mês" maxLength={2} 
                    className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 text-center px-2 focus-visible:ring-blue-500/50" 
                  />
                  <Input 
                    name="ano" value={formData.ano} onChange={handleChange}
                    type="text" placeholder="Ano" maxLength={4} 
                    className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 text-center px-2 focus-visible:ring-blue-500/50" 
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-[11px] italic mb-2 block">CPF:</label>
                <Input 
                  name="cpf" value={formData.cpf} onChange={handleChange}
                  type="text" placeholder="000.000.000-00" 
                  className="bg-[#E2E8F0] border-transparent text-gray-900 placeholder:text-gray-500 italic h-12 px-4 focus-visible:ring-blue-500/50" 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button type="submit" size="lg" className="px-16 bg-gradient-to-b from-[#2A3441] to-[#121826] hover:from-[#374151] hover:to-[#1F2937] text-white border border-white/10 shadow-lg">
              Cadastrar
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <Link to="/login" className="text-[11px] text-gray-300 hover:text-white transition-colors underline decoration-gray-500/50 underline-offset-4">
            Já possui uma conta? Faça login.
          </Link>
        </div>
      </div>
    </div>
  );
}