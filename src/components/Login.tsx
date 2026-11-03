import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface LoginProps {
  onBack: () => void;
  onNavigateRegister: () => void;
  onLoginSuccess?: (user: { name: string; role: string; email: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onBack, onNavigateRegister, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Iniciar sesión con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Obtener los datos del rol del usuario desde Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      let userData = {
        name: user.email || 'Usuario',
        role: 'client',
        email: user.email || ''
      };

      if (userDoc.exists()) {
        const data = userDoc.data();
        userData = {
          name: data.name || user.email,
          role: data.role || 'client',
          email: user.email || ''
        };
      }

      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      onBack(); // Volver al Inicio
    } catch (err: any) {
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-3xl p-8 space-y-6 shadow-2xl relative">
        
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold transition-all mb-2"
        >
          <ArrowLeft size={16} /> Volver al Inicio
        </button>

        <div className="text-center space-y-2">
          <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
            Yeison Barber Style
          </span>
          <h2 className="text-3xl font-black text-white">Iniciar Sesión</h2>
          <p className="text-gray-400 text-xs">Accede a tu cuenta para gestionar tus citas.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">Contraseña</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-gray-950 font-bold py-3 rounded-xl transition-all text-sm mt-4 cursor-pointer"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 pt-2">
          ¿No tienes una cuenta aún?{' '}
          <button onClick={onNavigateRegister} className="text-amber-400 font-bold hover:underline">
            Regístrate aquí
          </button>
        </p>

      </div>
    </div>
  );
};