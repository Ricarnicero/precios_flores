import React, { useState, useEffect } from 'react';

// Función helper para formatear precios con separadores de miles
const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

interface FlowerData {
  name: string;
  pricePerDozen: number;
  unitPrice: number;
}

interface Props {
  onSubmit: (data: FlowerData) => void;
}

export default function CostCalculator({ onSubmit }: Props) {
  const [flowerName, setFlowerName] = useState('');
  const [pricePerDozen, setPricePerDozen] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);

  useEffect(() => {
    const price = parseFloat(pricePerDozen);
    if (!isNaN(price) && price > 0) {
      setUnitPrice(price / 12);
    } else {
      setUnitPrice(0);
    }
  }, [pricePerDozen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (flowerName.trim() && unitPrice > 0) {
      onSubmit({
        name: flowerName.trim(),
        pricePerDozen: parseFloat(pricePerDozen),
        unitPrice
      });
    }
  };

  const isValid = flowerName.trim() && unitPrice > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Paso 1: Calcular Precio Unitario
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nombre de la flor
          </label>
          <input
            type="text"
            value={flowerName}
            onChange={(e) => setFlowerName(e.target.value)}
            placeholder="Ej: Rosa roja"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Precio por docena ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={pricePerDozen}
            onChange={(e) => setPricePerDozen(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        {unitPrice > 0 && (
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 border border-primary-200 dark:border-primary-800">
            <div className="text-center">
              <p className="text-sm text-primary-700 dark:text-primary-300 mb-1">
                Precio unitario
              </p>
              <p className="text-2xl font-bold text-primary-900 dark:text-primary-100">
                ${formatPrice(unitPrice)}
              </p>
              <p className="text-xs text-primary-600 dark:text-primary-400">
                por cada flor
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
            isValid
              ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          Siguiente →
        </button>
      </form>
    </div>
  );
}
