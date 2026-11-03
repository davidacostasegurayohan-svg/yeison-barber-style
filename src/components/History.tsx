import React from 'react';
import { History as HistoryIcon, Calendar, Scissors, User, Download } from 'lucide-react';

interface HistoryProps {
  onBack?: () => void;
}

export const History: React.FC<HistoryProps> = ({ onBack }) => {
  // Historial de citas y servicios del cliente (RF-14)
  const clientHistory = [
    {
      id: 'cita_01',
      date: '15 Nov 2026, 10:00 AM',
      service: 'Corte Clásico & Fade',
      professional: 'Yeison (Master Barber)',
      price: 590.00,
      status: 'Confirmada',
      hasInvoice: true
    },
    {
      id: 'cita_02',
      date: '28 Oct 2026, 04:00 PM',
      service: 'Arreglo de Barba Spa',
      professional: 'Junior (Barber Pro)',
      price: 350.00,
      status: 'Completada',
      hasInvoice: true
    },
    {
      id: 'cita_03',
      date: '10 Oct 2026, 02:30 PM',
      service: 'Lavado de Cabello y Estilismo',
      professional: 'Carlos (Estilista)',
      price: 500.00,
      status: 'Completada',
      hasInvoice: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center bg-gray-900 p-6 rounded-3xl border border-gray-800">
          <div>
            <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
              Historial de Servicios RF-14
            </span>
            <h1 className="text-2xl font-black text-white mt-2">Mi Historial de Citas y Facturas</h1>
            <p className="text-gray-400 text-sm">Consulta tus servicios anteriores y próximas reservaciones en Yeison Barber Style.</p>
          </div>
          {onBack && (
            <button 
              onClick={onBack}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            >
              Volver
            </button>
          )}
        </div>

        {/* Tabla / Lista de Historial */}
        <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 space-y-6">
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <HistoryIcon size={20} /> Registro de Atenciones
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Fecha y Hora</th>
                  <th className="py-3 px-4">Servicio</th>
                  <th className="py-3 px-4">Profesional</th>
                  <th className="py-3 px-4">Precio Total</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Comprobante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-sm">
                {clientHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-950/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white flex items-center gap-2">
                      <Calendar size={14} className="text-amber-500" /> {item.date}
                    </td>
                    <td className="py-4 px-4 text-gray-300 flex items-center gap-2">
                      <Scissors size={14} className="text-amber-500" /> {item.service}
                    </td>
                    <td className="py-4 px-4 text-gray-400 flex items-center gap-2">
                      <User size={14} className="text-amber-500" /> {item.professional}
                    </td>
                    <td className="py-4 px-4 font-bold text-amber-400">
                      RD$ {item.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Confirmada'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-green-500/10 text-green-400 border border-green-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {item.hasInvoice && (
                        <button
                          onClick={() => alert('Descargando factura digital en PDF...')}
                          className="bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-gray-950 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-amber-500/20 inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download size={14} /> Ver Factura
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};