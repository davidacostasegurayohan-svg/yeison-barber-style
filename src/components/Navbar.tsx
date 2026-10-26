import React from 'react';
import { Scissors } from 'lucide-react';

interface NavbarProps {
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateLogin, onNavigateRegister }) => {
  return (
    <nav className="bg-neutral-900 border-b border-neutral-800 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <Scissors className="w-8 h-8 text-amber-500" />
        <div>
          <h1 className="font-bold text-lg tracking-wider">YEISON BARBER STYLE</h1>
          <p className="text-xs text-neutral-400">Fundación de Barahona</p>
        </div>
      </div>
      
      <div className="hidden md:flex space-x-6 text-sm font-medium">
        <a href="#inicio" className="hover:text-amber-500 transition">INICIO</a>
        <a href="#servicios" className="hover:text-amber-500 transition">SERVICIOS</a>
        <a href="#profesionales" className="hover:text-amber-500 transition">PROFESIONALES</a>
        <a href="#nosotros" className="hover:text-amber-500 transition">NOSOTROS</a>
      </div>

      <div className="flex space-x-3">
        <button 
          onClick={onNavigateLogin}
          className="px-4 py-2 text-sm font-semibold rounded bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
        >
          INICIAR SESIÓN
        </button>
        <button 
          onClick={onNavigateRegister}
          className="px-4 py-2 text-sm font-semibold rounded bg-amber-600 hover:bg-amber-500 text-black font-bold transition cursor-pointer"
        >
          REGISTRARSE
        </button>
      </div>
    </nav>
  );
};