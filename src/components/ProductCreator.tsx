import React, { useState, useRef } from 'react';
import CameraCapture from './CameraCapture';

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

interface ProductData {
  name: string;
  image: string;
  description: string;
  salePrice: number;
  flowerQuantity: number;
}

interface Props {
  flowerData: FlowerData;
  onSubmit: (data: ProductData) => void;
  onBack: () => void;
}

export default function ProductCreator({ flowerData, onSubmit, onBack }: Props) {
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [flowerQuantity, setFlowerQuantity] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName.trim() && image && description.trim() && parseFloat(salePrice) > 0 && parseFloat(flowerQuantity) > 0) {
      onSubmit({
        name: productName.trim(),
        image,
        description: description.trim(),
        salePrice: parseFloat(salePrice),
        flowerQuantity: quantity
      });
    }
  };

  const quantity = parseFloat(flowerQuantity) || 0;
  const totalFlowerCost = quantity * flowerData.unitPrice;
  const profit = parseFloat(salePrice) - totalFlowerCost;
  const profitMargin = parseFloat(salePrice) > 0 ? (profit / parseFloat(salePrice)) * 100 : 0;

  const isValid = productName.trim() && image && description.trim() && parseFloat(salePrice) > 0 && quantity > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Paso 2: Crear Producto
        </h2>
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          ← Atrás
        </button>
      </div>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">{flowerData.name}</span> - Costo unitario: <span className="font-semibold">${formatPrice(flowerData.unitPrice)}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nombre del producto
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Ej: Ramo de rosas rojas"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Foto del producto
          </label>
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {!image ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowCamera(true)}
                  className="py-3 px-4 border-2 border-dashed border-primary-300 dark:border-primary-600 rounded-lg text-primary-500 dark:text-primary-400 hover:border-primary-400 hover:text-primary-600 transition-colors"
                >
                  📷 Cámara
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-colors"
                >
                  � Galería
                </button>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe tu producto..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cantidad de flores utilizadas
          </label>
          <input
            type="number"
            step="1"
            min="1"
            value={flowerQuantity}
            onChange={(e) => setFlowerQuantity(e.target.value)}
            placeholder="Ej: 12"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Número de {flowerData.name.toLowerCase()}s que usarás para este producto
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Precio de venta ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        {parseFloat(salePrice) > 0 && quantity > 0 && (
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-gray-600 dark:text-gray-400">
                  <p>Flores utilizadas:</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{quantity} unidades</p>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <p>Costo total en flores:</p>
                  <p className="font-semibold text-gray-900 dark:text-white">${formatPrice(totalFlowerCost)}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg text-center ${profit >= 0 ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                <p className={`text-sm ${profit >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  Ganancia
                </p>
                <p className={`font-bold ${profit >= 0 ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}>
                  ${formatPrice(profit)}
                </p>
              </div>
              <div className={`p-3 rounded-lg text-center ${profitMargin >= 0 ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                <p className={`text-sm ${profitMargin >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-red-700 dark:text-red-300'}`}>
                  Margen
                </p>
                <p className={`font-bold ${profitMargin >= 0 ? 'text-blue-900 dark:text-blue-100' : 'text-red-900 dark:text-red-100'}`}>
                  {profitMargin.toFixed(1)}%
                </p>
              </div>
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
          Generar Vista Previa →
        </button>
      </form>

      {showCamera && (
        <CameraCapture
          onImageCapture={(imageData) => {
            setImage(imageData);
            setShowCamera(false);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
