import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AdminDashboard } from './components/AdminDashboard';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Booking } from './components/Booking';
import { Catalog } from './components/Catalog';
import { UserProfile } from './components/UserProfile';
import { Inventory } from './components/Inventory';
import { Billing } from './components/Billing';
import { History } from './components/History';
import { Scissors, Shield, Home, Calendar, User, Package, FileText, History as HistoryIcon, Lock } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'login' | 'register' | 'booking' | 'catalog' | 'profile' | 'inventory' | 'billing' | 'history'>('home');

  // Estado de Autenticación y Roles para pruebas de seguridad
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: 'guest', // 'admin' o 'client' o 'guest'
    userName: ''
  });

  const [securityAlert, setSecurityAlert] = useState('');

  const handleBackToHome = () => {
    setCurrentView('home');
    setSecurityAlert('');
  };

  const handleNavigateLogin = () => setCurrentView('login');
  const handleNavigateRegister = () => setCurrentView('register');

  // Guardia de Seguridad para Vistas Protegidas (RF de Seguridad / Control de Acceso)
  const handleSecureNavigation = (view: 'home' | 'admin' | 'login' | 'register' | 'booking' | 'catalog' | 'profile' | 'inventory' | 'billing' | 'history') => {
    
    // 1. Exclusivo para Administrador (Admin Dashboard e Inventario Interno)
    if (view === 'admin' || view === 'inventory') {
      if (!auth.isAuthenticated || auth.role !== 'admin') {
        setSecurityAlert('⚠️ Acceso Denegado: Esta sección es exclusiva para el personal administrativo.');
        setCurrentView('login');
        return;
      }
    }
    
    // 2. Requiere al menos estar Autenticado (Clientes o Admin)
    if ((view === 'booking' || view === 'profile' || view === 'history' || view === 'billing') && !auth.isAuthenticated) {
      setSecurityAlert('⚠️ Debes iniciar sesión para agendar citas, ver tu perfil o gestionar pagos.');
      setCurrentView('login');
      return;
    }

    setSecurityAlert('');
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white scroll-smooth">
      
      {/* Barra de Navegación Superior */}
      <Navbar 
        onNavigateLogin={handleNavigateLogin}
        onNavigateRegister={handleNavigateRegister}
      />

      {/* Alerta de Seguridad si se intenta acceso no autorizado */}
      {securityAlert && (
        <div className="bg-red-500/10 border-b border-red-500/20 text-red-400 px-6 py-3 text-center text-xs md:text-sm font-semibold flex items-center justify-center gap-2">
          <Lock size={16} /> {securityAlert}
        </div>
      )}

      {/* Panel de Simulación de Roles (Para Pruebas de Seguridad) */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-2 flex flex-wrap justify-between items-center text-xs">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="font-bold text-amber-400">Estado de Sesión Actual:</span>
          <span className={`px-2 py-0.5 rounded-full font-semibold ${auth.isAuthenticated ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
            {auth.isAuthenticated ? `Conectado como (${auth.role.toUpperCase()})` : 'Modo Visitante (No autenticado)'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setAuth({ isAuthenticated: true, role: 'admin', userName: 'Yeison (Admin)' }); alert('Sesión iniciada como Administrador'); }}
            className="bg-gray-800 hover:bg-amber-500 hover:text-gray-950 px-3 py-1 rounded-lg font-bold transition-all"
          >
            Simular Login Admin
          </button>
          <button
            onClick={() => { setAuth({ isAuthenticated: true, role: 'client', userName: 'Cliente Prueba' }); alert('Sesión iniciada como Cliente'); }}
            className="bg-gray-800 hover:bg-amber-500 hover:text-gray-950 px-3 py-1 rounded-lg font-bold transition-all"
          >
            Simular Login Cliente
          </button>
          <button
            onClick={() => { setAuth({ isAuthenticated: false, role: 'guest', userName: '' }); alert('Sesión cerrada / Visitante'); }}
            className="bg-gray-800 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg font-bold transition-all"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Botones flotantes temporales de control rápido para desarrollo */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-wrap gap-2 bg-gray-900 p-2 rounded-2xl border border-gray-800 shadow-2xl">
        <button
          onClick={() => handleSecureNavigation('home')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'home' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home size={14} /> Inicio
        </button>
        <button
          onClick={() => handleSecureNavigation('booking')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'booking' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Calendar size={14} /> Citas
        </button>
        <button
          onClick={() => handleSecureNavigation('billing')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'billing' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
          }`}
        >
          <FileText size={14} /> Facturación
        </button>
        <button
          onClick={() => handleSecureNavigation('history')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'history' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
          }`}
        >
          <HistoryIcon size={14} /> Historial
        </button>
        <button
          onClick={() => handleSecureNavigation('profile')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'profile' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
          }`}
        >
          <User size={14} /> Perfil
        </button>
        <button
          onClick={() => handleSecureNavigation('inventory')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'inventory' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Package size={14} /> Inventario
        </button>
        <button
          onClick={() => handleSecureNavigation('admin')}
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
                  onClick={() => handleSecureNavigation('booking')}
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
      {currentView === 'billing' && <Billing onBack={handleBackToHome} />}
      {currentView === 'history' && <History onBack={handleBackToHome} />}
      {currentView === 'profile' && <UserProfile />}
      {currentView === 'inventory' && <Inventory />}
      {currentView === 'admin' && <AdminDashboard />}

    </div>
  );
}

export default App;