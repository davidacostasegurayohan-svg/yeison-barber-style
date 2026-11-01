import React, { useState } from 'react';
import { Calendar, DollarSign, Users, Scissors, Plus, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'services' | 'barbers'>('overview');

  // Estado de servicios
  const [services, setServices] = useState([
    { id: 1, name: 'Corte Clásico & Fade', price: 500, duration: '35 min' },
    { id: 2, name: 'Perfilado & Barba Spa', price: 400, duration: '25 min' },
    { id: 3, name: 'Corte Premium & Hot Towel', price: 700, duration: '45 min' },
  ]);

  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  // Estado simulado de citas (para la pestaña de Citas)
  const [appointments, setAppointments] = useState([
    { id: 1, client: 'Carlos Pérez', service: 'Corte Clásico & Fade', barber: 'Yeison', time: '10:00 AM - Hoy', status: 'Confirmada', price: 500 },
    { id: 2, client: 'Miguel Gómez', service: 'Perfilado & Barba Spa', barber: 'Junior', time: '11:30 AM - Hoy', status: 'Pendiente', price: 400 },
    { id: 3, client: 'José Luis Matos', service: 'Corte Premium & Hot Towel', barber: 'Yeison', time: '03:00 PM - Hoy', status: 'Confirmada', price: 700 },
  ]);

  // Estado simulado de barberos (para la pestaña de Barberos)
  const [barbers, setBarbers] = useState([
    { id: 1, name: 'Yeison (Master Barber)', active: true, schedule: '09:00 AM - 07:00 PM' },
    { id: 2, name: 'Junior (Stylist)', active: true, schedule: '10:00 AM - 06:00 PM' },
  ]);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName || !newServicePrice) return;
    
    const newService = {
      id: Date.now(),
      name: newServiceName,
      price: Number(newServicePrice),
      duration: '30 min',
    };

    setServices([...services, newService]);
    setNewServiceName('');
    setNewServicePrice('');
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleToggleAppointmentStatus = (id: number) => {
    setAppointments(appointments.map(app => {
      if (app.id === id) {
        return { ...app, status: app.status === 'Confirmada' ? 'Completada' : 'Confirmada' };
      }
      return app;
    }));
  };

  const handleToggleBarberStatus = (id: number) => {
    setBarbers(barbers.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-amber-500">Panel de Administración</h1>
            <p className="text-gray-400">Yeison Barber Style — Control total de tu barbería</p>
          </div>
          
          {/* Navegación por pestañas */}
          <div className="flex flex-wrap gap-2 bg-gray-900 p-2 rounded-xl border border-gray-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'appointments' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              Citas ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'services' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              Servicios y Precios
            </button>
            <button
              onClick={() => setActiveTab('barbers')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'barbers' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              Barberos y Horarios
            </button>
          </div>
        </div>

        {/* 1. CONTENIDO DE LA PESTAÑA: GENERAL (OVERVIEW) */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Ingresos del Día</p>
                  <h3 className="text-2xl font-bold text-white mt-1">RD$ 1,600</h3>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                  <DollarSign size={24} />
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Citas Hoy</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{appointments.length} Citas</h3>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                  <Calendar size={24} />
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Barberos Activos</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{barbers.filter(b => b.active).length} Activos</h3>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                  <Users size={24} />
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Servicios Activos</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{services.length} Servicios</h3>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                  <Scissors size={24} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CONTENIDO DE LA PESTAÑA: CITAS */}
        {activeTab === 'appointments' && (
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-xl font-bold text-amber-400 mb-4">Gestión de Citas Agendadas</h3>
            <div className="space-y-4">
              {appointments.map((app) => (
                <div key={app.id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-950 p-4 rounded-xl border border-gray-800 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-white text-lg">{app.client}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        app.status === 'Confirmada' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">Servicio: <span className="text-amber-500">{app.service}</span> con <span className="text-white font-semibold">{app.barber}</span></p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock size={14} /> {app.time}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <span className="text-amber-400 font-bold text-lg">RD$ {app.price}</span>
                    <button
                      onClick={() => handleToggleAppointmentStatus(app.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        app.status === 'Confirmada' 
                          ? 'bg-green-500 hover:bg-green-600 text-gray-950' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {app.status === 'Confirmada' ? 'Marcar Completada' : 'Reabrir Cita'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. CONTENIDO DE LA PESTAÑA: SERVICIOS Y PRECIOS */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 h-fit">
              <h3 className="text-lg font-bold mb-4 text-amber-400 flex items-center gap-2">
                <Plus size={20} /> Agregar Nuevo Servicio
              </h3>
              <form onSubmit={handleAddService} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nombre del Servicio</label>
                  <input
                    type="text"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="Ej. Corte + Mascarilla"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Precio (RD$)</label>
                  <input
                    type="number"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    placeholder="500"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold py-3 rounded-xl transition-all"
                >
                  Guardar Servicio
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-amber-400">Catálogo Actual de Precios</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center bg-gray-950 p-4 rounded-xl border border-gray-800">
                    <div>
                      <h4 className="font-semibold text-white">{service.name}</h4>
                      <p className="text-sm text-gray-400">Duración: {service.duration}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-amber-400 font-bold">RD$ {service.price}</span>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-400 hover:text-red-300 p-2 bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. CONTENIDO DE LA PESTAÑA: BARBEROS Y HORARIOS */}
        {activeTab === 'barbers' && (
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-xl font-bold text-amber-400 mb-4">Control de Personal y Horarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {barbers.map((barber) => (
                <div key={barber.id} className="bg-gray-950 p-5 rounded-2xl border border-gray-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-lg">{barber.name}</h4>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <Clock size={14} /> Horario: {barber.schedule}
                    </p>
                    <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      barber.active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {barber.active ? 'Disponible para Citas' : 'Fuera de Turno'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggleBarberStatus(barber.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      barber.active 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' 
                        : 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                    }`}
                  >
                    {barber.active ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};