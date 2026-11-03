import React from 'react';
import { Scissors, Clock, DollarSign, Sparkles } from 'lucide-react';

interface CatalogProps {
  onSelectService?: (service: { name: string; price: number; duration: number }) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onSelectService }) => {
  // Lista de servicios oficial basada en el documento del proyecto (RF-04)
  const servicesList = [
    // Barbería Masculina
    {
      id: 1,
      name: 'Corte Normal',
      category: 'Barbería Masculina',
      description: 'Corte de cabello tradicional para caballero.',
      price: 350,
      duration: 30
    },
    {
      id: 2,
      name: 'El Dominicano o Guayaito',
      category: 'Barbería Masculina',
      description: 'Estilo clásico urbano muy solicitado con acabado impecable.',
      price: 400,
      duration: 35
    },
    {
      id: 3,
      name: 'El Blower o Soplado',
      category: 'Barbería Masculina',
      description: 'Secado y moldeado profesional para cabello masculino.',
      price: 300,
      duration: 25
    },
    {
      id: 4,
      name: 'La Victorino',
      category: 'Barbería Masculina',
      description: 'Estilo de corte exclusivo y detallado de la casa.',
      price: 500,
      duration: 40
    },
    {
      id: 5,
      name: 'Degradado a la piel (Fade en Cero)',
      category: 'Barbería Masculina',
      description: 'Desvanecido preciso desde la piel con acabado limpio.',
      price: 450,
      duration: 40
    },
    {
      id: 6,
      name: 'Degradado Medio',
      category: 'Barbería Masculina',
      description: 'Fade a media altura con transición suave y estilizada.',
      price: 400,
      duration: 35
    },
    {
      id: 7,
      name: 'Degradado Alto',
      category: 'Barbería Masculina',
      description: 'Desvanecido alto moderno para un look llamativo.',
      price: 400,
      duration: 35
    },
    {
      id: 8,
      name: 'Degradado Bajito',
      category: 'Barbería Masculina',
      description: 'Fade sutil en la parte baja de la nuca y sienes.',
      price: 400,
      duration: 35
    },
    {
      id: 9,
      name: 'Mohicano en V',
      category: 'Barbería Masculina',
      description: 'Estilo mohicano con terminación artística en forma de V.',
      price: 500,
      duration: 45
    },

    // Cuidado Personal y Barbería
    {
      id: 10,
      name: 'Arreglo de Barba',
      category: 'Cuidado Personal',
      description: 'Recorte, perfilado y definición de barba con navaja.',
      price: 300,
      duration: 25
    },
    {
      id: 11,
      name: 'Tinte',
      category: 'Cuidado Personal',
      description: 'Aplicación de tinte para cabello o cobertura de canas.',
      price: 600,
      duration: 45
    },
    {
      id: 12,
      name: 'Facial',
      category: 'Cuidado Personal',
      description: 'Limpieza facial profunda y mascarilla para el cuidado de la piel.',
      price: 700,
      duration: 40
    },
    {
      id: 13,
      name: 'Lavado de Cabello',
      category: 'Cuidado Personal',
      description: 'Lavado revitalizante con productos capilares profesionales.',
      price: 200,
      duration: 15
    },

    // Estilismo Femenino
    {
      id: 14,
      name: 'Corte de Cabello Femenino',
      category: 'Estilismo',
      description: 'Corte, mantenimiento de puntas y estilismo para damas.',
      price: 800,
      duration: 50
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-center space-y-3 mb-12">
        <span className="bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold border border-amber-500/20 uppercase tracking-wider">
          Catálogo Oficial RF-04
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
          NUESTROS <span className="text-amber-500">SERVICIOS</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Explora la gama completa de servicios de barbería masculina, cuidado personal y estilismo que ofrecemos en Yeison Barber Style[cite: 7].
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((service) => (
          <div 
            key={service.id}
            className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                  {service.category}
                </span>
                <span className="text-amber-400 font-bold text-lg flex items-center">
                  <DollarSign size={16} /> {service.price}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                {service.name}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-800/80 flex items-center justify-between">
              <span className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                <Clock size={14} className="text-amber-500" /> {service.duration} minutos
              </span>

              <button
                onClick={() => onSelectService && onSelectService(service)}
                className="bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-gray-950 font-semibold px-4 py-2 rounded-xl text-xs transition-all border border-amber-500/20 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles size={14} /> Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};