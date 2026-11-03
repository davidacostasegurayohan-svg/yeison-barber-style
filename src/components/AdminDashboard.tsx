import React, { useState } from 'react';
import { 
  Users, 
  Scissors, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  UserCheck, 
  CheckSquare, 
  Square,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'professionals' | 'services'>('dashboard');

  // Servicios base del catálogo (RF-04)
  const availableServices = [
    { id: 'serv_01', name: 'Corte Normal', category: 'Barbería Masculina' },
    { id: 'serv_02', name: 'El Dominicano o Guayaito', category: 'Barbería Masculina' },
    { id: 'serv_03', name: 'El Blower o Soplado', category: 'Barbería Masculina' },
    { id: 'serv_04', name: 'La Victorino', category: 'Barbería Masculina' },
    { id: 'serv_05', name: 'Degradado a la piel (Fade en Cero)', category: 'Barbería Masculina' },
    { id: 'serv_06', name: 'Arreglo de Barba', category: 'Cuidado Personal' },
    { id: 'serv_07', name: 'Tinte', category: 'Cuidado Personal' },
    { id: 'serv_08', name: 'Facial', category: 'Cuidado Personal' },
    { id: 'serv_09', name: 'Lavado de Cabello', category: 'Cuidado Personal / Estilismo' },
    { id: 'serv_10', name: 'Corte de Cabello Femenino', category: 'Estilismo' }
  ];

  // Estado de Profesionales (RF-05 y RF-06)
  const [professionals, setProfessionals] = useState([
    {
      id: 'prof_01',
      name: 'Yeison',
      role: 'Barbero (Master)',
      phone: '+1 (809) 555-0101',
      status: 'Activo',
      assignedServices: ['serv_01', 'serv_02', 'serv_03', 'serv_04', 'serv_05', 'serv_06', 'serv_07', 'serv_08']
    },
    {
      id: 'prof_02',
      name: 'Junior',
      role: 'Barbero',
      phone: '+1 (809) 555-0102',
      status: 'Activo',
      assignedServices: ['serv_01', 'serv_02', 'serv_03', 'serv_05', 'serv_06']
    },
    {
      id: 'prof_03',
      name: 'Carlos',
      role: 'Estilista',
      phone: '+1 (809) 555-0103',
      status: 'Activo',
      assignedServices: ['serv_07', 'serv_08', 'serv_09', 'serv_10']
    }
  ]);

  //const [editingProfId, setEditingProfId] = useState<string | null>(null);

  // Función para alternar un servicio asignado a un profesional
  const toggleServiceAssignment = (profId: string, serviceId: string) => {
    setProfessionals(professionals.map(prof => {
      if (prof.id === profId) {
        const isAssigned = prof.assignedServices.includes(serviceId);
        const updatedServices = isAssigned
          ? prof.assignedServices.filter(id => id !== serviceId)
          : [...prof.assignedServices, serviceId];
        return { ...prof, assignedServices: updatedServices };
      }
      return prof;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Encabezado del Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-900 p-6 rounded-3xl border border-gray-800">
          <div>
            <div className="flex items-center gap-2 text-amber-500 font-bold text-sm mb-1">
              <ShieldCheck size={18} /> PANEL DE ADMINISTRACIÓN
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">Yeison Barber Style</h1>
            <p className="text-gray-400 text-sm">Gestión integral de la barbería & salón en Fundación, Barahona</p>
          </div>

          {/* Menú de pestañas internas */}
          <div className="flex bg-gray-950 p-1.5 rounded-2xl border border-gray-800 text-xs md:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'dashboard' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('professionals')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'professionals' ? 'bg-amber-500 text-gray-950' : 'text-gray-400 hover:text-white'
              }`}
            >
              Profesionales & Servicios
            </button>
          </div>
        </div>

        {/* Pestaña 1: Resumen General / Métricas */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <DollarSign size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Ingresos del Mes</p>
                  <h3 className="text-xl font-bold text-white">RD$ 185,400</h3>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Citas para Hoy</p>
                  <h3 className="text-xl font-bold text-white">18 Citas</h3>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Clientes Nuevos</p>
                  <h3 className="text-xl font-bold text-white">+34</h3>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Ocupación Agenda</p>
                  <h3 className="text-xl font-bold text-white">92%</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pestaña 2: Gestión de Profesionales y Relación con Servicios (RF-05 / RF-06) */}
        {activeTab === 'professionals' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <UserCheck className="text-amber-500" /> Equipo de Barberos y Estilista
                </h2>
                <p className="text-gray-400 text-xs">Configura qué servicios puede realizar cada profesional.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {professionals.map((prof) => (
                <div key={prof.id} className="bg-gray-900 p-6 rounded-3xl border border-gray-800 flex flex-col justify-between space-y-6 shadow-xl">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl flex items-center justify-center font-bold text-xl">
                          {prof.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{prof.name}</h3>
                          <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                            {prof.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <Scissors size={14} className="text-amber-500" /> Servicios Asignados:
                      </h4>

                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {availableServices.map((serv) => {
                          const isAssigned = prof.assignedServices.includes(serv.id);
                          return (
                            <div 
                              key={serv.id}
                              onClick={() => toggleServiceAssignment(prof.id, serv.id)}
                              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                                isAssigned 
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                                  : 'bg-gray-950 border-gray-800 text-gray-500 hover:text-gray-300'
                              }`}
                            >
                              <span>{serv.name}</span>
                              {isAssigned ? (
                                <CheckSquare size={16} className="text-amber-500" />
                              ) : (
                                <Square size={16} className="text-gray-600" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs text-gray-400">
                    <span>Total asignados: <strong className="text-amber-400">{prof.assignedServices.length} servicios</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};