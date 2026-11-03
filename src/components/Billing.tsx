import React, { useState } from 'react';
import { CreditCard, DollarSign, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';

interface BillingProps {
  onBack?: () => void;
}

export const Billing: React.FC<BillingProps> = ({ onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'cash'>('card');
  const [isPaid, setIsPaid] = useState(false);

  // Datos simulados de la factura actual basados en el documento (RF-13)
  const invoiceData = {
    numeroFactura: 'FAC-2026-0001',
    fechaEmision: '15 Nov 2026',
    cliente: 'Yohan Acosta',
    servicio: 'Corte Clásico & Fade',
    profesional: 'Yeison (Master Barber)',
    subtotal: 500.00,
    itbis: 90.00, // 18% ITBIS
    total: 590.00
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaid(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center bg-gray-900 p-6 rounded-3xl border border-gray-800">
          <div>
            <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
              Pasarela de Pagos & Facturación RF-11 / RF-13
            </span>
            <h1 className="text-2xl font-black text-white mt-2">Pagos y Facturación Electrónica</h1>
            <p className="text-gray-400 text-sm">Procesa el pago seguro de tu cita y obtén tu comprobante digital en RD$.</p>
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

        {!isPaid ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Opciones de Pago */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 space-y-6">
              <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <CreditCard size={20} /> Selecciona Método de Pago
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500 text-gray-950 border-amber-500'
                      : 'bg-gray-950 border-gray-800 text-gray-300'
                  }`}
                >
                  Tarjeta
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'transfer'
                      ? 'bg-amber-500 text-gray-950 border-amber-500'
                      : 'bg-gray-950 border-gray-800 text-gray-300'
                  }`}
                >
                  Transferencia
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'cash'
                      ? 'bg-amber-500 text-gray-950 border-amber-500'
                      : 'bg-gray-950 border-gray-800 text-gray-300'
                  }`}
                >
                  Efectivo Local
                </button>
              </div>

              <form onSubmit={handleProcessPayment} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Nombre del Titular</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Yohan Acosta"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Número de Tarjeta</label>
                      <input
                        type="text"
                        required
                        placeholder="•••• •••• •••• 1234"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Expiración</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/AA"
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">CVV</label>
                        <input
                          type="password"
                          required
                          placeholder="123"
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <ShieldCheck size={18} /> Pagar RD$ {invoiceData.total.toLocaleString()}
                  </button>
                </div>
              </form>
            </div>

            {/* Resumen de Factura Pendiente */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="text-amber-500" /> Detalle de Factura
                </h3>
                <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Comprobante:</span>
                    <span className="text-white font-mono">{invoiceData.numeroFactura}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Servicio:</span>
                    <span className="text-white font-medium">{invoiceData.servicio}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Profesional:</span>
                    <span className="text-amber-400 font-medium">{invoiceData.profesional}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-3 space-y-2">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal:</span>
                      <span>RD$ {invoiceData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>ITBIS (18%):</span>
                      <span>RD$ {invoiceData.itbis.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-black text-amber-400 pt-2 border-t border-gray-800">
                      <span>Total a Pagar:</span>
                      <span>RD$ {invoiceData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                Transacción protegida y cifrada mediante pasarela de pago autorizada para Yeison Barber Style.
              </div>
            </div>

          </div>
        ) : (
          /* Vista de Factura Generada con Éxito */
          <div className="bg-gray-900 p-8 md:p-12 rounded-3xl border border-gray-800 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 size={40} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-white">¡Pago Procesado con Éxito!</h2>
              <p className="text-gray-400 text-sm">
                Se ha generado tu factura digital asociada a la transacción.
              </p>
            </div>

            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 text-left space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">Factura N°:</span>
                <span className="font-bold text-amber-400">{invoiceData.numeroFactura}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cliente:</span>
                <span className="text-white">{invoiceData.cliente}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Servicio:</span>
                <span className="text-white">{invoiceData.servicio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monto Cancelado:</span>
                <span className="font-bold text-green-400">RD$ {invoiceData.total.toFixed(2)} (Pagado)</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => window.print()}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer text-sm"
              >
                <Printer size={16} /> Imprimir / Descargar Factura
              </button>
              <button
                onClick={() => setIsPaid(false)}
                className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-6 py-3 rounded-xl transition-all cursor-pointer text-sm"
              >
                Realizar Nuevo Pago
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};