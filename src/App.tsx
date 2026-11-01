import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AdminDashboard } from './components/AdminDashboard';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Booking } from './components/Booking';
import { Catalog } from './components/Catalog';
import { UserProfile } from './components/UserProfile';
import { Scissors, Shield, Home, Calendar, User } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'login' | 'register' | 'booking' | 'catalog' | 'profile'>('home');

  const handleBackToHome = () => setCurrentView('home');
  const handleNavigateLogin = () => setCurrentView('login');
  const handleNavigateRegister = () => setCurrentView('register');

  return (
    <div className="min-h-screen bg-gray-950 text-white scroll-smooth">
      
      {/* Barra de Navegación Superior */}
      <Navbar 
        onNavigateLogin={handleNavigateLogin}
        onNavigateRegister={handleNavigateRegister}
      />

      {/* Botones flotantes temporales de control rápido para desarrollo */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-wrap gap-2 bg-gray-900 p-2 rounded-2xl border border-gray-800 shadow-2xl">
        <button
          onClick={handleBackToHome}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'home' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home size={14} /> Inicio
        </button>
        <button
          onClick={() => setCurrentView('booking')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'booking' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Calendar size={14} /> Citas
        </button>
        <button
          onClick={() => setCurrentView('profile')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'profile' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
          }`}
        >
          <User size={14} /> Perfil
        </button>
        <button
          onClick={() => setCurrentView('admin')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'admin' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Shield size={14} /> Admin
        </button>
      </div>

      {/* Renderizado condicional de vistas */}
      {currentView === 'home' && (
        <div className="space-y-16">
          {/* Hero Section (Inicio) */}
          <section id="inicio" className="relative py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-xl space-y-6">
              <span className="bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full text-sm font-semibold border border-amber-500/20">
                Peluquería & Barbería Profesional
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                ESTILO QUE <span className="text-amber-500">TE DEFINE</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Yeison Barber Style — Ofrecemos los mejores cortes de cabello, diseños y servicios profesionales para que luzcas tu mejor estilo en Fundación de Barahona.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setCurrentView('booking')}
                  className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Scissors size={20} /> Agendar Cita Ahora
                </button>
              </div>
            </div>
          </section>

          {/* Sección de Catálogo / Servicios */}
          <section id="servicios" className="py-10">
            <Catalog />
          </section>

          {/* Sección de Profesionales (2 Barberos y 1 Estilista) */}
          <section id="profesionales" className="py-16 px-6 max-w-7xl mx-auto border-t border-gray-900">
            <h2 className="text-3xl font-bold text-center mb-10 text-amber-400">Nuestros Profesionales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Barbero 1 */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center space-y-4 shadow-xl">
                <div className="w-24 h-24 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
                  Y
                </div>
                <h3 className="text-xl font-bold text-white">Yeison</h3>
                <p className="text-amber-500 font-medium">Master Barber & Fundador</p>
                <p className="text-gray-400 text-sm">Especialista en cortes modernos, fade avanzado y barbería clásica en Fundación de Barahona.</p>
              </div>

              {/* Barbero 2 */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center space-y-4 shadow-xl">
                <div className="w-24 h-24 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
                  J
                </div>
                <h3 className="text-xl font-bold text-white">Junior</h3>
                <p className="text-amber-500 font-medium">Barber Pro</p>
                <p className="text-gray-400 text-sm">Experto en diseños detallados, perfilado de barba y estilos urbanos juveniles.</p>
              </div>

              {/* Estilista */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center space-y-4 shadow-xl">
                <div className="w-24 h-24 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
                  C
                </div>
                <h3 className="text-xl font-bold text-white">Carlos</h3>
                <p className="text-amber-500 font-medium">Estilista Profesional</p>
                <p className="text-gray-400 text-sm">Especialista en tratamientos capilares, tintes, cepillados y cortes especializados para estilismo.</p>
              </div>

            </div>
          </section>

          {/* Sección de Nosotros */}
          <section id="nosotros" className="py-16 px-6 max-w-4xl mx-auto border-t border-gray-900 text-center space-y-6 pb-24">
            <h2 className="text-3xl font-bold text-amber-400">Sobre Nosotros</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              En <span className="text-white font-bold">Yeison Barber Style</span>, ubicados en el corazón de Fundación de Barahona, nos apasiona ofrecer mucho más que un simple corte de cabello. Combinamos técnicas de barbería tradicional con las últimas tendencias urbanas en un ambiente moderno, cómodo y exclusivo para toda nuestra comunidad.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-6 text-sm text-amber-400 font-medium">
              <span className="bg-gray-900 px-4 py-2 rounded-xl border border-gray-800">📍 Fundación, Barahona</span>
              <span className="bg-gray-900 px-4 py-2 rounded-xl border border-gray-800">✂️ Calidad Garantizada</span>
              <span className="bg-gray-900 px-4 py-2 rounded-xl border border-gray-800">⭐ Experiencia Profesional</span>
            </div>
          </section>
        </div>
      )}

      {currentView === 'login' && <Login onBack={handleBackToHome} onNavigateRegister={handleNavigateRegister} />}
      {currentView === 'register' && <Register onBack={handleBackToHome} onNavigateLogin={handleNavigateLogin} />}
      {currentView === 'booking' && <Booking onBack={handleBackToHome} />}
      {currentView === 'profile' && <UserProfile />}
      {currentView === 'admin' && <AdminDashboard />}

    </div>
  );
}

export default App;