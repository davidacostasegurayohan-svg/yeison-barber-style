import React from 'react';
import { Scissors, Clock } from 'lucide-react';

const servicios = [
  { id: '1', nombre: 'Corte Clásico / Normal', descripcion: 'Corte de cabello tradicional para caballero con acabado limpio.', precio: 500, duracion: 30, categoria: 'Barbería' },
  { id: '2', nombre: 'El Dominicano o Guayaito', descripcion: 'Estilo urbano tradicional con marcado preciso de contornos.', precio: 500, duracion: 35, categoria: 'Barbería' },
  { id: '3', nombre: 'El Blower o Soplado', descripcion: 'Peinado con secador para dar volumen y forma al cabello.', precio: 400, duracion: 25, categoria: 'Barbería' },
  { id: '4', nombre: 'La Victorino', descripcion: 'Estilo de corte característico de alta demanda local.', precio: 500, duracion: 30, categoria: 'Barbería' },
  { id: '5', nombre: 'Degradado a la Piel / Desvanecido Cero', descripcion: 'Fade sombreado limpio desde cero a la piel.', precio: 600, duracion: 40, categoria: 'Barbería' },
  { id: '6', nombre: 'Degradado Medio / Alto / Bajito / Mohicano V', descripcion: 'Diferentes variaciones de cortes degradados según el gusto del cliente.', precio: 600, duracion: 40, categoria: 'Barbería' },
  { id: '7', nombre: 'Arreglo de Barba & Perfilado', descripcion: 'Recorte, alineado de líneas y toalla caliente para la barba.', precio: 400, duracion: 25, categoria: 'Cuidado Personal' },
  { id: '8', nombre: 'Tinte Capilar & Coloración', descripcion: 'Aplicación de tinte para cubrir canas o cambio de tono.', precio: 800, duracion: 45, categoria: 'Cuidado Personal' },
  { id: '9', nombre: 'Tratamiento Facial', descripcion: 'Limpieza e hidratación facial para el cuidado de la piel.', precio: 700, duracion: 30, categoria: 'Cuidado Personal' },
  { id: '10', nombre: 'Lavado de Cabello & Corte Femenino', descripcion: 'Servicio especializado a cargo de nuestra estilista profesional.', precio: 600, duracion: 45, categoria: 'Estilismo' },
];

export const Catalog: React.FC = () => {
  return (
    <section id="servicios" className="py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl font-extrabold tracking-wider text-amber-500 uppercase">
          Catálogo de Servicios
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Explora los servicios ofrecidos en Yeison Barber Style por nuestros barberos y estilista.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((s) => (
          <div 
            key={s.id}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-amber-500/50 transition flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded">
                  {s.categoria}
                </span>
                <span className="flex items-center text-xs text-neutral-400 space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{s.duracion} min</span>
                </span>
              </div>
              <h3 className="font-bold text-lg text-white pt-1">{s.nombre}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{s.descripcion}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <div>
                <p className="text-xs text-neutral-400">Precio</p>
                <p className="text-xl font-extrabold text-amber-400">RD$ {s.precio}</p>
              </div>
              <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs rounded transition flex items-center space-x-1">
                <Scissors className="w-4 h-4" />
                <span>SELECCIONAR</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};