import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface RegisterProps {
  onNavigate: (page: string) => void;
  onLoginSuccess?: (user: any) => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigate, onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones del cliente
    if (!name.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Actualizar el perfil del usuario en Auth
      await updateProfile(user, {
        displayName: name
      });

      // 3. Crear el documento del usuario en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        phone: phone,
        role: 'CLIENT',
        createdAt: new Date().toISOString()
      });

      console.log('Usuario registrado con éxito:', user);

      if (onLoginSuccess) {
        onLoginSuccess({
          uid: user.uid,
          email: user.email,
          displayName: name,
          role: 'CLIENT'
        });
      }

      onNavigate('inicio');
    } catch (err: any) {
      // Impresión detallada en consola para depurar la conexión exacta
      console.error('Error completo de Firebase al registrar:', err);

      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está registrado.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El formato del correo electrónico no es válido.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('El registro por correo/contraseña no está habilitado en Firebase Console.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña es demasiado débil (mínimo 6 caracteres).');
      } else if (err.code === 'auth/api-key-not-valid') {
        setError('La API Key de Firebase no es válida. Revisa firebase.ts.');
      } else {
        setError(`Error (${err.code || 'desconocido'}): ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <button
          onClick={() => onNavigate('inicio')}
          className="text-slate-400 hover:text-amber-500 text-sm mb-6 flex items-center gap-2 transition-colors"
        >
          ← Volver al Inicio
        </button>

        <div className="text-center mb-8">
          <span className="bg-amber-500/10 text-amber-500 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Únete a Yeison Barber Style
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3">Crear Cuenta</h2>
          <p className="text-slate-400 text-sm mt-2">
            Regístrate para agendar tus citas y consultar tus facturas.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan Pérez"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cliente@ejemplo.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
              Teléfono / WhatsApp
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="8091234567"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg transition-colors shadow-lg shadow-amber-500/20 disabled:opacity-50 mt-2"
          >
            {loading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          ¿Ya tienes una cuenta?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-amber-500 hover:underline font-medium"
          >
            Inicia Sesión
          </button>
        </p>
      </div>
    </div>
  );
};