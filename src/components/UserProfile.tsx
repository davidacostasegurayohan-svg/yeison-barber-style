import React, { useState } from 'react';
import { Calendar, Clock, Scissors, User, Settings, CheckCircle2 } from 'lucide-react';

export const UserProfile: React.FC = () => {
  // Estado simulado de las citas del usuario
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      service: 'Corte Clásico & Fade',
      barber: 'Yeison',
      date: '15 de Noviembre, 2026',
      time: '10:00 AM',
      status: 'Próxima',
      price: 500
    },
    {
      id: 2,
      service: 'Perfilado & Barba Spa',
      barber: 'Junior',
      date: '28 de Octubre, 2026',
      time: '04:00 PM',
      status: 'Completada',
      price: 400
    }
  ]);

  // Estado del perfil del usuario (datos de contacto y preferencias)
  const [profileData, setProfileData] = useState({
    name: 'Carlos Pérez',
    email: 'carlos.perez@email.com',
    phone: '+1 (809) 555-0192',
    hairPreference: 'Fade bajo con textura en la parte superior, barba perfilada'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCancelAppointment = (id: number) => {
    setAppointments(appointments.map(app => {
      if (app.id === id) {
        return { ...app, status: 'Cancelada' };
      }
      return app;
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSuccessMessage('¡Perfil actualizado con éxito!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Encabezado del Perfil */}
        <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl flex items-center justify-center text-3xl font-bold">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
              <p className="text-gray-400 text-sm">{profileData.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold">
                Cliente Frecuente
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all"
          >
            <Settings size={18} /> {isEditing ? 'Cancelar Edición' : 'Editar Mis Datos'}
          </button>
        </div>

        {/* Mensaje de éxito temporal */}
        {successMessage && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center gap-3">
            <CheckCircle2 size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Sección de Edición de Datos */}
        {isEditing && (
          <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800">
            <h3 className="text-xl font-bold text-amber-400 mb-4">Actualizar Información Personal</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Teléfono / Contacto</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Preferencias de Corte / Estilo</label>
                <textarea
                  rows={2}
                  value={profileData.hairPreference}
                  onChange={(e) => setProfileData({...profileData, hairPreference: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-6 py-3 rounded-xl transition-all"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        )}

        {/* Grid de Secciones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Mis Próximas Citas */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800">
              <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                <Calendar size={22} /> Mis Citas y Reservas
              </h3>

              <div className="space-y-4">
                {appointments.map((app) => (
                  <div key={app.id} className="bg-gray-950 p-5 rounded-2xl border border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-white text-lg">{app.service}</h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          app.status === 'Próxima' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          app.status === 'Completada' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">Barbero asignado: <span className="text-amber-500 font-medium">{app.barber}</span></p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock size={14} /> {app.date} a las {app.time}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                      <span className="text-amber-400 font-bold text-lg">RD$ {app.price}</span>
                      {app.status === 'Próxima' && (
                        <button
                          onClick={() => handleCancelAppointment(app.id)}
                          className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          Cancelar Cita
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Preferencias y Datos */}
          <div className="space-y-6">
            <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <Scissors size={20} /> Mis Preferencias
              </h3>
              <p className="text-sm text-gray-300 bg-gray-950 p-4 rounded-2xl border border-gray-800 leading-relaxed">
                {profileData.hairPreference}
              </p>
            </div>

            <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 space-y-3">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <User size={20} /> Información de Contacto
              </h3>
              <div className="text-sm space-y-2 text-gray-300">
                <p><span className="text-gray-500">Teléfono:</span> {profileData.phone}</p>
                <p><span className="text-gray-500">Correo:</span> {profileData.email}</p>
                <p><span className="text-gray-500">Ubicación:</span> Fundación de Barahona</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};