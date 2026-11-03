import React, { useState } from 'react';
import { Package, AlertTriangle, Plus, Minus, RefreshCw, DollarSign } from 'lucide-react';

export const Inventory: React.FC = () => {
  // Estado inicial de insumos basado en el documento del proyecto
  const [inventory, setInventory] = useState([
    {
      id: 'ins_01',
      name: 'Cera Mate Pomade',
      category: 'Peinado',
      unit: 'Unidades',
      stock: 24,
      minStock: 5,
      cost: 450,
      status: 'En Stock'
    },
    {
      id: 'ins_02',
      name: 'Cuchillas Dorco Titanio',
      category: 'Afeitado',
      unit: 'Unidades',
      stock: 4,
      minStock: 10,
      cost: 150,
      status: 'Stock Bajo'
    },
    {
      id: 'ins_03',
      name: 'Aceite Barba Eucalipto',
      category: 'Cuidado',
      unit: 'ml',
      stock: 15,
      minStock: 5,
      cost: 350,
      status: 'En Stock'
    },
    {
      id: 'ins_04',
      name: 'Tinte Negro Natural',
      category: 'Coloración',
      unit: 'unidades',
      stock: 2,
      minStock: 6,
      cost: 500,
      status: 'Stock Bajo'
    }
  ]);

  const [successMsg, setSuccessMsg] = useState('');

  // Función para registrar entrada de inventario (RF-25)
  const handleAddStock = (id: string) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newStock = item.stock + 5;
        return {
          ...item,
          stock: newStock,
          status: newStock >= item.minStock ? 'En Stock' : 'Stock Bajo'
        };
      }
      return item;
    }));
    setSuccessMsg('¡Entrada de inventario registrada con éxito!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Función para registrar consumo interno (RF-26)
  const handleConsumeStock = (id: string) => {
    setInventory(inventory.map(item => {
      if (item.id === id && item.stock > 0) {
        const newStock = item.stock - 1;
        return {
          ...item,
          stock: newStock,
          status: newStock >= item.minStock ? 'En Stock' : 'Stock Bajo'
        };
      }
      return item;
    }));
    setSuccessMsg('¡Consumo interno registrado y stock actualizado!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Cálculo del valor total del inventario
  const totalInventoryValue = inventory.reduce((acc, item) => acc + (item.stock * item.cost), 0);
  const lowStockCount = inventory.filter(item => item.stock <= item.minStock).length;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800">
          <div>
            <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
              Control Interno RF-21 / RF-32
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-2">Gestión de Insumos e Inventario</h1>
            <p className="text-gray-400 text-sm">Control de materiales de uso interno para barbería y estilismo (Sin venta directa al público).</p>
          </div>
        </div>

        {/* Tarjetas de Métricas de Inventario */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Total de Insumos</p>
              <h3 className="text-xl font-bold text-white">{inventory.length} Registrados</h3>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
            <div className="p-3 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Alertas de Stock Bajo</p>
              <h3 className="text-xl font-bold text-red-400">{lowStockCount} Insumos</h3>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Valor Estimado en Stock</p>
              <h3 className="text-xl font-bold text-white">RD$ {totalInventoryValue.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* Mensaje de notificación temporal */}
        {successMsg && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center gap-3">
            <RefreshCw size={20} className="animate-spin" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tabla de Insumos */}
        <div className="bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-800 space-y-6">
          <h3 className="text-xl font-bold text-amber-400">Existencias y Movimientos de Almacén</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Insumo</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Stock Actual</th>
                  <th className="py-3 px-4">Stock Mínimo</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones de Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-sm">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-950/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">{item.name}</td>
                    <td className="py-4 px-4 text-gray-300">{item.category}</td>
                    <td className="py-4 px-4 font-semibold text-amber-400">{item.stock} {item.unit}</td>
                    <td className="py-4 px-4 text-gray-400">{item.minStock} {item.unit}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'En Stock' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleAddStock(item.id)}
                        className="bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-gray-950 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-amber-500/20 inline-flex items-center gap-1 cursor-pointer"
                        title="Registrar entrada de insumos"
                      >
                        <Plus size={14} /> Entrada (+5)
                      </button>
                      <button
                        onClick={() => handleConsumeStock(item.id)}
                        className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                        title="Registrar consumo en servicio"
                      >
                        <Minus size={14} /> Consumo (-1)
                      </button>
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