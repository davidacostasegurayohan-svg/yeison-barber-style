import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Catalog } from './components/Catalog';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Booking } from './components/Booking';
import { Scissors, Calendar, Sparkles } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'register' | 'booking'>('home');

  if (currentView === 'login') {
    return (
      <Login 
        onBack={() => setCurrentView('home')} 
        onNavigateRegister={() => setCurrentView('register')}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <Register 
        onBack={() => setCurrentView('home')} 
        onNavigateLogin={() => setCurrentView('login')}
      />
    );
  }

  if (currentView === 'booking') {
    return (
      <Booking 
        onBack={() => setCurrentView('home')} 
      />
    );
  }

  return (
    <div id="inicio" className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-black">
      <Navbar 
        onNavigateLogin={() => setCurrentView('login')} 
        onNavigateRegister={() => setCurrentView('register')}
      />

      {/* Hero Section */}
      <section className="relative px-6 py-20 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-6 max-w-xl">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Peluquería & Barbería Profesional</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            ESTILO QUE TE DEFINE
          </h1>
          <p className="text-neutral-400 text-lg">
            Yeison Barber Style — Ofrecemos los mejores cortes de cabello, diseños y servicios profesionales para que luzcas tu mejor estilo en Fundación de Barahona.
          </p>
          <div className="flex space-x-4 pt-2">
            <button 
              onClick={() => setCurrentView('booking')}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-lg shadow-lg shadow-amber-600/20 transition flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>RESERVAR CITA</span>
            </button>
          </div>
        </div>

        {/* Tarjeta Destacada */}
        <div className="w-full md:w-96 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-2xl space-y-4">
          <div className="flex items-center space-x-3 text-amber-500">
            <Scissors className="w-6 h-6" />
            <span className="font-bold">Servicios Destacados</span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-neutral-800/50 rounded-lg flex justify-between items-center border border-neutral-800">
              <div>
                <p className="font-semibold">Corte Clásico & Fade</p>
                <p className="text-xs text-neutral-400">35 min</p>
              </div>
              <span className="font-bold text-amber-400">RD$ 500</span>
            </div>
            <div className="p-3 bg-neutral-800/50 rounded-lg flex justify-between items-center border border-neutral-800">
              <div>
                <p className="font-semibold">Perfilado & Barba Spa</p>
                <p className="text-xs text-neutral-400">25 min</p>
              </div>
              <span className="font-bold text-amber-400">RD$ 400</span>
            </div>
            <div className="p-3 bg-neutral-800/50 rounded-lg flex justify-between items-center border border-neutral-800">
              <div>
                <p className="font-semibold">Lavado & Corte Femenino</p>
                <p className="text-xs text-neutral-400">45 min</p>
              </div>
              <span className="font-bold text-amber-400">RD$ 600</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo Completo de Servicios */}
      <Catalog />
    </div>
  );
}

export default App;