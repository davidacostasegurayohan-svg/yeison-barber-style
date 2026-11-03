import React, { useState } from 'react';
import { Calendar, Clock, Scissors, User, CheckCircle2, ArrowRight } from 'lucide-react';

interface BookingProps {
  onBack?: () => void;
}

export const Booking: React.FC<BookingProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('15 de Noviembre, 2026');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [confirmed, setConfirmed] = useState(false);

  // Lista oficial de servicios (RF-04)
  const servicesList = [
    { id: 1, name: 'Corte Normal', price: 350, duration: '30 min' },
    { id: 2, name: 'El Dominicano o Guayaito', price: 400, duration: '35 min' },
    { id: 3, name: 'El Blower o Soplado', price: 300, duration: '25 min' },
    { id: 4, name: 'La Victorino', price: 500, duration: '40 min' },
    { id: 5, name: 'Degradado a la piel (Fade en Cero)', price: 450, duration: '40 min' },
    { id: 6, name: 'Arreglo de Barba', price: 300, duration: '25 min' },
    { id: 7, name: 'Corte de Cabello Femenino', price: 800, duration: '50 min' },
  ];

  // Lista de profesionales oficiales (2 Barberos y 1 Estilista)
  const professionalsList = [
    { id: 'prof_01', name: 'Yeison', role: 'Master Barber', specialty: 'Cortes masculinos y fades avanzados' },
    { id: 'prof_02', name: 'Junior', role: 'Barber Pro', specialty: 'Diseños urbanos y perfilado de barba' },
    { id: 'prof_03', name: 'Carlos', role: 'Estilista Profesional', specialty: 'Lavado y cortes de cabello femenino' },
  ];

  // Horarios disponibles simulando prevención de doble reservación (RF-09)
  const availableSlots = [
    { time: '09:00 AM', status: 'available' },
    { time: '10:00 AM', status: 'available' },
    { time: '11:30 AM', status: 'booked' }, // Simulando horario ya ocupado
    { time: '02:00 PM', status: 'available' },
    { time: '04:00 PM', status: 'available' },
    { time: '05:30 PM', status: 'available' },
  ];

  const handleConfirmBooking = () => {
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center bg-gray-900 p-6 rounded-3xl border border-gray-800">
          <div>
            <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
              Módulo de Reservaciones RF-08 / RF-09
            </span>
            <h1 className="text-2xl font-black text-white mt-2">Agendar Cita en Línea</h1>
            <p className="text-gray-400 text-sm">Selecciona tu servicio, profesional y horario preferido en Fundación de Barahona.</p>
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

        {/* Indicador de Pasos */}
        {!confirmed && (
          <div className="flex items-center justify-between bg-gray-900 px-8 py-4 rounded-2xl border border-gray-800 text-xs md:text-sm font-semibold">
            <span className={step >= 1 ? 'text-amber-400 font-bold' : 'text-gray-500'}>1. Servicio</span>
            <ArrowRight size={16} className="text-gray-600" />
            <span className={step >= 2 ? 'text-amber-400 font-bold' : 'text-gray-500'}>2. Profesional</span>
            <ArrowRight size={16} className="text-gray-600" />
            <span className={step >= 3 ? 'text-amber-400 font-bold' : 'text-gray-500'}>3. Fecha y Hora</span>
            <ArrowRight size={16} className="text-gray-600" />
            <span className={step >= 4 ? 'text-amber-400 font-bold' : 'text-gray-500'}>4. Confirmación</span>
          </div>
        )}

        {/* Paso 1: Selección de Servicio */}
        {step === 1 && (
          <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 space-y-6">
            <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
              <Scissors size={20} /> Selecciona un Servicio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesList.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex justify-between items-center ${
                    selectedService?.id === service.id
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                      : 'bg-gray-950 border-gray-800 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-base">{service.name}</h4>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock size={12} /> {service.duration}
                    </p>
                  </div>
                  <span className="text-amber-400 font-bold text-lg">RD$ {service.price}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                disabled={!selectedService}
                onClick={() => setStep(2)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  selectedService
                    ? 'bg-amber-500 hover:bg-amber-600 text-gray-950 cursor-pointer'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                Siguiente: Elegir Profesional <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Selección de Profesional */}
        {step === 2 && (
          <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 space-y-6">
            <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
              <User size={20} /> Selecciona tu Profesional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {professionalsList.map((prof) => (
                <div
                  key={prof.id}
                  onClick={() => setSelectedProfessional(prof)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all text-center space-y-3 ${
                    selectedProfessional?.id === prof.id
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                      : 'bg-gray-950 border-gray-800 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <div className="w-16 h-16 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto">
                    {prof.name.charAt(0)}
                  </div>
                  <h4 className="font-bold text-lg">{prof.name}</h4>
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                    {prof.role}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed">{prof.specialty}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-xl font-medium text-sm transition-all"
              >
                Atrás
              </button>
              <button
                disabled={!selectedProfessional}
                onClick={() => setStep(3)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  selectedProfessional
                    ? 'bg-amber-500 hover:bg-amber-600 text-gray-950 cursor-pointer'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                Siguiente: Fecha y Hora <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Fecha y Horarios Disponibles (Prevención de Doble Cita RF-09) */}
        {step === 3 && (
          <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 space-y-6">
            <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
              <Calendar size={20} /> Selecciona Fecha y Horario Disponible
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Fecha de la Cita</label>
                <input
                  type="date"
                  defaultValue="2026-11-15"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Horarios en la Agenda de {selectedProfessional?.name}</label>
                <div className="grid grid-cols-2 gap-3">
                  {availableSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      disabled={slot.status === 'booked'}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                        slot.status === 'booked'
                          ? 'bg-red-500/10 border-red-500/20 text-red-400 opacity-50 cursor-not-allowed line-through'
                          : selectedTime === slot.time
                          ? 'bg-amber-500 text-gray-950 border-amber-500 shadow-md'
                          : 'bg-gray-950 border-gray-800 text-gray-300 hover:border-gray-700'
                      }`}
                    >
                      <Clock size={14} /> {slot.time} {slot.status === 'booked' && '(Ocupado)'}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">* Los horarios bloqueados evitan dobles reservaciones para el mismo profesional.</p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-xl font-medium text-sm transition-all"
              >
                Atrás
              </button>
              <button
                onClick={() => setStep(4)}
                className="bg-amber-500 hover:bg-amber-600 text-gray-950 px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                Revisar Resumen <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Paso 4: Confirmación y Resumen */}
        {step === 4 && !confirmed && (
          <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 space-y-6">
            <h3 className="text-xl font-bold text-amber-400">Resumen de tu Reservación</h3>

            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Servicio seleccionado:</span>
                <span className="font-bold text-white">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Profesional asignado:</span>
                <span className="font-bold text-amber-400">{selectedProfessional?.name} ({selectedProfessional?.role})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fecha y Hora:</span>
                <span className="font-bold text-white">{selectedDate} a las {selectedTime}</span>
              </div>
              <div className="flex justify-between border-t border-gray-800 pt-4 text-base">
                <span className="text-gray-400 font-semibold">Total a Pagar:</span>
                <span className="font-black text-amber-400">RD$ {selectedService?.price}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(3)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-xl font-medium text-sm transition-all"
              >
                Atrás
              </button>
              <button
                onClick={handleConfirmBooking}
                className="bg-green-500 hover:bg-green-600 text-gray-950 px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <CheckCircle2 size={18} /> Confirmar y Pagar Cita
              </button>
            </div>
          </div>
        )}

        {/* Pantalla de Éxito al Reservar */}
        {confirmed && (
          <div className="bg-gray-900 p-8 md:p-12 rounded-3xl border border-gray-800 text-center space-y-6">
            <div className="w-20 h-20 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-white">¡Cita Reservada con Éxito!</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Tu cita con <strong className="text-amber-400">{selectedProfessional?.name}</strong> ha sido registrada y bloqueada en el sistema correctamente.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => { setConfirmed(false); setStep(1); setSelectedService(null); setSelectedProfessional(null); }}
                className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-8 py-3 rounded-xl transition-all cursor-pointer"
              >
                Agendar Otra Cita
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};