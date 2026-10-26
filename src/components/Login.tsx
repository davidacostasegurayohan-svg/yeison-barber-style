import React, { useState } from 'react';
import { Scissors, Lock, Mail, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onBack: () => void;
  onNavigateRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onBack, onNavigateRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Iniciando sesión con: ${email}`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center px-6">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center space-x-2 text-neutral-400 hover:text-amber-500 transition text-sm cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al inicio</span>
      </button>

      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-amber-500/10 rounded-full text-amber-500 border border-amber-500/30">
            <Scissors className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-wider">INICIAR SESIÓN</h2>
          <p className="text-xs text-neutral-400">Yeison Barber Style — Fundación de Barahona</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-300">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-neutral-500" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-300">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-neutral-500" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-black font-extrabold rounded-lg shadow-lg shadow-amber-600/20 transition tracking-wide text-sm cursor-pointer"
          >
            INGRESAR AL SISTEMA
          </button>
        </form>

        <div className="text-center text-xs text-neutral-500 pt-2">
          ¿No tienes cuenta?{' '}
          <button 
            onClick={onNavigateRegister}
            className="text-amber-500 hover:underline font-semibold cursor-pointer"
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
};