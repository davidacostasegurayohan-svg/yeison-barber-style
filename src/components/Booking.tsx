import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Clock, User, CheckCircle2, Scissors } from 'lucide-react';

interface BookingProps {
  onBack: () => void;
}

const BARBERS = [
  { id: '1', name: 'Yeison', role: 'Master Barber / Propietario', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
  { id: '2', name: 'Carlos', role: 'Especialista en Fade & Barbería Clásica', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: '3', name: 'Mateo', role: 'Diseño de Barba & Estilos Modernos', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
];

const SERVICES = [
  { id: '1', name: 'Corte Clásico & Fade', price: 'RD$ 500', time: '35 min' },
  { id: '2', name: 'Perfilado & Barba Spa', price: 'RD$ 400', time: '25 min' },
  { id: '3', name: 'Lavado & Corte Femenino', price: 'RD$ 600', time: '45 min' },
  { id: '4', name: 'Combo Ejecutivo (Corte + Barba + Mascarilla)', price: 'RD$ 1,000', time: '60 min' },
];

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];

export const Booking: React.FC<BookingProps> = ({ onBack }) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) {
      alert('Por favor completa todos los campos para confirmar tu reserva.');
      return;
    }
    setIsSubmitted(true);
  };

  const serviceDetail = SERVICES.find(s => s.id === selectedService);
  const barberDetail = BARBERS.find(b => b.id === selectedBarber);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center px-4 py-12">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center space-x-2 text-neutral-400 hover:text-amber-500 transition text-sm cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al inicio</span>
      </button>

      {isSubmitted ? (
        <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl text-center space-y-6 animate-fade-in">
          <div className="inline-flex p-4 bg-amber-500/10 rounded-full text-amber-500 border border-amber-500/30">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">¡Reserva Confirmada!</h2>
          <p className="text-neutral-400 text-sm">
            Te esperamos en <strong className="text-amber-400">Yeison Barber Style</strong> en Fundación de Barahona.
          </p>

          <div className="bg-neutral-800/60 p-4 rounded-xl border border-neutral-700/50 text-left space-y-3 text-sm">
            <div className="flex justify-between border-b border-neutral-700/50 pb-2">
              <span className="text-neutral-400">Servicio:</span>
              <span className="font-semibold text-amber-400">{serviceDetail?.name}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-700/50 pb-2">
              <span className="text-neutral-400">Barbero:</span>
              <span className="font-semibold">{barberDetail?.name}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-700/50 pb-2">
              <span className="text-neutral-400">Fecha:</span>
              <span className="font-semibold">{selectedDate}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-700/50 pb-2">
              <span className="text-neutral-400">Hora:</span>
              <span className="font-semibold text-amber-400">{selectedTime}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-neutral-400">Total a pagar:</span>
              <span className="font-bold text-amber-500">{serviceDetail?.price}</span>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-black font-extrabold rounded-lg shadow-lg transition cursor-pointer"
          >
            VOLVER AL INICIO
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-amber-500/10 rounded-full text-amber-500 border border-amber-500/30">
              <Scissors className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-wider">RESERVAR CITA</h2>
            <p className="text-xs text-neutral-400">Selecciona el servicio, profesional y horario de tu preferencia</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Selección de Servicio */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-neutral-300 flex items-center space-x-2">
                <Scissors className="w-4 h-4 text-amber-500" />
                <span>1. Selecciona el Servicio</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SERVICES.map(service => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex justify-between items-center ${
                      selectedService === service.id
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-neutral-800 bg-neutral-800/40 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-sm">{service.name}</p>
                      <p className="text-xs text-neutral-400">{service.time}</p>
                    </div>
                    <span className="font-bold text-amber-400 text-sm">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Selección de Barbero */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-neutral-300 flex items-center space-x-2">
                <User className="w-4 h-4 text-amber-500" />
                <span>2. Selecciona tu Barber / Especialista</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {BARBERS.map(barber => (
                  <div
                    key={barber.id}
                    onClick={() => setSelectedBarber(barber.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition text-center space-y-2 ${
                      selectedBarber === barber.id
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-neutral-800 bg-neutral-800/40 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <img 
                      src={barber.image} 
                      alt={barber.name} 
                      className="w-16 h-16 rounded-full mx-auto object-cover border border-amber-500/30"
                    />
                    <div>
                      <p className="font-bold text-sm">{barber.name}</p>
                      <p className="text-xs text-neutral-400">{barber.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Selección de Fecha y Hora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-300 flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-amber-500" />
                  <span>3. Fecha de la Cita</span>
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-300 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>4. Horario Disponible</span>
                </label>
                <select
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                >
                  <option value="">-- Elige una hora --</option>
                  {TIME_SLOTS.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botón de Confirmación */}
            <button
              type="submit"
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-black font-extrabold rounded-xl shadow-lg shadow-amber-600/20 transition tracking-wide text-sm cursor-pointer"
            >
              CONFIRMAR Y AGENDAR CITA
            </button>
          </form>
        </div>
      )}
    </div>
  );
};